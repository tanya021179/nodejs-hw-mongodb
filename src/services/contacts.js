import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

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
