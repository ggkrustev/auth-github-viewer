import config from 'config'
import { runServer } from './server'

runServer({
    port: config.get('server.port') as number,
})
