const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const { validateLogin, validateRegistration, authLimiter } = require('../src/middlewares');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
router.post('/register', authLimiter, validateRegistration, async (req, res) => {
    try {
        const { email, password, name, employeeId } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                employeeId,
                role: 'employee'
            }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', authLimiter, validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;