const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const notesController = require("../controller/notes");

router.get("/", auth, notesController.getNotes);

router.post("/", auth, notesController.createNote);

router.put("/:id", auth, notesController.updateNote);

router.delete("/:id", auth, notesController.deleteNote);

router.get("/search/:searchString", auth, notesController.searchNotes);

module.exports = router;
