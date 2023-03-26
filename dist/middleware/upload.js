"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadFirebase = exports.checkMultipart = exports.uploadLocalSingle = exports.uploadFire = void 0;
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const { v4: uuid } = require("uuid");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const error_handle_1 = require("../utils/error.handle");
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.ST_BUCKET,
    messagingSenderId: process.env.MSG_SENDER_ID,
    appId: process.env.APP_ID
};
const appFire = (0, app_1.initializeApp)(firebaseConfig);
const storageFire = (0, storage_1.getStorage)(appFire);
const profilePicsRef = (0, storage_1.ref)(storageFire, 'images/profilepics');
const productPicsRef = (0, storage_1.ref)(storageFire, 'images/Supermarkets');
const uploadFire = (req, file, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filenames = file.req.files;
        const values = Object.values(filenames);
        if (values.length < 1) {
            throw new Error('Only .png, .svg, .webp, .jpg and .jpeg format allowed or file missing');
        }
        const data = Object.values(values);
        const result = Object.keys(data).map((key) => [Number(key), data[key]]);
        const result2 = Array(result);
        const elementArr = result2[0][0][1];
        const localPath = [];
        for (let index = 0; index < elementArr.length; index++) {
            localPath.push(elementArr[index].path);
        }
        const uploader = [];
        for (let index = 0; index < elementArr.length; index++) {
            const finalRef = elementArr[index].fieldname === 'profilePic' ? profilePicsRef : productPicsRef;
            const spaceRef2 = (0, storage_1.ref)(finalRef, elementArr[index].filename);
            let metadata = {
                contentType: elementArr[index].mimetype
            };
            uploader.push((0, storage_1.uploadBytes)(spaceRef2, fs.readFileSync(localPath[index]), metadata));
        }
        const urls = [];
        const picsArr = [];
        Promise.all(uploader)
            .then(snapshot => {
            snapshot.map((snap) => {
                urls.push((0, storage_1.getDownloadURL)(snap.ref)
                    .then((downloadURL) => {
                    picsArr.push(downloadURL);
                }));
            });
        })
            .then(() => {
            Promise.all(urls)
                .then((result) => {
                req.body.photo = picsArr.pop();
                localPath.forEach((item) => {
                    fs.unlink(item, (err) => {
                        console.log('Deleted: ', item);
                    });
                });
                next();
            });
        });
    }
    catch (error) {
        file.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.uploadFire = uploadFire;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path_1.default.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, callback) {
        const destFilename = uuid() + path_1.default.extname(file.originalname);
        callback(null, destFilename);
    }
});
exports.uploadLocalSingle = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype == "image/png"
            || file.mimetype == "image/jpg"
            || file.mimetype == "image/jpeg"
            || file.mimetype == "image/svg+xml"
            || file.mimetype == "image/webp") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
}).fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'photo', maxCount: 8 }
]);
const checkMultipart = (req, file, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        yield (0, exports.uploadLocalSingle)(req, file, function (err) {
            if (err) {
                return file.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(err) }));
            }
            next();
        });
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next();
    }
});
exports.checkMultipart = checkMultipart;
const handleUploadFirebase = (req, file, next) => {
    if (file.req.headers["content-type"] !== 'application/x-www-form-urlencoded') {
        (0, exports.uploadFire)(req, file, next);
    }
    if (file.req.headers["content-type"] === 'application/x-www-form-urlencoded') {
        next();
    }
};
exports.handleUploadFirebase = handleUploadFirebase;
