import dotenv from "dotenv"
import {Pool} from "pg"
import logger from "./logger"

dotenv.config()

const state = {
    pool: null as Pool | null
}

const connect = async () => {
    state.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
    })

    state.pool.on("error", (err) => {
        logger.error("PostgreSQL pool error", err.message)
    })
    await state.pool.query("SELECT 1")

    logger.info("Successfully connected to database")
    return
}

const getPool = () => {
    if (!state.pool) {
        logger.error("DB not initialized")
    }
    return state.pool
}

export {connect, getPool}