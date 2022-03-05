import dotenv from 'dotenv';
dotenv.config()


export const database = {
    host: process.env.DB_HOST,
    name: process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT || 'postgres',
    database_url: process.env.DATABASE_URL || ''
};

export const redis = {
    url: process.env.REDIS_URL
}

export const environment = process.env.NODE_ENV || 'development'

export const port = process.env.PORT

