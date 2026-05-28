import React from "react";
import {useState,useEffect} from "react";
import api from "../api";
import Notes from "../components/Notes";
import "../styles/Home.css";


// view all notes and create new note
function Home() {
    const [notes,setNotes] = useState([]);
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");

    //as soon as we get into this page we fetch all the notes of the user
    useEffect(()=>{
        getNotes();
    },[])

    //connect it to the route
    const getNotes=()=>{
        api.get("/api/notes/").then((res)=>res.data)
        .then((data)=>{setNotes(data); console.log(data)})
        .catch((error)=>alert(error));
    }

    const deleteNote=(id)=>{
        api.delete(`/api/notes/delete/${id}/`).then((res)=>{
            if (res.status === 204) {
                alert("Note deleted successfully");
            }
            else alert("Failed to delete the note");
            getNotes();
        }).catch((error)=>alert(error));

        //optimally hav to removeit from thelist
        // setNotes(notes.filter((note) => note.id !== id));
        getNotes();
    }

    const createNote=(e)=>{
        e.preventDefault();
        api.post("/api/notes/",{content,title}).then((res)=>{
            if (res.status === 201) {
                alert("Note created successfully");
            }
            else alert("Failed to create the note");
            getNotes();
        }).catch((error)=>alert(error));
    }

    //display notes and then a form
    return <div>
        <div>
            <h2>Notes</h2>
            {
                notes.map((note)=>(
                    <Notes key={note.id} note={note} onDelete={deleteNote} key={note.id}/>
                ))
            }
        </div>

        <div>
            <h2>Create Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <label htmlFor="content">Content</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
                <br />
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    </div>
}

export default Home;