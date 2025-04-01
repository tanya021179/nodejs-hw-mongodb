import createHttpError from "http-errors";

import { getContacts, getContactsById } from "../services/contacts.js";

export const getContactsController = async (request, response) => {

    const data = await getContacts();

    response.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactsByIdController = async (request, response) => {
  
        const { contactId } = request.params;

        const data = await getContactsById(contactId);

        if (!data) {
throw createHttpError(404, "Contact not found")

            // const error = new Error("Contact not found");
            // error.status = 404;
            // throw error;

            // return response.status(404).json({
            //     message: "Contact not found"
            // });
        }

        response.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
};