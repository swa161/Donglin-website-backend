import express from "express"
import bodyParser from "body-parser"
import allowCrossOriginRequestMiddleware from "../app/middleware/cors.middleware"
import logger from "./logger"

export default () => {
    const app = express()

    app.use(allowCrossOriginRequestMiddleware)
    app.use(bodyParser.json())


    app.use((req, res, next) => {
        if (req.path !== '/') {
            logger.http(`### ${req.method} ${req.path} ###`)
        }
        next()
    })
    require("routes here")(app)
    return app
}