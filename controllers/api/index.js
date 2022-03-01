const router = require('express').Router();

const pingRoute = require('./ping');
const postsRoute = require('./posts');

router.use('/ping', pingRoute);
router.use('/posts', postsRoute);

module.exports = router;