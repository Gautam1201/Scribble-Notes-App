import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateNote from "./CreateNote";
import axios from "axios";


function App() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await axios.get("/api");
    res.data.forEach((noteItem) => {
      let newNote = {
        title: noteItem.title,
        content: noteItem.content,
        noteId: noteItem._id
      };
      setNotes((prev) => [...prev, newNote]);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    const res = await axios.post("/api", {
      title: newNote.title,
      content: newNote.content
    })
    let addNewNote = {
      title: res.data.title,
      content: res.data.content,
      noteId: res.data._id
    }
    setNotes((prevNotes) => {
      return [...prevNotes, addNewNote];
    });
  }

   const deleteNote = async (id,noteId) => {
    await axios.delete(`/api/${noteId}`);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const updateNote = async (newNote, id, noteId) => {
    await axios.patch(`/api/${noteId}`,{
      title: newNote.title,
      content: newNote.content
    });
    setNotes((prevNotes) => {
       const updatedNotes = [...prevNotes];
       updatedNotes[id] = newNote;
      return updatedNotes;
    });
  }

  return (
    <div>
      <Header />
      <div className="all-notes">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onUpdate={updateNote}
              noteId = {noteItem.noteId}
            />
          );
        })}
        <CreateNote onAdd={addNote} />
      </div>
    </div>
  );
}

export default App;
