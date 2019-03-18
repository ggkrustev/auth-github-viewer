 // tslint:disable:only-arrow-functions
//
import 'reflect-metadata'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'
import express, { Request, Response } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as swagger from 'swagger-express-ts'

import DI from './di'
import container from './injections'
import { ServerOptions } from './models/serverOptions'
import logger from './helpers/logger'

// import all controllers
import './controllers/github.controller'
import './controllers/auth.controller'

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(
        morgan('combined', {
            stream: {
                write: (meta: any) => {
                    logger.info('Request served', meta)
                },
            },
        })
    )
    app.use(cors())
    app.use(bearerToken())
    app.use('/api-docs/swagger', express.static('swagger'))
    app.use(
        '/api-docs/swagger/assets',
        express.static('node_modules/swagger-ui-dist')
    )
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )
    app.use(bodyParser.json())
    app.use(
        swagger.express({
            definition: {
                info: {
                    title: 'Demo API',
                    version: '1.0',
                },
            },
        })
    )
});

const serverInstance = server.build()
const runServer = (options: ServerOptions) => {
    const { port } = options
    const pid = process.pid

    serverInstance.listen(port, () => {
        logger.info('Server started!', {
            port,
            pid,
        })
    })
}

export { runServer }
