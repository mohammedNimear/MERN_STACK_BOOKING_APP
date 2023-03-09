import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  upadteUser,
} from "../controllers/user_ctrl.js";
import { verfiyAdmin, verfiyToken, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();

//* UPDATE

router.put("/:id", verfiyUser, upadteUser);

//* DELETE

router.delete("/:id", verfiyUser, deleteUser);

//* GET

router.get("/:id", verfiyUser, getUser);

//* GET ALL

router.get("/", verfiyAdmin, getAllUsers);

export default router;
