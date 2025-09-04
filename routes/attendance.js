const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const { verifyToken, validateAttendance, attendanceLimiter, employeeOrAdmin } = require('../src/middlewares');

const router = express.Router();
const prisma = new PrismaClient();

// Record attendance
router.post('/', attendanceLimiter, verifyToken, validateAttendance, async (req, res) => {
    try {
        const { employeeId, type } = req.body;
        
        const attendance = await prisma.attendance.create({
            data: {
                employeeId,
                type,
                timestamp: new Date(),
                userId: req.user.id
            }
        });

        res.status(201).json({
            message: 'Attendance recorded successfully',
            attendance
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get attendance records
router.get('/', verifyToken, employeeOrAdmin, async (req, res) => {
    try {
        const { employeeId, date } = req.query;
        
        let where = {};
        if (employeeId) where.employeeId = employeeId;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            where.timestamp = { gte: startDate, lt: endDate };
        }

        const records = await prisma.attendance.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            take: 100
        });

        res.json({ records });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;