import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";

import { getContacts, getContactsById } from "./services/contacts.js";

const port = Number(getEnvVar("PORT", 3000));

export const setupServer = () => {
    
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    
   app.use(pino());

    app.get("/contacts", async (request, response) => {
        const data = await getContacts();

        response.json({
            status: 200,
  message: "Successfully found contacts!",
  data,
        });
    });

    app.get("/contacts/:contactId", async (request, response) => {
        const { contactId } = request.params;

        const data = await getContactsById(contactId);

        if (!data) {
            return response.status(404).json({
                message: "Contact not found"
            });
        }

        response.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
    });

    app.use((request, response) => {
        response.status(404).json({
            message: "Not found",
        });
    });

    app.use((error, request, response, next) => {
        response.status(500).json({
            message: error.message,
        })
    })

    app.listen(port, () => {
        console.log(`"Server is running on port ${port}"`);
    });
};








