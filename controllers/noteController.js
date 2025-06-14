const Note = require("../models/Note");
const CryptoJS = require("crypto-js");

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = new Note({
      userId: req.user.userId,
      title: encryptData(title),
      content: encryptData(content),
    });

    await note.save();
    res.status(201).json({
      _id: note._id,
      title: decryptData(note.title),
      content: decryptData(note.content),
      createdAt: note.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    const decryptedNotes = notes.map((note) => ({
      _id: note._id,
      title: decryptData(note.title),
      content: decryptData(note.content),
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));
    res.json(decryptedNotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (title) note.title = encryptData(title);
    if (content) note.content = encryptData(content);
    await note.save();

    res.json({
      _id: note._id,
      title: decryptData(note.title),
      content: decryptData(note.content),
      createdAt: note.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
