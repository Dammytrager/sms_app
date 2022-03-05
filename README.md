# Live On
https://dammy-sms-app.herokuapp.com/

#  Setup Instructions for this app
> This app is written with typescript

## Requirements

- [node](https://nodejs.org/)
- npm 
- Database (PostgresQL)
- Redis

## Install Dependencies
#### Node.js Dependencies
```
npm install
```

## Environment Variables
Create a new file `.env` in the root directory and copy the contents 
of `.env.sample` into it, then fill accordingly


## Database

### Setting up the DB
Create App Database
```bash
createdb <DB_NAME>
```
Create Test Database
```bash
createdb <TEST_DB>
```
Populate DB with table and records
```bash
npm run setup-db
```


## Running Application
Ensure redis is running and the database is connected

#### Dev Mode
```bash
npm run start-dev
```

#### Live Mode
```bash
npm start
```

## Running Tests
```bash
npm test
```
