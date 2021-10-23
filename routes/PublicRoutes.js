const express = require('express');
const router = express.Router();

const {PublicController} = require('../controllers')

router.get('/', (req, res) => res.json({ message: 'Hellossss' }));

router.get(
    '/prescripcion',
    PublicController.Prescripcion
)

module.exports = router;