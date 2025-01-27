// Imports
import express from "express";
import cors from "cors";
import db from "./database.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
server.get("/", async (req, res) => {
  // Check database connection
  const result = await db.ping();

  if (result) {
    res.send("Node.js REST API with Express.js - connected to database ✨");
  } else {
    res.status(500).send("Error connecting to database");
  }
});

// get all users
server.get("/users", async (req, res) => {
  const query = "SELECT * FROM users"; // SQL query
  const [users] = await db.execute(query); // Execute query
  res.json(users); // Send response
});

// get user by id
server.get("/users/:id", async (req, res) => {
  const query = "SELECT * FROM users WHERE PK_ID = ?"; // SQL query
  const [user] = await db.execute(query, [req.params.id]); // Execute query

  // Check if user exists
  if (user.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  // Send response (user info)
  res.json(user[0]);

  //_______Answer from assignment_______
  // const id = req.params.id;
  // const query = "SELECT * FROM users WHERE PK_ID = ?";
  // const values = [id];
  // const [user] = await db.execute(query, values);
  // res.json(user[0]);
});

// add new user
server.post("/users", async (req, res) => {
  try {
    // Get user data from request body
    const { name, mail, title, image } = req.body;

    // Check if all fields are provided
    if (!name || !mail || !title || !image) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Insert new user into database
    const query =
      "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [name, mail, title, image]);

    // Send response
    res.status(201).json({
      message: "User added successfully!",
      id: result.insertId,
      name,
      mail,
      title,
      image,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding new user" }); // Send error response
  }

  //_______Answer from assignment_______
  //     const newUser = req.body;
  //     const query = "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?)"
  //     const values = [newUser.name, newUser.mail, newUser.title, newUser.image];
  //     const [result] = await db.execute(query, values);
  //     res.json(result);
});

// update user by id
server.put("/users/:id", async (req, res) => {
  try {
    // Get user data from request body
    const { name, mail, title, image } = req.body;

    // Get user ID from URL
    const id = req.params.id;

    // Check if all fields are provided
    if (!name || !mail || !title || !image) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Update user in database
    const query =
      "UPDATE users SET name = ?, mail = ?, title = ?, image = ? WHERE PK_ID = ?";
    const [result] = await db.execute(query, [name, mail, title, image, id]);

    // Check if user was found and updated
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    // Send response
    res.json({
      message: "User updated successfully!",
      id,
      name,
      mail,
      title,
      image,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" }); // Send error response
  }

  //_______Answer from assignment_______
  //     const id = req.params.id;
  //     const updatedUser = req.body;
  //     const query = "UPDATE users SET name = ?, mail = ?, title = ?, image = ? WHERE PK_ID = ?";
  //     const values = [updatedUser.name, updatedUser.mail, updatedUser.title, updatedUser.image, id];
  //     const [result] = await db.execute(query, values);
  //     res.json(result);
});

// delete user by id
server.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM users WHERE PK_ID = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully!", userId: id });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }

  //_______Answer from assignment_______
  // const id = req.params.id;
  // const query = "DELETE FROM users WHERE PK_ID = ?";
  // const values = [id];
  // const [result] = await db.execute(query, values);
  // res.json(result);
});

// ========== Start Server ========== //

// Start server on port 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
