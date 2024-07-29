<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Daily Expense Sharing Application

This project is a backend for a daily-expenses sharing application built using NestJS and MongoDB. It allows users to add expenses and split them based on exact amounts, percentages, and equal splits. The application manages user details, validates inputs, and generates downloadable balance sheets.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Expense Endpoints](#expense-endpoints)

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Installation

1. *Clone the repository:*
   bash
   git clone https://github.com/your-username/daily-expense.git
   cd daily-expense

## Installation

Install the dependencies and devDependencies and start the server.

sh
npm install
echo "MONGO_URI=mongodb://localhost:27017/daily-expense" > .env


## Running the Application
Start MongoDB:
Ensure MongoDB is running on your local machine or a remote server.

sh
npm run start:dev


## Folder structure
daily-expense/
├── src/
│   ├── user/
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   ├── expense/
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── expense.controller.ts
│   │   ├── expense.module.ts
│   │   ├── expense.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md

## API Documentation
### User Endpoints

| Endpoint               | Method | Description              | Request Body                                                                                         | Response                                                                                                                                  |
|------------------------|--------|--------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `/user`                | POST   | Create a new user        | json { "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733" }        | json { "id": "66a61cee0d9d8f8294a68efa", "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733", "_v": 0 }  |
| `/user/:id`            | GET    | Get user details by ID   | N/A                                                                                                  | json { "id": "66a61cee0d9d8f8294a68efa", "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733", "_v": 0 }  |

### Expense Endpoints

| Endpoint                       | Method | Description                | Request Body                                                                                                                                            | Response                                                                                                                  |
|--------------------------------|--------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `/expense`                     | POST   | Create a new expense       | json { "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }] }  | json { "id": "66a63835c2f0feab2b9c98bc", "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }], "_v": 0 }  |
| `/expense/:userId`             | GET    | Get user expenses by ID    | N/A                                                                                                                                                     | json [ { "_id": "66a63835c2f0feab2b9c98bc", "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }] }, { "_id": "66a6365d9caba9a2b09f8760", "amount": 500, "description": "PetFood", "splitType": "Exact", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa", "amount": 500 }] } ]  |
| `/expense/:userId/calculate`   | GET    | Calculate user expenses    | N/A                                                                                                                                                     | json { "total": 2500, "splitDetails": [{ "expenseId": "66a63835c2f0feab2b9c98bc", "amountOwed": 1250, "description": "Trip", "owesTo": "userName1" }, { "expenseId": "66a6365d9caba9a2b09f8760", "amountOwed": 500, "description": "PetFood", "owesTo": "userName2" }], "checkedBy": "jai" } ``` |\
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
