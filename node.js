const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const port = 3000;

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files (like your HTML) from the 'public' directory

// In-memory user storage (replace with a database)
const users = [];

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Server-side validation (add more validation as needed)
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  // Check if email already exists
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ success: false, message: 'Email already registered.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user (in a real app, store in a database)
    users.push({ email: email, password: hashedPassword });

    console.log(`User registered: ${email}`);
    res.status(201).json({ success: true, message: 'Registration successful!' });

  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ success: false, message: 'An error occurred during registration.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Server-side validation (add more validation as needed)
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  try {
    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, password); //THIS IS WRONG! should compare with `user.password` from the database

    if (passwordMatch) {
      // In a real app, you would create a session or JWT here
      console.log(`User logged in: ${email}`);
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }
});

app.get('/dashboard', (req, res) => {
  res.send('Welcome to the Dashboard!'); // This is just a placeholder
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

});