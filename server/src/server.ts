import 'reflect-metadata'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'

import container from './injections'
import { ServerOptions } from './models/serverOptions'

// import all controllers
import './controllers/home.controller';
import './controllers/github.controller'

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )
    app.use(bodyParser.json())
});

server.setConfig((app) => {
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

    serverInstance.listen(=>
     tslint:disable-next-line
        console.log(`Example app listening on port ${port}!`)
    )
}

export { runServer }
