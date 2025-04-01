import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";

import { notFoundHandle } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import contactsRouter from "./routers/contacts.js";

const port = Number(getEnvVar("PORT", 3000));

export const setupServer = () => {
    
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    
    //    app.use(pino());
    
    app.use("/contacts", contactsRouter);

    app.use(notFoundHandle);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`"Server is running on port ${port}"`);
    });
};








