# Z-Wallet API

## Introduction 

Z-Wallet-API adalah API yang dikembangkan untuk aplikasi Z-Wallet-Mobile, Project ini dibangun dengan Node-ExpressJs

Link API : http://103.123.63.223:8000/

## Technologies

- [Visual_Studio_Code](https://code.visualstudio.com/)
- [MySQL](https://www.mysql.com/)
- [NodeJs](https://nodejs.org/)
- [ExpressJs](https://expressjs.com/)



## Setup

1. Jalankan MySQL dan Apahce
2. Import api_zwallet.sql
3. Ikuti langkah berikut :
```
~$ https://github.com/drajat824/Z-Wallet-API
~$ cd Z-Wallet-API
~$ npm install
~$ node index.js
```

## API SPECS

- POST `/api/v1/register` Untuk Register
- POST `/api/v1/login` Untuk Login
- GET `/api/v1/topup` Untuk menampilkan cara Top Up
- POST `/api/v1/transfer` Untuk melakukan Transfer
- GET `/api/v1/transfer` Untuk menampilkan data Transfer
- GET `/api/v1/transfer?page=1&&limit=2` Untuk menampilkan data Transfer dengan Paginasi
- GET `/api/v1/transfer/week` Untuk menampilkan data Transfer minggu ini
- GET `/api/v1/transfer/month` Untuk menampilkan data Transfer bulan ini
- GET `/api/v1/transfer/today` Untuk menampilkan data Transfer hari ini
- GET `/api/v1/profile/detail` Untuk menampilkan data User
- GET `/api/v1/profile/search?name=peter` Untuk menampilkan User berdasarkan nama
- GET `/api/v1/profile/cekpin` Untuk cek pin User
- PATCH `/api/v1/profile` Untuk mengubah data User
- PATCH `/api/v1/upload` Untuk mengubah foto User

## Sources

Dokumentasi Postman : https://documenter.getpostman.com/view/12578047/TVsvfmGc

Deploy AWS : http://3.88.220.160:8000/
