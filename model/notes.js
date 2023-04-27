const db = require("../utils/db");

function addNote(note) {
  note.createdAt = new Date();
  note.modifiedAt = new Date();
  return db.notes.insert(note);
}

function getNotes(userId) {
  return db.notes.find({ createdBy: userId });
}

function getNoteById(noteId) {
  return db.notes.find({ noteId: noteId });
}

function updateNoteById(noteId, note) {
  note.modifiedAt = new Date();
  return db.notes.update({ noteId: noteId }, { $set: note });
}

function deleteNoteById(noteId) {
  return db.notes.remove({ noteId: noteId });
}

module.exports = {
  addNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
