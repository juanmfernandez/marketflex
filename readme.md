
# MarketFlex

Welcome to MarketFlex, a tinny example of supermarket products.


## Demo

Link to demo

https://marketflex-55d4d.ondigitalocean.app/
## API Reference

#### Get all items

```http
  GET /items
```

#### Get item

```http
  GET /items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. You must find by barcode, not \_id |

#### Add item

```http
  POST /items --multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `brand`      | `string` | **Required**.  |
| `description`      | `string` | **Required**.  |
| `expDate`      | `Date` | **Required**. You must find by barcode, not \_id |
| `price`      | `number` | **Required**.  |
| `barCode`      | `string` | **Required**. EAN-13 barcode to scan|
| `photo`      | `file` | **Required**. A single photo|

#### Register

```http
  POST /auth/register --application/x-www-form-urlencoded or json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `name` | **Required**. |
| `lastName`      | `string` | **NotRequired**.  |
| `email`      | `email` | **Required**.  |
| `password`      | `string` | **Required**.  Strong password|

#### Login
```http
  POST /auth/login --application/x-www-form-urlencoded or json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Required**.  |
| `password`      | `string` | **Required**.  Strong password|



## Authors

- [@juanmfernandez](https://www.github.com/juanmfernandez)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


