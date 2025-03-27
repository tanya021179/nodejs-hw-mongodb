import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactsById = contactId => ContactCollection.findOne({ _contactId: contactId });