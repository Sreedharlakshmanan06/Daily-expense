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

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/daily-expense.git
   cd daily-expense

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm install
echo "MONGO_URI=mongodb://localhost:27017/daily-expense" > .env
```

## Running the Application
Start MongoDB:
Ensure MongoDB is running on your local machine or a remote server.

```sh
npm run start:dev
```

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
| `/user`                | POST   | Create a new user        | ```json { "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733" } ```       | ```json { "_id": "66a61cee0d9d8f8294a68efa", "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733", "__v": 0 } ``` |
| `/user/:id`            | GET    | Get user details by ID   | N/A                                                                                                  | ```json { "_id": "66a61cee0d9d8f8294a68efa", "name": "jai", "email": "jailingeshwar.jr@gmail.com", "phno": "+91 9360498733", "__v": 0 } ``` |

### Expense Endpoints

| Endpoint                       | Method | Description                | Request Body                                                                                                                                            | Response                                                                                                                  |
|--------------------------------|--------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `/expense`                     | POST   | Create a new expense       | ```json { "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }] } ``` | ```json { "_id": "66a63835c2f0feab2b9c98bc", "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }], "__v": 0 } ``` |
| `/expense/:userId`             | GET    | Get user expenses by ID    | N/A                                                                                                                                                     | ```json [ { "_id": "66a63835c2f0feab2b9c98bc", "amount": 2500, "description": "Trip", "splitType": "Equal", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa" }, { "userId": "66a6365d9caba9a2b09f8760" }] }, { "_id": "66a6365d9caba9a2b09f8760", "amount": 500, "description": "PetFood", "splitType": "Exact", "participants": [{ "userId": "66a61cee0d9d8f8294a68efa", "amount": 500 }] } ] ``` |
| `/expense/:userId/calculate`   | GET    | Calculate user expenses    | N/A                                                                                                                                                     | ```json { "total": 2500, "splitDetails": [{ "expenseId": "66a63835c2f0feab2b9c98bc", "amountOwed": 1250, "description": "Trip", "owesTo": "userName1" }, { "expenseId": "66a6365d9caba9a2b09f8760", "amountOwed": 500, "description": "PetFood", "owesTo": "userName2" }], "checkedBy": "jai" } ``` |