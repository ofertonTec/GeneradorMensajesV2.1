//Recuperando el usuario
var userName=localStorage.getItem('usuario');
document.getElementById('mostrarUsuario').textContent=userName;

var mensajeMostrar = document.getElementById('mensajeGenerado');
var mostrarMsgAdicionales = document.getElementById('mensajeGeneradoAdicionales');
//Animando el texto
var contenedorEquipo= document.getElementById('contenedorEquipo');
var texto= document.getElementById('equipo');
var posX=0;
var direccion=1;
var rango=contenedorEquipo.offsetWidth-texto.offsetWidth;
function moverTexto(){
    posX +=5*direccion;
    texto.style.left=posX+"px";
    if(posX>=rango || posX<=0){
        direccion*=-1;
    }
    setTimeout(moverTexto,100);
}
moverTexto();
//Lista de clientes

var lista = JSON.parse(localStorage.getItem("listaClientes"));
if (lista != null) {
    recorrerLista();
}

console.log("Lista cliente:" + lista);
function recorrerLista() {

    //Tabla
    var miTabla = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
    while (miTabla.hasChildNodes()) {
        miTabla.removeChild(miTabla.firstChild);
    }
    var lista = JSON.parse(localStorage.getItem("listaClientes"));
    //Recorremos la lista
    lista.forEach(element => {
        //clase padre
        var tbody = document.getElementById('tBody');
        //Crear un tr
        var tr = document.createElement("tr");
        tr.id = "idTr";
        //Creando los td para cada atributo
        var codigoTd = document.createElement('td');
        var telefonoTd = document.createElement('td');
        var fechaTd = document.createElement('td');
        var descripcionTd = document.createElement('td');
        var tipoGestionTd = document.createElement('td');

        //Agregando el valor a los tds creados
        codigoTd.innerHTML = element.codigo;
        telefonoTd.innerHTML = element.telefono;
        fechaTd.innerHTML = element.fecha;
        descripcionTd.innerHTML = element.descripcion;
        if (element.tipoGestion == "TR") {
            tipoGestionTd.innerHTML = "TR: Seguimiento";
            tr.style.backgroundColor = "yellow";

        } else if (element.tipoGestion == "UR") {
            tipoGestionTd.innerHTML = "UR: Promesa Pago";
            tr.style.backgroundColor = "Lime";
        } else if (element.tipoGestion == "TU") {
            tipoGestionTd.innerHTML = "TU: Volver Llamar";
            tr.style.backgroundColor = "Teal";
        }

        //Agregando al al tr los elementos
        tr.appendChild(codigoTd);
        tr.appendChild(telefonoTd);
        tr.appendChild(fechaTd);
        tr.appendChild(descripcionTd);
        tr.appendChild(tipoGestionTd);

        //Incluyendo el tr al tbody
        tbody.appendChild(tr);
    });
}

//Formulario
document.getElementById('formulario').addEventListener('submit',
    function (event) {

        event.preventDefault();//evita que el formulario se envie automaticamente

        var entidad = document.getElementById('entidad').value;
        var nombresCom = document.getElementById('cliente').value;
        var fecha = document.getElementById('fecha').value;
        var telefono = document.getElementById('telefono').value;
        var monto = document.getElementById('monto').value;
        var tipo = document.getElementById('tipo').value;
        var numero = document.getElementById('numero').value;
        var codigo = document.getElementById('codigo').value;
        var descripcion = document.getElementById('descripcion').value;
        var tipoGestion = document.getElementById('tipoGestion').value;


        var nombresMayus = nombresCom.toUpperCase();
        var tipoMayus = tipo.toUpperCase();

        var cliente = {
            entidad: entidad,
            nombres: nombresMayus,
            fechaPago: fecha,
            telefono: telefono,
            montoPago: monto,
            tipoProducto: tipoMayus,
            numeroProducto: numero,
            codigo: codigo,
            descripcion: descripcion,
            tipoGestion: tipoGestion

        };
        mostrarMensaje(cliente);
    });
