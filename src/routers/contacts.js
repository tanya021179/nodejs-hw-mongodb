import { Router } from "express";
import { getContactsController, getContactsByIdController, addContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { validateBody } from "../utils/validateBody.js";

import { contactsAddSchema, contactsUpdateSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", validateBody(contactsAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:contactId", validateBody(contactsUpdateSchema), ctrlWrapper(patchContactController));

contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController));

export default contactsRouter;

