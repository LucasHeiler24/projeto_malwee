import { Router } from "express";
import { create } from "../controllers/UserController.js";

const routerUser = Router();
routerUser.post('/create', create);


export default routerUser;