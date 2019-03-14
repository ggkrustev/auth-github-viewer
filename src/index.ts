import config from "config";

import { run } from "./server";

const port = config.get('server.port') as number;

run({ port });
