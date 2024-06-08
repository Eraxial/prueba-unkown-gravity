//Requerimos la librería nodemailer y dotenv para hacer uso de sus datos
const nodemailer = require('nodemailer');
require('dotenv').config()

//Creamos el transporter con los datos del .env
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para el puerto 465, para el resto es false
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASS,
  },
});

class EmailService {

  //Método que enviará un correo de verificación al registrar un nuevo usuario
  sendVerificationEmail = (email, verificationUrl) => {

    //Generamos el html de lo que recibirá el usuario al registrarse
    let msgHTML = `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <h1>Haz click en el enlace para verificar tu correo</h1>
          <div>${verificationUrl}</div>
      
        </body>
        </html>`;

        //Verificamos si hay conexión
        transporter.verify().then(console.log).catch(console.error);

        //Construimos la forma que tendrá el correo
        const info = transporter.sendMail({
          from: "Highsa System",
          to: email,
          subject: "Verifica tu correo",
          text: "Verifica tu correo",
          html: msgHTML,
        });
        info.then((res) => console.log(res)).catch((err) => console.log(err));
  }

}

// Exportamos el objeto EmailService para que se puieda usar en todos lados
module.exports = new EmailService();