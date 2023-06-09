const notesModel = require("../model/notes");
const uuid = require("uuid-random");

async function getNotes(req, res) {
  try {
    const createdById = req.userId;
    const allNotes = await notesModel
      .getNotes(createdById)
      .sort({ modifiedAt: -1 });
    console.table(allNotes);
    if (allNotes.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Inga anteckningar hittades!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Alla anteckningar hämtade!",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function createNote(req, res) {
  try {
    const userId = req.userId;
    const note = req.body;
    if (!note.title || !note.text) {
      return res.status(400).json({
        success: false,
        error: "Titel och text måste anges!",
      });
    }
    if (note.title.length > 49 || note.text.length > 299) {
      return res.status(400).json({
        success: false,
        error: "Titel får max vara 50 tecken. Text får max vara 300 tecken!",
      });
    }
    note.createdAt = new Date();
    note.modifiedAt = new Date();
    note.createdBy = userId;
    note.noteId = uuid();
    const newNote = await notesModel.addNote(note);

    return res.status(200).json({
      success: true,
      message: "Anteckning tillagd!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const note = req.body;
    const userId = req.userId;

    if (!note.title || !note.text) {
      return res.status(400).json({
        success: false,
        error: "Titel och text måste anges!",
      });
    }

    if (note.title.length > 49 || note.text.length > 299) {
      return res.status(400).json({
        success: false,
        error: "Titel får max vara 50 tecken!. Text får max vara 300 tecken!",
      });
    }

    const noteExist = await notesModel.getNoteById(noteId);
    if (noteExist.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Anteckningen finns inte!",
      });
    }

    if (noteExist[0].createdBy !== userId) {
      return res.status(401).json({
        success: false,
        error: "Du har inte behörighet att ändra denna anteckning!",
      });
    }

    note.modifiedAt = new Date();
    const updatedNote = await notesModel.updateNoteById(noteId, note);

    return res.status(200).json({
      success: true,
      message: "Anteckning ändrad!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.userId;

    const noteExist = await notesModel.getNoteById(noteId);

    if (noteExist.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Anteckningen finns inte!",
      });
    }

    if (noteExist[0].createdBy !== userId) {
      return res.status(401).json({
        success: false,
        error: "Du har inte behörighet att ändra denna anteckning!",
      });
    }

    const deletedNote = await notesModel.deleteNoteById(noteId);

    return res.status(200).json({
      success: true,
      message: "Anteckning borttagen!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

async function searchNotes(req, res) {
  try {
    const searchString = req.params.searchString;
    const userId = req.userId;

    const allNotes = await notesModel.getNotes(userId);
    const filteredNotes = allNotes.filter((note) => {
      return note.title.toLowerCase().includes(searchString.toLowerCase());
    });

    if (filteredNotes.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Inga anteckningar hittades!",
      });
    }

    const notesQuantity = filteredNotes.length;
    return res.status(200).json({
      success: true,
      message: "Hittade " + notesQuantity + " anteckningar",
      data: filteredNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server fel! Försök igen senare.",
    });
  }
}

module.exports = { getNotes, createNote, deleteNote, updateNote, searchNotes };
