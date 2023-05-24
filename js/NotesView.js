export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">New Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            // Call onNoteAdd handler when add note button is clicked
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                // Call onNoteEdit handler when title or body input fields lose focus
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        // Initially hide the note preview
        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
    
        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <button class="notes__delete-button" data-note-id="${id}">Delete</button>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");
    
        // Empty list
        notesListContainer.innerHTML = "";
    
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
    
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
    
        // Add delete event for each delete button
        notesListContainer.querySelectorAll(".notes__delete-button").forEach(deleteButton => {
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const noteId = event.target.dataset.noteId;
                this.confirmDelete(noteId);
            });
        });
    
        // Add select events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                const noteId = noteListItem.dataset.noteId;
                this.onNoteSelect(noteId);
            });
        });
    }
    confirmDelete(noteId) {
        const doDelete = confirm("Are you sure you want to delete this note?");
    
        if (doDelete) {
            this.onNoteDelete(noteId);
        }
    }
    
    
    updateActiveNote(note) {
        // Update the active note in the note preview section
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        // Remove the "selected" class from all note list items and add it to the active note item
        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        // Show or hide the note preview section based on the "visible" parameter
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}



// export default class NotesView {
//     constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
//         this.root = root;
//         this.onNoteSelect = onNoteSelect;
//         this.onNoteAdd = onNoteAdd;
//         this.onNoteEdit = onNoteEdit;
//         this.onNoteDelete = onNoteDelete;
//         this.root.innerHTML = `
//             <div class="notes__sidebar">
//                 <button class="notes__add" type="button">Add Note</button>
//                 <div class="notes__list"></div>
//             </div>
//             <div class="notes__preview">
//                 <input class="notes__title" type="text" placeholder="New Note...">
//                 <textarea class="notes__body">Take Note...</textarea>
//             </div>
//         `;

//         const btnAddNote = this.root.querySelector(".notes__add");
//         const inpTitle = this.root.querySelector(".notes__title");
//         const inpBody = this.root.querySelector(".notes__body");

//         btnAddNote.addEventListener("click", () => {
//             this.onNoteAdd();
//         });

//         [inpTitle, inpBody].forEach(inputField => {
//             inputField.addEventListener("blur", () => {
//                 const updatedTitle = inpTitle.value.trim();
//                 const updatedBody = inpBody.value.trim();

//                 this.onNoteEdit(updatedTitle, updatedBody);
//             });
//         });

//         this.updateNotePreviewVisibility(false);
//     }

//     _createListItemHTML(id, title, body, updated) {
//         const MAX_BODY_LENGTH = 60;

//         return `
//             <div class="notes__list-item" data-note-id="${id}">
//                 <div class="notes__small-title">${title}</div>
//                 <div class="notes__small-body">
//                     ${body.substring(0, MAX_BODY_LENGTH)}
//                     ${body.length > MAX_BODY_LENGTH ? "..." : ""}
//                 </div>
//                 <div class="notes__small-updated">
//                     ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
//                 </div>
//             </div>
//         `;
//     }

//     updateNoteList(notes) {
//         const notesListContainer = this.root.querySelector(".notes__list");

//         // Empty list
//         notesListContainer.innerHTML = "";

//         for (const note of notes) {
//             const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

//             notesListContainer.insertAdjacentHTML("beforeend", html);
//         }

//         // Add select/delete events for each list item
//         notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
//             noteListItem.addEventListener("click", () => {
//                 this.onNoteSelect(noteListItem.dataset.noteId);
//             });

//             noteListItem.addEventListener("dblclick", () => {
//                 const doDelete = confirm("Are you sure you want to delete this note?");

//                 if (doDelete) {
//                     this.onNoteDelete(noteListItem.dataset.noteId);
//                 }
//             });
//         });
//     }

    

//     updateActiveNote(note) {
//         this.root.querySelector(".notes__title").value = note.title;
//         this.root.querySelector(".notes__body").value = note.body;

//         this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
//             noteListItem.classList.remove("notes__list-item--selected");
//         });

//         this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
//     }

//     updateNotePreviewVisibility(visible) {
//         this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
//     }
// }

// Adding the Delete Button
