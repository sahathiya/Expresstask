const express = require('express');
const cors = require('cors');  // Import the CORS middleware

const app = express();
const port = 3000;


app.use(express.json());

app.use(cors());


let users = [];

// POST /users - Create a user
app.post('/users', (req, res) => {
    const { name, email, username } = req.body;

    // Generate a new user ID
    const newUser = {
        id: users.length + 1,
        name,
        email,
        username
    };

    users.push(newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// GET /users - Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:id - Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    res.send(req.params.id)
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

// PUT /users/:id - Update a specific user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, username } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = { id: userId, name, email, username };
    users[userIndex] = updatedUser;

    res.json({ message: 'User updated successfully', user: updatedUser });
});

// DELETE /users/:id - Delete a specific user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});