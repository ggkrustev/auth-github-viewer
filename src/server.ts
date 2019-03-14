import express, { Request, Response } from "express";
import { ServerOptions } from "./models/serverOptions";

const app = express();

app.get('/', (_: Request, res: Response): void => {
    res.send('Hello from Express!');
});

const run = (options: ServerOptions) => {
    const { port } = options;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

export {
  run
};
