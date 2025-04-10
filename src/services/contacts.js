import ContactCollection from "../db/models/Contact.js";

import { sortList } from "../constants/index.js";

import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = sortList[0] }) => {
    const skip = (page - 1) * perPage;
    const data = await ContactCollection.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await ContactCollection.find().countDocuments();

    const paginationData = calcPaginationData({ page, perPage, totalItems })

    return {
        data,
        page,
        perPage,
        totalItems,
        ...paginationData,
    };
};

export const getContactsById = contactId => ContactCollection.findOne({ _id: contactId });

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
    const result = await ContactCollection.findOneAndUpdate({ _id }, payload,
        {
            new: true,
        });

    return result;
}

export const deleteContactById = _id => ContactCollection.findByIdAndDelete({ _id });
