import createHttpError from "http-errors";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

import { contactSortFields } from "../db/models/Contact.js";

import { getContacts, getContactsById, addContact, updateContact, deleteContactById } from "../services/contacts.js";

import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const getContactsController = async (request, response) => {
    const paginationParams = parsePaginationParams(request.query);
    const sortParams = parseSortParams(request.query, contactSortFields);
    const { _id: userId } = request.user;
    const data = await getContacts({ userId, ...paginationParams, ...sortParams });

    response.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactsByIdController = async (request, response) => {

    const { contactId } = request.params;
    const { _id: userId } = request.user;

    const data = await getContactsById(contactId, userId);

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

    const { _id: userId } = request.user;

    const data = await addContact({ ...request.body, userId });

    response.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })

};

export const patchContactController = async (request, response) => {
    const { contactId } = request.params;
    const photo = request.file;

    let photoUrl = null;
    console.log("Updating contact with ID:", contactId, "Body:", request.body, "User ID:", request.user._id);
    if (photo) {
        photoUrl = await saveFileToUploadDir(photo);
    }

    const { _id: userId } = request.user;

    const result = await updateContact(contactId, { ...request.body, photo: photoUrl }, userId);

    if (!result) {
        console.log("No contact found with ID:", contactId, "for User ID:", userId);
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
    const { _id: userId } = request.user;
    const data = await deleteContactById(contactId, userId);

    if (!data) {
        throw createHttpError(404, "Contact not found")
    }

    response.status(204).send();
}

