import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState<{ id: number; content: string }[]>([]);
  const [content, setContent] = useState("");

  async function fetchNotes() {
    try {
      const responce = await fetch("http://localhost:7070/notes");
      const data = await responce.json();
      setNotes(data);
    } catch (error) {
      console.log("Error - fetchNotes", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addHendler() {
    const newNote = { id: 0, content };

    try {
      await fetch("http://localhost:7070/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      setContent("");
      fetchNotes();
    } catch (error) {
      console.log("Error - addHendler", error);
    }
  }

  async function deleteNote(id: number) {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    } catch (error) {
      console.log("Error - deleteNote", error);
    }
  }

  function updateNotes() {
    fetchNotes();
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Notes</h1>
        <button className="update" onClick={updateNotes}>
          Обновить
        </button>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <div className="text">{note.content}</div>
            <button className="btn" onClick={() => deleteNote(note.id)}>
              X
            </button>
          </div>
        ))}
      </div>
      <div className="noteForm">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="New note"
        />
        <button className="add" onClick={addHendler}>
          +
        </button>
      </div>
    </div>
  );
}
