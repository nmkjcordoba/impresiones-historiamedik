const express = require('express');
const router = express.Router();

const {ImpresionController, ActualizarCita} = require('../controllers')

router.get('/', (req, res) => res.json({ message: 'Hellossss' }));

router.get(
    '/impresion/encounter/:encounter/uuid/:uuid/r/:r/provider/:provider_id/pac/:pac/cita/:cita',
    ImpresionController.impirmir
)

router.post(
    '/insertAnexos',
    ActualizarCita.InsertAnexo
)

module.exports = router;