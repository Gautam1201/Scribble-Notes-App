import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Collapse from '@material-ui/core/Collapse';

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isSelected, setSelected] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    setSelected(false);
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function isClicked() {
    setSelected(true);
  }

  return (
    <div>
      {isSelected ? (
        <Zoom in={true}>
          <form className="create-note">
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              onClick={isClicked}
              placeholder="Scribble ..."
              rows="5"
              required
            />

            <Zoom in={true}>
              <Fab onClick={submitNote}>
                <AddIcon />
              </Fab>
            </Zoom>
          </form>
        </Zoom>
      ) : (
        <Collapse in = {true} timeout = "auto">
          <button className="add-new-note" onClick={isClicked}>
            +
          </button>
        </Collapse>
      )}
    </div>
  );
}

export default CreateNote;
