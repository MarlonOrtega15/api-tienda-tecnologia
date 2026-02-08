// Importación de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicialización de la aplicación
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Base de datos simulada en memoria
const users = [];

// Endpoint de registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validar datos
    if (!username || !password) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Verificar si el usuario ya existe
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Guardar usuario
    users.push({ username, password });
    res.json({ message: 'Usuario registrado correctamente' });
});

// Endpoint de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        user => user.username === username && user.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Autenticación fallida' });
    }

    res.json({ message: 'Autenticación satisfactoria' });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('Servidor ejecutándose en http://localhost:' + PORT);
});
