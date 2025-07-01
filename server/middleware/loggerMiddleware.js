// Simple logging middleware for debugging
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
    
    // Log request body for POST/PUT requests (excluding password fields)
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && req.body) {
        const logBody = { ...req.body };
        if (logBody.password) logBody.password = '[HIDDEN]';
        console.log(`[${timestamp}] Request Body:`, logBody);
    }
    
    next();
};

module.exports = logger;
