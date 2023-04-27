const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

// Fetch all notes
router.get("/", auth, (req, res) => {
  res.send("Hello from notes");
});

// Save a new note
router.post("/", (req, res) => {
  res.send("Save a new note");
});

// Change a note
router.put("/:id", (req, res) => {
  res.send("Change a note");
});

// Delete a note
router.delete("/:id", (req, res) => {
  res.send("Delete a note");
});

module.exports = router;
