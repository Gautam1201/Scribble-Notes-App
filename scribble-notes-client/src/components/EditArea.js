import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@material-ui/icons/Add";

const EditArea = (props) => {
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
    noteId: props.noteId
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  };

  const submitNote = (event) => {
    props.onUpdate(note);
    event.preventDefault();
  };

  return (
    <form className="create-note">
      <input
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="Title"
        autoFocus
      />
      <textarea
        name="content"
        onChange={handleChange}
        value={note.content}
        placeholder="Take a note..."
        rows={5}
        required
      />
      <Zoom in={true}>
        <Fab onClick={submitNote}>
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  );
};

export default EditArea;
