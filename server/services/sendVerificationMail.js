//Requerimos la librería nodemailer y dotenv para hacer uso de sus datos
const nodemailer = require("nodemailer");
require("dotenv").config();

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
          <title>WallaBook</title>
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
      from: "WallaBook",
      to: email,
      subject: "Verifica tu correo",
      text: "Verifica tu correo",
      html: msgHTML,
    });
    info.then(res => console.log(res)).catch(err => console.log(err));
  };

  sendVerificationLoginEmail = (email, code) => {
    //Generamos el html de lo que recibirá el usuario al registrarse
    let msgHTML = `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WallaBook</title>
          <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin: 20px 0;
                padding: 10px;
                border: 2px dashed #dddddd;
                display: inline-block;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Verifica tu correo electrónico</h1>
            <p>Por favor, utiliza el siguiente código para completar el proceso de verificación:</p>
            <div class="code">${code}</div>
            <p>Si no solicitaste esta verificación, puedes ignorar este correo.</p>
            <div class="footer">
              &copy; 2024 WallaBook. Todos los derechos reservados.
            </div>
          </div>
        </body>
        </html>`;

    //Verificamos si hay conexión
    transporter.verify().then(console.log).catch(console.error);

    //Construimos la forma que tendrá el correo
    const info = transporter.sendMail({
      from: "WallaBook",
      to: email,
      subject: "Verifica tu correo",
      text: "Verifica tu correo",
      html: msgHTML,
    });
    info.then(res => console.log(res)).catch(err => console.log(err));
  };
}

// Exportamos el objeto EmailService para que se puieda usar en todos lados
module.exports = new EmailService();
