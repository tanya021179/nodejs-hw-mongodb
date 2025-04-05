import createHttpError from "http-errors";

import { getContacts, getContactsById, addContact, updateContact, deleteContactById } from "../services/contacts.js";

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

export const addContactController = async (request, response) => {
    const data = await addContact(request.body);

    response.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })

};

export const patchContactController = async (request, response) => {
    const { contactId } = request.params;
    const result = await updateContact(contactId, request.body);

    if (!result) {
        throw createHttpError(404, "Contact not found")
    }

    response.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
    });
}

export const deleteContactController = async (request, response) => {
    const { contactId } = request.params;
    const data = await deleteContactById(contactId);

    if (!data) {
        throw createHttpError(404, "Contact not found")
    }

    response.status(204).send();
}

