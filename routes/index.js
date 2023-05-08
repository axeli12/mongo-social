const router = require('express').Router();
const apiRoute = require('./api');

router.use('/api', apiRoute);

router.use((req, res) => res.send('Use: api/users api/thoughts to see data'));

module.exports = router;