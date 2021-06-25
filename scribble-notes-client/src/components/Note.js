import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";
import EditIcon from "@material-ui/icons/Edit";
import EditArea from "./EditArea";

function Note(props) {

  const [isEditable, setEditable] = React.useState(false);

  const handleChange = () => {
    setEditable((prev) => !prev);
  };

  const newUpdatedNote = (note) => {
    setEditable((prev) => !prev);
    props.onUpdate(note, props.id,props.noteId);
  };

  return (
    <div>
      {!isEditable ? (
        <Zoom in={true}>
          <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => {
          props.onDelete(props.id,props.noteId);
          }}>
              <DeleteIcon />
            </button>
            <button onClick={handleChange}>
              <EditIcon />
            </button>
          </div>
        </Zoom>
      ) : (
        <EditArea
          title={props.title}
          content={props.content}
          onUpdate={newUpdatedNote}
          noteId={props.noteId}
        />
      )}
    </div>
  );
}

export default Note;
