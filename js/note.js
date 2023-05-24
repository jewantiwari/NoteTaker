import NotesView  from "./NotesView.js"

// NotesAPI.saveNote({
//     id: 9158623,
//     title: "New Note!",
//     body: "I am a new note."  
// });

// NotesAPI.deleteNote(9158623);

// console.log (NotesAPI.getAllNotes());

const app = document.getElementById("app");
const view = NotesView(app,{
    // onNoteSelect(){
    //     console.log("Note has been selected!")
    // }
    onNoteAdd(){
        console.log("Lets add a Note!")
    }
});