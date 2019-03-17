import 'reflect-metadata'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'
import express, { Request, Response } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'

import container from './injections'
import { ServerOptions } from './models/serverOptions'

// import all controllers
import './controllers/github.controller'
import './controllers/auth.controller'

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bearerToken())
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )
    app.use(bodyParser.json())
});

const serverInstance = server.build()
const runServer = (options: ServerOptions) => {
    const { port } = options

    serverInstance.listen(port, () => {
        console.log(`Example app listening on port ${port}!`) // tslint:disable-line
    })
}

export { runServer }
