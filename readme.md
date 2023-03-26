Welcome to MarketFlex, a tinny example of supermarket products.
{

items: "[GET] /items",
item: "[GET] /items/:id (You must find by barcode, not \_id)",
newItem: {
route: "[POST] /items --multipart/form-data",
params: {
name: "string",
brand: "string",
description: "string",
expDate: Date,
price: "number",
barCode: "number",
photo: "1 photo",
},
},
register: {
route: "[POST] /auth/register --application/x-www-form-urlencoded or json",
params: {
name: "string",
lastName: "string",
email: "string",
password: "string",
},
},
login: {
route: "[POST] /auth/login --application/x-www-form-urlencoded or json",
params: {
email: "string",
password: "string",
},
},
}
