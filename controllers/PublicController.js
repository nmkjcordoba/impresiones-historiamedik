
const Prescripcion = async (req, res) => {
    var pdf = require('html-pdf');

    var contenido = `
    <h1>Esto es un test de html-pdf</h1>
    <p>Estoy generando PDF a partir de este código HTML sencillo</p>
    `;

    
    try {
        pdf.create(contenido).toFile('./salida.pdf', function(err, resp) {
            if (err){
                console.log(err);
            } else {
                res.status(200).json({resp});
                console.log(resp);
            }
        });
       
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    Prescripcion
}