var mensaje = "";
function mostrarMensaje(cliente) {
    var iconoWhatsApp = document.getElementById('iconoWhatsApp');
    if (cliente.telefono != null) {
        iconoWhatsApp.style.display = "block";
    }
    var linkWhatsapp = document.getElementById('linkWhatsApp');
    var link = 'http://api.whatsapp.com/send?phone=51' + cliente.telefono
    linkWhatsapp.href = link
    var promesaInterbank = "Sr(a) *" + cliente.nombres + "* Según lo acordado telefónicamente usted se compromete a efectuar el pago correspondiente de S/. *" + cliente.montoPago + "* el día *" + cliente.fechaPago + "* del producto *" + cliente.tipoProducto + "*  Número de cuenta *" + cliente.numeroProducto + "*.\n"
        + "\nRealice el pago en la agencia del *Banco BBVA* más cercana, donde se dirige a ventanilla indicando el *código pago legal* 248 (Soles) o 249 (Dólares) adicionando el número de su DNI o RUC del titular de la cuenta."
        + "\n\nQuedo a la espera del envió del voucher a través de este medio, gracias."
        + "\n\n\n*Cuenta bancaria*"
        + "\n001104024900000023 - (Soles)"
        + "\n01140200490000002359 (Soles)"
        + "\n\n\n*Cuenta interbancaria*"
        + "\n001104024900000031 - (Dolares)"
        + "\n01140200490000003152 (Dolares)";
    var promesaVentanilla = "Sr(a) *" + cliente.nombres + "* Según lo acordado telefónicamente usted se compromete a efectuar el pago correspondiente a S/. *" + cliente.montoPago + "* el día *" + cliente.fechaPago + "* del producto *" + cliente.tipoProducto + "*  Número de cuenta *" + cliente.numeroProducto + "*.\n"
        + "\nRealice el pago en la agencia del *Banco BBVA* más cercana, donde se dirige a ventanilla indicando el *código pago legal 248* adicionando el número de *su DNI del titular de la cuenta*."
        + "\n\nQuedo a la espera del envió del voucher a través de este medio. \n\nAtte:*"+userName+"*\nÁrea Cobranzas";
    var vencida = "Sr(a) *" + cliente.nombres + "* le recordamos que tiene una promesa incumplida con   " + cliente.entidad + " por el monto de S/. *" + cliente.montoPago + "* .\n\nPara que Ud. no pierda los beneficios y su deuda no genere mayor interés, confírmenos su reprogramación para el día de *HOY*. \n\nGracias."

    var recordatorio = "Que tal Sr(a) *" + cliente.nombres + "* , " + cliente.entidad + " le recuerda que tiene un compromiso pendiente para el *" + cliente.fechaPago + "* , por el importe de S/.*" + cliente.montoPago + "* , evite el recálculo de su deuda pagando en la fecha establecida.\n\nRealice el pago en la agencia del *Banco BBVA* más cercana, donde se dirige a ventanilla indicando el *código pago legal 248* adicionando el número de *su DNI del titular de la cuenta*.\n\nEnvíar a la brevedad posible la foto de su comprobante para la conformidad. \n\nSaludos Cordiales.";

    var campaña = cliente.nombres + ', *' + cliente.entidad + '*, tiene un Dscto Especial *PRE_APROBADO*, cancela tu Producto *' + cliente.tipoProducto + '* nro *' + cliente.numeroProducto + '*, con *S/.' +
        cliente.montoPago + '* , Previa evaluación, \n\n*ACTIVALO* comunicándote por este medio.\n\nTramite su *CONSTANCIA DE NO ADEUDO* y Evite seguir manteniendo un reporte negativo en las centrales de riesgo.\n\nDscto válido hasta: *' + cliente.fechaPago + '*'

    var solucion = "*Banco BBVA*, estimado(a) *" + cliente.nombres + "* confiamos en que se encuentre bien.\nNos comunicamos respecto a la *deuda pendiente* que mantiene con el *Banco BBVA*. Valoramos su compromiso y estamos dispuestos a trabajar juntos para encontrar una solución mutuamente beneficiosa. \n\nEs importante mencionar que, de no recibir respuesta en un plazo razonable, nos veremos en la obligación de evaluar *medidas legales disponibles* para recuperar la deuda en su totalidad. Preferimos evitar este camino y llegar a un *acuerdo amigable* .\n\nLa resolución de esta deuda contribuirá a mejorar su *historial crediticio* y *acceso a futuros créditos*, por lo mismo le instamos a ponerse en contacto a la brevedad posible para discutir opciones de pago y resolver esta situación de manera efectiva.\n\n *Agradecemos su atención y cooperación*.";
    var relampago = "*Banco BBVA* tiene un descuento especial *pre aprobado*, cancela tu producto comunicándote por este medio.\n\nTramite su *constancia de no adeudo* y evite seguir manteniendo un reporte negativo en las centrales de riesgo.\n\nDescuento válido solo por 24 horas.";
    var transado = "Buen día Sr(a), le saluda *"+userName+"*, de *Consultores Legales Asociados S.A* con RUC: *20266227192*, por encargo del *Banco BBVA*.\n\nSu expediente migró a esta área para la gestión de cobranza y estamos a su disposición para juntos encontrar soluciones de pago, acordes a su situación evitando la posibilidad que el Banco derive su expediente a una instancia de cobranza mayor por el cobro total de su deuda.\n\nSaludos.";


    if (cliente.tipoGestion == "UR-Agencia") {
        mensaje = promesaVentanilla;
        mensajeMostrar.innerHTML = promesaVentanilla;
    } else if (cliente.tipoGestion == "UR-Interbancaria") {
        mensaje = promesaInterbank;
        mensajeMostrar.innerHTML = promesaInterbank;
    } else if (cliente.tipoGestion == "TR" || cliente.tipoGestion == "TU") {
        mensaje = transado;
        mensajeMostrar.innerHTML = transado;
    }
    else if (cliente.tipoGestion == "campaña") {
        mensaje = campaña;
        mensajeMostrar.innerHTML = campaña;
    } else if (cliente.tipoGestion == "recordatorio") {
        mensaje = recordatorio;
        mensajeMostrar.innerHTML = recordatorio;
    } else if (cliente.tipoGestion == "vencida") {
        mensaje = vencida;
        mensajeMostrar.innerHTML = vencida;
    } else if (cliente.tipoGestion == "solucion") {
        mensaje = solucion;
        mensajeMostrar.innerHTML = solucion;
    } else if (cliente.tipoGestion == "relampago") {
        mensaje = relampago;
        mensajeMostrar.innerHTML = relampago;
    }

    if (cliente.tipoGestion == "UR-Agencia" || cliente.tipoGestion == "UR-Interbancaria" || cliente.tipoGestion == "TR" || cliente.tipoGestion == "TU") {
        if (cliente.codigo != "" && cliente.telefono!="" && cliente.fecha!="" && cliente.descripcion!="") {
            cargarTabla(cliente);
        }
    }

    document.getElementById('formulario').reset();
}

