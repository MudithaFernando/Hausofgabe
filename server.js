import express from 'express';
import cors from 'cors';
import fs from 'fs';



const server = express();
const PORT = 4000;

// Middleware
server.use(cors());
server.use(express.json()); // Für das Verarbeiten von JSON-Daten


// Hilfsfunktion zum Lesen der Todos aus der JSON-Datei
const readTodos = () => {
    const data = fs.readFileSync('todos.json'); // Lese die Datei synchron
    return JSON.parse(data); // Parsen der JSON-Daten
}

// Hilfsfunktion zum Speichern der Todos in der JSON-Datei
const saveTodos = (todos) => {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2)); // Schreibe die Todos zurück in die Datei
}

// GET-Route für Todos
server.get("/todos", (req, res) => {
    const todos = readTodos(); // Lese Todos aus der Datei
    res.json(todos);
});

// POST-Route für neue Todos
server.post("/todos", (req, res) => {
    const newTodo = {
        userId: 1, // Hier kannst du die Benutzer-ID dynamisch festlegen
        id: Date.now(), // Eindeutige ID generieren (hier basierend auf Zeitstempel)
        title: req.body.title,
        completed: false
    };
    
    const todos = readTodos(); // Aktuelle Todos aus der Datei lesen
    todos.push(newTodo); // Neues Todo hinzufügen
    saveTodos(todos); // Todos in der Datei speichern
    
    res.status(201).json(newTodo); // Antwort mit neuem Todo
});



console.log("Server Online")
server.listen(PORT)