import { Router } from "express";
import { createId } from "../utils/create-id.js";

const router = Router();

router.post("/room/join", (req, res) => {
  try {
    const { roomId } = req.body;

    res.send({ roomId });
  } catch (err) {
    res.status(500).send({ message: "Unexpected error" });
  }
});

router.post("/room/create", (req, res) => {
  try {
    const roomId = createId();

    res.send({ roomId });
  } catch (err) {
    res.status(500).send({ message: "Unexpected error" });
  }
});

export default router;