document.getElementById('mensajesEsta').addEventListener('change', function (event) {
    var mensajesEstand = event.target.value;
    var recepcionVoucher = "Buen día estimado(a), hemos recibido la foto del comprobante del pago realizado.\nLuego de *7-13 días hábiles* después de haber enviado la foto del voucher, recibirá en su correo electrónico el *Contrato de Transacción Extrajudicial y Condonación* para que los descargue, imprima, firme y los envié al correo desde donde se le envió.\n\nTiene un plazo máximo de *10 días hábiles* que  envié los documentos firmados al correo.\n\nUna vez que envíe los documentos firmados, en un plazo de *3-10 días hábiles* le estarán enviando la *Carta de no adeudo* a su correo electrónico.\n*Por favor indicar un correo electrónico para remitirle la información dentro del plazo establecido*\n\nAtte:"+userName+"\nÁrea Cobranzas";
    var pedirDocumento = "Estimado/a cliente, para garantizar la seguridad de su cuenta ¿Podría proporcionar su DNI/RUC ,por favor?\n\nEsto nos ayudará a brindarle información más detallada.\n\nGracias por su comprensión.";
    var sinInformacion = "No nos figura información con los datos brindados.\n\nDisculpe la confusión. Nuestro mensaje anterior estaba destinado al titular de la cuenta.\nSi no es el titular, por favor, ignore este mensaje. Indique *EQUIVOCADO* para retirar su número de la base de datos.\n\n¡Gracias por su comprensión!.";
    var transfBanInter = "Si va a realizar el pago por trasferencia bancaria o interbancaria, validar antes de hacer el deposito se realice a la cuenta del:\n*Banco BBVA Perú*  e indicarme el nombre del titular de la cuenta de origen , para enviar a aplicar el pago.";
    var pagoVentanilla = "Si va a realizar el pago en ventanilla del *Banco BBVA* más cercana, indique en ventanilla  *CODIGO PAGO LEGAL 248*  adicionando el número del *DNI del titular de la cuenta*.";
    var pedirVoucher = "Buen día estimado cliente , no olvidar remitir la foto del comprobante del pago realizado para la conformidad.\n\nSaludos.";
    var cartaCampaña = "*043325003*  Porfavor remitir carta campaña al correo y por este medio. Gracias.";
    var cartaCampañaManual = "*[Nombre del cliente]*\n\nMonto negociado : *S/.3800*\n\n1° abono :  S./.12000 Fecha  14-03-2024\n2° abono :  S./.5292 Fecha    30-04-2024\n3° abono :  S./.5292 Fecha    30-05-2024\n\nPorfavor remitir carta campaña por este medio y al correo: , porfavor";
    var uniProducto = "*WILFREDO FLORES CASTREJON*\n\n*Banco BBVA*  Cancela  tu\n\nPRODUCTO *PRÉSTAMOS* nro de cuenta *001108149602643177* con *S/.1382*\n\nDscto válido solo por 48 horas\n\nComuníquese con su asesor(a) a cargo: Sr(a). *"+userName+"*\n\nSaludos.";
    var multiProducto = "*ALTERNA BUSINESS SAC*\n\n*Banco BBVA*  Cancela  tus productos:\n\n*PRÉSTAMOS*   nro de cuenta *001104379601937852* con  :  *S/.8399*\n*TARJETAS*   nro de cuenta *001104379602053672* con  : *S/.1600*\n\nDscto válido solo por 48 horas\n\nComuníquese para gestionar su pago, por este medio.\n\nAtte.*"+userName+"*\nÁrea Cobranzas";
    var pagoTransferencia = "*Cod. Deudor*: 043328908\n*Nombre titular* : CARLOS DAVID FELIPE GUERRERO\n*Dni*: 71044564\n*Cta*:  001101609600233724\n*Código central*: 26762486\n*Interb./banc./agente*: TRANSF.INTERBANCARIA INTERBANK\n*Fecha de pago*: 08/03/2024\n*Monto pagado*: S/.1000.00\n*Titular cuenta*: CARLOS DAVID FELIPE GUERRERO";
    var asesorComunicará ="Buen día Sr(a) en breve un asesor se pondrá en contacto con usted.\n\nSaludos";
    var solicitarRespuesta="Estimado cliente\n\nNos dirigimos a usted en relación a la propuesta brindada para la solución de su deuda pendiente con el *Banco BBVA*.Es importante que se comunique con nosotros de inmediato para confirmar su aceptación o discutir cualquier ajuste.\n\nSu pronta respuesta es necesaria para evitar las posibles acciones adicionales.\n\nAtte:*Área Cobranzas*"
    var promesaUniProducto="Sr(a) **, según lo acordado telefónicamente usted se compromete a realizar el pago el **, de su Producto *PRESTAMO* nro de cuenta ** el importe de  S/.**.\n\nRealice el pago en ventanilla indicando *CODIGO PAGO LEGAL 248* adicionando el nro de *DNI del titular de la cuenta*.\n\nNo se olvide enviarnos las fotos de los comprobantes para la conformidad, por este medio.\n\nAtte:*Joel Llacsahuache*\nÁrea de Cobranzas"
    var promesaMultiProducto="Sr(a) **, según lo acordado telefónicamente usted se compromete a realizar los siguientes pagos el **:\n\nProducto *PRESTAMO* nro de cuenta ** importe S/.**.\nProducto *TARJETA* nro de cuenta ** importe S/.**.\n\nRealice el pago en ventanilla indicando *CODIGO PAGO LEGAL 248* adicionando el nro de *DNI del titular de la cuenta*.\n\nNo se olvide enviarnos las fotos de los comprobantes para la conformidad, por este medio.\n\nAtte:*Joel Llacsahuache*\nÁrea de Cobranzas"
    if (mensajesEstand == "rv") {
        mensaje = recepcionVoucher;
        mostrarMsgAdicionales.innerHTML = recepcionVoucher;
    } else if (mensajesEstand == "pd") {
        mensaje = pedirDocumento;
        mostrarMsgAdicionales.innerHTML = pedirDocumento;
    } else if (mensajesEstand == "si") {
        mensaje = sinInformacion;
        mostrarMsgAdicionales.innerHTML = sinInformacion;
    } else if (mensajesEstand == "tbi") {
        mensaje = transfBanInter;
        mostrarMsgAdicionales.innerHTML = transfBanInter;
    } else if (mensajesEstand == "pv") {
        mensaje = pagoVentanilla;
        mostrarMsgAdicionales.innerHTML = pagoVentanilla;
    } else if (mensajesEstand == "sv") {
        mensaje = pedirVoucher;
        mostrarMsgAdicionales.innerHTML = pedirVoucher;
    } else if (mensajesEstand == "sr") {
        mensaje = solicitarRespuesta;
        mostrarMsgAdicionales.innerHTML = solicitarRespuesta;
    } else if (mensajesEstand == "cc") {
        mensaje = cartaCampaña;
        mostrarMsgAdicionales.innerHTML = cartaCampaña;
    } else if (mensajesEstand == "ccm") {
        mensaje = cartaCampañaManual;
        mostrarMsgAdicionales.innerHTML = cartaCampañaManual;
    } else if (mensajesEstand == "iup") {
        mensaje = uniProducto;
        mostrarMsgAdicionales.innerHTML = uniProducto;
    } else if (mensajesEstand == "imp") {
        mensaje = multiProducto;
        mostrarMsgAdicionales.innerHTML = multiProducto;
    } else if (mensajesEstand == "rvta") {
        mensaje = pagoTransferencia;
        mostrarMsgAdicionales.innerHTML = pagoTransferencia;
    }else if(mensajesEstand=="vll"){
        mensaje= asesorComunicará;
        mostrarMsgAdicionales.innerHTML=asesorComunicará;
    }else if(mensajesEstand=="promesaUni"){
        mensaje=promesaUniProducto;
        mostrarMsgAdicionales.innerHTML=promesaUniProducto;
    }else if(mensajesEstand=="promesaMult"){
        mensaje=promesaMultiProducto;
        mostrarMsgAdicionales.innerHTML=promesaMultiProducto;
    }
    else {
        mensaje = "";
        mostrarMsgAdicionales.innerHTML = "";
    }
});
let btnCopiarAdicionales = document.getElementById('btnCopiarAdicionales');
btnCopiarAdicionales.addEventListener('click', function (e) {
    mostrarMsgAdicionales.select();
    try {
        var successful = document.execCommand('copy');

        if (successful) respuesta.innerHTML = 'Copiado!';
        else respuesta.innerHTML = 'Incapaz de copiar!';
    } catch (err) {
        rpta.innerHTML = 'Browser no soportado!';
    }
    let textArea = document.getElementById('mensaje')
    textArea.innerHTML = ""
});
let btnCopiar = document.getElementById('copiarMensaje');
btnCopiar.addEventListener('click', function (e) {
    mensajeMostrar.select();
    try {
        var successful = document.execCommand('copy');

        if (successful) respuesta.innerHTML = 'Copiado!';
        else respuesta.innerHTML = 'Incapaz de copiar!';
    } catch (err) {
        rpta.innerHTML = 'Browser no soportado!';
    }
    let textArea = document.getElementById('mensaje')
    textArea.innerHTML = ""
});

