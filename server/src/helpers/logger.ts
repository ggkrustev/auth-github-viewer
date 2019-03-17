import serializeError from 'serialize-error'
import { Logger, LoggerInstance, transports } from 'winston'

export const logger = new Logger({
    transports: [
        new transports.Console({
            formatter(options): string {
                const logEntry: any = {}

                if (options.meta.timestamp) {
                    logEntry.timestamp = options.meta.timestamp
                } else {
                    logEntry.timestamp = Date.now()
                }

                logEntry.message = options.message
                logEntry.level = options.level
                logEntry.pid = process.pid

                const error = options.meta.error
                if (error) {
                    logEntry.error =
                        typeof error === 'string'
                            ? error
                            : serializeError(error)
                    delete options.meta.error
                }

                Object.assign(logEntry, options.meta)

                return JSON.stringify(logEntry, null, 2)
            },
            silent: process.env.CI ? true : false,
        }),
    ],
})

export default logger as LoggerInstance

