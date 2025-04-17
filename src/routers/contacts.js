import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { getContactsController, getContactsByIdController, addContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";

import { validateBody } from "../utils/validateBody.js";

import { contactsAddSchema, contactsUpdateSchema } from "../validation/contacts.js";

import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post("/", validateBody(contactsAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:contactId", isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(patchContactController));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;