function cargarTabla(cliente) {
    //Recuperar la lista de objetos
    var listaClientes = JSON.parse(localStorage.getItem('listaClientes')) || [];

    //Nuevo objeto a agregar
    if (cliente.tipoGestion == "UR-Agencia" || cliente.tipoGestion == "UR-Interbancaria") {
        cliente.tipoGestion = "UR";
    }
    var clienteAgendado =
    {
        codigo: cliente.codigo,
        telefono: cliente.telefono,
        fecha: cliente.fechaPago,
        descripcion: cliente.descripcion,
        tipoGestion: cliente.tipoGestion
    };
    var objetoYaIngresado = listaClientes.some(function (item) {
        return item["codigo"] === clienteAgendado.codigo;
    })
    if (!objetoYaIngresado) {
        listaClientes.push(clienteAgendado);
    }
    //Guardar la lista actualizada
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    recorrerLista();

}

var fechaDiv = document.getElementById('fechaDiv');
var telefonoDiv = document.getElementById('telefonoDiv');
var tipoProductoDiv = document.getElementById('tipoProductoDiv');
var numeroProductoDiv = document.getElementById('numeroProductoDiv');
var clienteDiv = document.getElementById('clienteDiv');
var montoDiv = document.getElementById('montoDiv');
var tipoGestionDiv = document.getElementById("tipoGestionDiv");
var codigoDiv = document.getElementById('codigoDiv');
var descripcionDiv = document.getElementById('descripcionDiv');

