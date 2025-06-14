const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");

router.post("/create", auth, noteController.createNote);
router.get("/get-all", auth, noteController.getNotes);
router.put("/update/:id", auth, noteController.updateNote);
router.delete("/delete/:id", auth, noteController.deleteNote);

module.exports = router;
