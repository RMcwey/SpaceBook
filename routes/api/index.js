const router = require('express').Router();
const courseRoutes = require('./thoughtRoutes');
const studentRoutes = require('./UserRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