document.getElementById('tipoGestion').addEventListener('change', function (event) {
    var tipoGestionInput = event.target.value;
    if (tipoGestionInput == "TR" || tipoGestionInput == "TU") {
        fechaDiv.style.display = "block";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";
        clienteDiv.style.display = "none";
        montoDiv.style.display = "none";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "block";
        descripcionDiv.style.display = "block";

    } else if (tipoGestionInput == 'recordatorio') {
        fechaDiv.style.display = "block";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "block";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "none";
        descripcionDiv.style.display = "none";

    } else if (tipoGestionInput == "campaña") {
        fechaDiv.style.display = "block";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "block";
        numeroProductoDiv.style.display = "block";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "block";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "none";
        descripcionDiv.style.display = "none";
    } else if (tipoGestionInput == "vencida") {
        fechaDiv.style.display = "none";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "block";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "none";
        descripcionDiv.style.display = "none";
    } else if (tipoGestionInput == "solucion") {
        fechaDiv.style.display = "none";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "none";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "none";
        descripcionDiv.style.display = "none";

    } else if (tipoGestionInput == "relampago") {
        fechaDiv.style.display = "none";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "none";
        numeroProductoDiv.style.display = "none";
        clienteDiv.style.display = "none";
        montoDiv.style.display = "none";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "none";
        descripcionDiv.style.display = "none";

    } else {
        fechaDiv.style.display = "block";
        telefonoDiv.style.display = "block";
        tipoProductoDiv.style.display = "block";
        numeroProductoDiv.style.display = "block";
        clienteDiv.style.display = "block";
        montoDiv.style.display = "block";
        tipoGestionDiv.style.display = "block";
        codigoDiv.style.display = "block";
        descripcionDiv.style.display = "block";
    }
})
