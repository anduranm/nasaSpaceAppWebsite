const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Email = require('../schemas/emailSchema'); // Importa el modelo de schema

router.post('/sendEMail', async function(req, res) {
  const { email, name, message } = req.body;

  try {
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'aduranm@ucenfotec.ac.cr',
        pass: 'rkmffhnocnrjxgzt'
      },
      tls: { rejectUnauthorized: false }
    };

    const mensaje = {
      from: 'aduranm@ucenfotec.ac.cr',
      to: 'andres1810gogo@gmail.com',
      subject: 'Mensaje de portafolio',
      html: `
        <table id="idTableNodeMailer">
          <tbody id="idTBodyNodeMailer">
            <tr id="trNodeMailerId1" class="class-tr-nodemailer">
              <td>La persona ${name} se ha querido comunicar contigo</td>
            </tr>
            <tr id="trNodeMailerId2" class="class-tr-nodemailer">
              <td>Hemos recibido el correo de parte de ${email}</td>
            </tr>
            <tr id="trNodeMailerId3" class="class-tr-nodemailer">
              <td>${message}</td>
            </tr>
          </tbody>
        </table>
      `
    };

    const transport = nodemailer.createTransport(config);
    await transport.sendMail(mensaje);

    // Guarda los datos en la base de datos utilizando el modelo de schema
    const newEmail = new Email({ email, name, message });
    await newEmail.save();

    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
});

module.exports = router;
