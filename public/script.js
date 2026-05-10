const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');

let editingId = null;

// Load notes
async function loadNotes() {
    const response = await fetch('/api/notes');
    const notes = await response.json();

    notesList.innerHTML = '';

    notes.forEach(note => {
        const div = document.createElement('div');
        div.classList.add('note');

        div.innerHTML = `
            <h3>${note.title}</h3>

<small>
    Létrehozva:
    ${new Date(note.created_at).toLocaleString()}
</small>

<p>${note.content}</p>

            <div class="note-buttons">
                <button onclick="editNote(${note.id}, '${note.title}', '${note.content}')">
                    Szerkesztés
                </button>

                <button onclick="deleteNote(${note.id})">
                    Törlés
                </button>
            </div>
        `;

        notesList.appendChild(div);
    });
}

// Add or update note
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (editingId) {
        await fetch(`/api/notes/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        editingId = null;
    } else {
        await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
    }

    noteForm.reset();
    loadNotes();
});

// Edit note
function editNote(id, title, content) {
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;

    editingId = id;
}

// Delete note
async function deleteNote(id) {
    await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
    });

    loadNotes();
}

// Initial load
loadNotes();