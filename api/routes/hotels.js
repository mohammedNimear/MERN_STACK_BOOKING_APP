import express from "express";
import {
  countByType,
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  upadteHotel,
  getHotelRooms,
} from "../controllers/hotel_ctrl.js";
import { verfiyAdmin } from "../utils/verfiyToken.js";

const router = express.Router();

//* CREATE

router.post("/", verfiyAdmin, createHotel);

//* UPDATE

router.put("/:id", verfiyAdmin, upadteHotel);

//* DELETE

router.delete("/:id", verfiyAdmin, deleteHotel);

//* GET

router.get("/find/:id", getHotel);

//* GET ALL

router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
