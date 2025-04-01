import { Router } from "express"; 
import { getContactsController, getContactsByIdController } from "../controllers/contacts.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(getContactsByIdController));

export default contactsRouter;