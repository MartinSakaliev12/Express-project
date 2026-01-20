import express from "express"
import User from "./models/users.js"

const router = express.Router()

router.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/users/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const user = await User.create({
            name,
            email,
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // update fields   
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await User.destroy({ where: { id } }); 

        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        } 
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error); res.status(500).json({ message: "Server error" });
    }
})
export default router