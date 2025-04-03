import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactsById = contactId => ContactCollection.findOne({ _id: contactId });

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
    const data = await ContactCollection.findOneAndUpdate({ _id }, payload);

    return data;
}

export const deleteContactById = _id => ContactCollection.findByIdAndDelete({ _id });
