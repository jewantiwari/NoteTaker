export default class NotesAPI {
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("noteTakerApp-notes")|| "[]");

        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated)?-1:1;
        });
    }
    static saveNote(noteToSave){
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
       if (existing){
        existing.title = noteToSave.title;
        existing.body = noteToSave.body;
        existing.updated = new Date().toISOString();

       } else { 
        noteToSave.id = Math.floor(Math.random()*1000000);
        noteToSave.update = new Date().toISOString();
        notes.push(noteToSave);

       } 
       
        localStorage.setItem("noteTakerApp-notes", JSON.stringify(notes));
    }
    static deleteNote(id){
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id !=id);

        localStorage.setItem("noteTakerApp-notes", JSON.stringify(newNotes));

    }
} 