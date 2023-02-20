import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoom, upadteRoom, upadteRoomAvailability } from '../controllers/room_ctrl.js';
import { verfiyAdmin } from '../utils/verfiyToken.js';

const router = express.Router();


//* CREATE

router.post("/:hotelid", verfiyAdmin, createRoom);

//* UPDATE

router.put("/:id", verfiyAdmin, upadteRoom);
router.put("/availability/:id", upadteRoomAvailability);

//* DELETE

router.delete("/:id/:hotelid", verfiyAdmin, deleteRoom);

//* GET

router.get("/:id", getRoom);
  
//* GET ALL

router.get("/", getAllRooms);   


export default router 
