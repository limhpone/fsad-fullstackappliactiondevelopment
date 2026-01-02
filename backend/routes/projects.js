var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');

/* GET all projects - protected endpoint */
router.get('/', verifyToken('Authorization'), function(req, res, next) {
    projects = [
        {id: 1, name: 'Water Mgmt'},
        {id: 2, name: 'CLeaning'}
    ]
    res.send(projects);
});

/* GET public projects - public endpoint (no authentication required) */
router.get('/public', function(req, res, next) {
    // Public endpoint accessible to anyone
    const publicProjects = [
        {id: 1, name: 'Water Mgmt', description: 'Public water management project'},
        {id: 2, name: 'Cleaning', description: 'Community cleaning initiative'}
    ];
    res.json({
        success: true,
        data: publicProjects,
        message: 'Public projects retrieved successfully'
    });
});

/* POST create project - protected endpoint (requires authentication) */
router.post('/create', verifyToken('Authorization'), function(req, res, next) {
    // Protected endpoint - only authenticated users can create projects
    const { name, description } = req.body;
    
    // Skeleton implementation
    const newProject = {
        id: Date.now(),
        name: name || 'New Project',
        description: description || 'Project description',
        createdBy: req.user.email,
        createdAt: new Date()
    };
    
    res.status(201).json({
        success: true,
        data: newProject,
        message: 'Project created successfully'
    });
});

module.exports = router;
