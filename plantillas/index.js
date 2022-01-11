

module.exports = {
    constancia:() => (`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Factura PDF</title>
            <style>
                body {
                    padding: 1rem;
                    box-sizing:border-box;
                    font-size: 8pt;
                }
                    
                *,
                ::after,
                ::before {
                    box-sizing: inherit;
                }
                table {
                    width: 100%;
                }
                .header {
                    /*width: 50%;*/
                    text-align: center;
                    margin: auto;
                }
                
                .logo {
                    width: 850px;
                    height: 100px;
                    background-image: url("data:image/png;base64,@prov_Logo");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    margin: auto;
                }

                hr {
                    height: 1px;
                    background-color: rgb(156, 156, 156);
                }
                h3::after {
                    content: '';
                    border-bottom: 3px solid #000;
                    width: 200px;
                    display: block;
                } 

                .info-patient > p{
                    display: inline-block;
                    margin: 0 0.5rem 0rem 0;
                }

                .table {
                    border-bottom: 2px solid black;
                    font-size: 8pt;
                }
                .table thead tr {
                    font-weight: bolder;

                }
                .table tbody td, .table thead td {
                    padding-bottom: 1rem;

                }

                .footer-factura {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    align-items: flex-end;
                }

                .footer-factura p, .info-patient p {
                    margin: 0.5rem 0;
                }

                .doctor-sign::before {
                    content: '';
                    border-top: 2px solid #000;
                    width: 200px;
                    display: block;
                }
                .firma-logo {
                    background-image: url("data:image/png;base64,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");
                    width: 120px;
                    height: 60px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .container-sign {
                    width: 150px;
                    margin-left: auto;
                }
                .text-end {
                    text-align: end;
                }
                .content1 {
                    width: 35%;
                }
                .content2 {
                    width: 50%;
                }
                .content3 {
                    width: 15%;
                }


        </style>
    </head>
    <body>
        <header class="header">
                <table>
                    <tr>
                        <td class="logo"></td>
                    </tr>
                </table>
            <!--<div> <p><b>Fecha: </b> ___________</p></div>
            <div class="logo"></div>-->
        </header>
        <main class="main">
                
                <h3>Datos del Paciente</h3>
                <div class="info-patient">
                    <p><b>Nombre: </b><span>@pat_Name</span></p>
                    <p><b>Documento: </b> @pt_TipoId @pt_Identificacion</p>
                    <p><b>Telefono: </b> @pat_Phone</p>
                    <p><b>Dirección: </b> @pat_Address</p>
                    <p><b>EPS: </b> @pat_Eps</p>
                    <p><b>Fecha y hora de prestacion: </b> @cita_Date @cita_Hora horas</p>
                </div>
            <!--
            <h3>Datos del Paciente</h3>
            <div class="info-patient">
                <table>
                    <tr>
                        <td><p><b>Nombre: </b><span>@pat_Name </span></p></td>
                        <td><p><b>Documento: </b> @pt_TipoId @pt_Identificacion </p></td>
                    </tr>
                    
                    <tr>  
                        <td><p><b>Telefono: </b> @pat_Phone </p></td>
                        <td><p><b>direccion: </b> @pat_Address </p></td>
                        <td><p><b>EPS: </b> @pat_Eps </p></td>
                    </tr>
                    <tr>
                        <td><p><b>Fecha y hora de prestacion: </b> @cita_Date @cita_Hora horas </p></td>
            
                    </tr>

                </table>
            </div>-->
            <hr>
            <h3>Contancia de prestación de servicio</h3>
            
            <div class="table">
                <ul>
                    <li>
                    <span>	
    Este documento se firma en constancia de la prestación del servicio de  @cita_Tipo por parte de @prov_Name, dando alcance a lo dispuesto por la Resolución 3047 Anexo técnico No. 5.</span>
                    </li>
                </ul>
            </div>
            
            <div class="footer-factura">
                <table>
                    <tr>
                        <td>
                        <span>Firma del usuario o acudiente</span>
                        </td>
                        <td >
                            <div class="container-sign">
                                <p>Firma Virtual</p>
                                <div class="firma-logo"></div>
                                <p>@fecha_actual</p>
                            </div>
                        </td>   
                    </tr>
                </table>
            </div>
        </main>
    </body>
    </html>    
    `
    ),
    preescripcion:(drug_name,dosage,quality,dose,units,route,frequency,duration,observation,index,indexDivido) => (`
        <li>
            <span>${drug_name}, ${dosage},Cantidad: ${quality}, Dosis ${dose} ${units}, ${route}, ${frequency},  ${duration}. ${observation}</span>
            ${indexDivido.includes(index) ? `<div class="pagebreak"> </div>
                <div style="text-align: center; margin: 10px auto;">
                    <div> <p style="margin: 0;"><b>Fecha: </b> @fecha</p></div>
                    <table>
                        <tr>
                            <td class="logo"></td>
                        </tr>
                    </table>
                </div>
            `: ''}
        </li>
        `
    ),
    incapacidad:(incapacidad,fecha_incio,fecha_fin,dias,prorroga,index,indexDivido) => (`
        <li>
            <span>${incapacidad}, Fecha de inicio: ${fecha_incio}, Fecha final: ${fecha_fin}, Días: ${dias}</span>
            <span>Indicaciones: ${prorroga}</span>
            ${indexDivido.includes(index) ? `<div class="pagebreak"> </div>
                <div style="text-align: center; margin: 10px auto;">
                    <div> <p style="margin: 0;"><b>Fecha: </b> @fecha</p></div>
                    <table>
                        <tr>
                            <td class="logo"></td>
                        </tr>
                    </table>
                </div>
            `: ''}
        </li>
        `
    ),
    procedimientos:(descripcion_orden,instrucciones,index,indexDivido) => {
        
        return(
            `
            <li>
                <span>${descripcion_orden},Instrucciones: ${instrucciones}</span>
                ${indexDivido.includes(index) ? `<div class="pagebreak"> </div>
                    <div style="text-align: center; margin: 10px auto;">
                        <div> <p style="margin: 0;"><b>Fecha: </b> @fecha</p></div>
                        <table>
                            <tr>
                                <td class="logo"></td>
                            </tr>
                        </table>
                    </div>
                `: ''}
            </li>
            `
        )
    },
    recomendaciones:(descripcion_orden,instrucciones,index,indexDivido) => (`
        <li>
            <span>${descripcion_orden}, Intrucciones: ${instrucciones}.</span>
            ${indexDivido.includes(index) ? `<div class="pagebreak"> </div>
                <div style="text-align: center; margin: 10px auto;">
                    <div> <p style="margin: 0;"><b>Fecha: </b> @fecha</p></div>
                    <table>
                        <tr>
                            <td class="logo"></td>
                        </tr>
                    </table>
                </div>
            `: ''}
        </li>
        `
    ),
    historia:() => {`
        <html>
            <h1>Esto es un test de html-pdf</h1>
            <p>Estoy generando PDF a partir de este código HTML sencillo</p>
        </html>`
    },

    plantillaPrincipal:(tipoOrden,orden,imprimirTodo) => (
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Ordenes PDF</title>
            <style>
                    body {
                        padding: 1rem;
                        box-sizing:border-box;
                        font-size: 8pt;
                        font-family: Arial, sans-serif;
                    }
                        
                    *,
                    ::after,
                    ::before {
                        box-sizing: inherit;
                    }
                    table {
                        width: 100%;
                    }
                    .header {
                        /*width: 50%;*/
                        text-align: center;
                        margin: auto;
                    }
                    
                    .logo {
                        width: 850px;
                        height: 100px;
                        background-image: url("data:image/png;base64,@logo");
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        margin: auto;
                    }
                    hr {
                        height: 1px;
                        background-color: rgb(156, 156, 156);
                    }
                    h3 {
                        border-bottom: 3px solid #000;
                    }
        
        
                    .info-patient > p{
                        display: inline-block;
                        margin: 0 0.5rem 0rem 0;
                    }
                    
                    .lista {
                        border-bottom: 3px solid black;
                    }
                    .table thead tr {
                        font-weight: bolder;
        
                    }
                    .table tbody td, .table thead td {
                        padding-bottom: 0.5rem;
                    }
        
                    .footer-factura {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 0rem;
                        align-items: flex-end;
                    }
        
                    .footer-factura p{
                        margin: 0.5rem 0;
                    }
        
                    .doctor-sign::before {
                        content: '';
                        border-top: 2px solid #000;
                        width: 200px;
                        display: block;
                    }
                    .firma-logo {
                        background-image: url("data:image/png;base64,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");
                        width: 100px;
                        height: 60px;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
        
                    .virtual-logo {
                        background-image: url("data:image/png;base64,@firma");
                        width: 150px;
                        height: 70px;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                    .container-sign {
                        width: 100px;
                        margin-left: auto;
                        font-size:10px;
                    }
                    .text-end {
                        text-align: end;
                    }
                    .content1 {
                        width: 35%;
                    }
                    .content2 {
                        width: 50%;
                    }
                    .content3 {
                        width: 15%;
                    }
                    .pagebreak { 
                        page-break-before: always; 
                        margin-button:30px;
                    } /* page-break-after works, as well */
            </style>
        </head>
        <body>
            <header class="header">
                <div> <p style="margin: 0;"><b>Fecha: </b> @fecha</p></div>
                <table>
                    <tr>
                        <td class="logo"></td>
                    </tr>
                </table>
                <!--<div class="logo"></div>-->
            </header>
            <main class="main">
                
                
                <h3>Datos del Paciente</h3>
                <div class="info-patient">
                    <p><b>Nombre: </b><span>@nombreCompleto</span></p>
                    <p><b>Documento: </b> @tipo_identificacion @identificacion</p>
                    <p><b>Genero: </b> @genero</p>
                    <p><b>Edad: </b> @edad</p>
                    <p><b>Estado Civil: </b> @EstadoCivil </p>
                    <p><b>Telefono 1: </b> @Telefono</p>
                    <p><b>Telefono 2: </b> @Telefono2 </p>
                    <p><b>Dirección: </b> @Direccion</p>
                    <p><b>Tipo Afiliación: </b> @TipoAfiliacion</p>
                    <p><b>Pagador: </b> @eps</p>
                    <p><b>Diagnostico: </b> @diagnostico </p>
                    <p><b>CUP: </b> @cup</p>
                </div>
                
                <h3>${tipoOrden}</h3>
                <div class="lista">
                    <ul>
                        ${orden}
                    </ul>
                </div>
                
                <div class="footer-factura" ${imprimirTodo == 1 ? 'id="pageFooter"':""} >
                    <table>
                        <tr>
                            <td>
                                <div style="font-size: 11px;">
                                    <div class="virtual-logo"></div>
                                    <p class="doctor-sign"><b>Dr (a): </b><span>@nombres</span></p>
                                    <p><b>N°: </b><span>@identifier</span></p>
                                    <p>@profesiones</p>
                                </div>
                            </td>
                            <td >
                                <div class="container-sign text-end">
                                    <p>Firma Virtual</p>
                                    <div class="firma-logo"></div>
                                    <p>@f_encuentro</p>
                                </div>
                            </td>   
                        </tr>
                    </table>
                </div>
            </main>
        </body>
        </html>
    `
    )
}