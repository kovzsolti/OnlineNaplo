const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database connection
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// GET all notes
app.get('/api/notes', (req, res) => {
    db.all('SELECT * FROM notes ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// POST new note
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    db.run(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                id: this.lastID,
                title,
                content
            });
        }
    );
});

// PUT update note
app.put('/api/notes/:id', (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;

    db.run(
        'UPDATE notes SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ updated: this.changes });
        }
    );
});

// DELETE note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    db.run(
        'DELETE FROM notes WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ deleted: this.changes });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});