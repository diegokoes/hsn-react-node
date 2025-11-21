const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "daw590779@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

module.exports = {
  sendAccountActivationMail: async (payload, url_activate_account) => {
    const mailOptions = {
      from: "daw590779@gmail.com",
      to: "hebik46226@fandoe.com",
      subject: "Activación de cuenta",
      html: `<h1>Activación de cuenta, ${payload.email}</h1>
             <p>Por favor, activa tu cuenta haciendo clic en el siguiente enlace:</p>
             <a href="${url_activate_account}">${url_activate_account}</a>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email de activación enviado");
    } catch (error) {
      console.error("Error al enviar email de activación:", error);
    }
  },
};
