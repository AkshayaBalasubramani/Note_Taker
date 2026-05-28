//Render all our notes
import React from "react";
import "../styles/Notes.css";

function Notes({ note, onDelete }) {
    //makes date look nicer

    return (
        <div className="note-container">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{new Date(note.created_at).toLocaleString("en-US")}</p>

        {/* //deletes the note on click */}
        <button className="delete-button" onClick={()=>onDelete(note.id)}>
            Delete
        </button>
        </div>
    )
}

export default Notes;

