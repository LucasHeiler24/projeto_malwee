import { Router } from "express";
import { create, loginStore } from "../controllers/UserController.js";
import {validationsUser, validationLogin} from "../validations/validationUser.js";

const routerUser = Router();
routerUser.post('/create', validationsUser, create);
routerUser.post('/store', validationLogin, loginStore);

export default routerUser;