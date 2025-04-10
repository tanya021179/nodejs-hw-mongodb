import { Schema, model } from "mongoose";

import { typeList } from "../../constants/contacts.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true,
    },
    contactType: {
        type: String,
        enum: typeList,
        required: true,
        default: "personal",
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", (error, doc, next) => {
    next();
})

export const contactSortFields = ["name", "phoneNumber", "email",
    "isFavourite", "contactType"]

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;

