const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.status(200).json([
            { id: 1, name: 'user1' },
            { id: 2, name: 'user2' },
        ]);
    },
);

module.exports = router;
