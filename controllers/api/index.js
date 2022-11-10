const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
