require('dotenv').config({ path: './config/db/.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('../generated/prisma');
const { apiLimiter, errorHandler, notFound } = require('./middlewares');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Database connection test
async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(apiLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/attendance', require('../routes/attendance'));
app.use('/api/users', require('../routes/users'));

// Health check with database status
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ 
            status: 'OK', 
            database: 'Connected',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'Error', 
            database: 'Disconnected',
            timestamp: new Date().toISOString() 
        });
    }
});

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Attendance RPA API',
        version: '1.0.0',
        endpoints: {
            auth: {
                'POST /api/auth/register': 'Register new user',
                'POST /api/auth/login': 'Login user'
            },
            attendance: {
                'POST /api/attendance': 'Record attendance (auth required)',
                'GET /api/attendance': 'Get attendance records (auth required)'
            },
            users: {
                'GET /api/users': 'Get all users (admin only)',
                'GET /api/users/profile': 'Get current user profile (auth required)',
                'PUT /api/users/:id': 'Update user (admin only)'
            }
        }
    });
});

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
async function startServer() {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log('\n🚀 Attendance RPA Server Started');
        console.log('================================');
        console.log(`📍 Server: http://localhost:${PORT}`);
        console.log(`📊 Health: http://localhost:${PORT}/health`);
        console.log(`📚 API Docs: http://localhost:${PORT}/api`);
        console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
        console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
        console.log('================================\n');
    });
}

startServer().catch(console.error);

module.exports = app;