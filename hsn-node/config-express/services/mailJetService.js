//2º envio de email con mailjet -  invocamos a nuestro servicio REST API
// cliente react -> servicio nodejs -> servicio mailjet apirest
// peticion http post con fetch, también se puede usar axios
const codBASE64_APIKEYS = Buffer.from(
  `${process.env.MAILJET_PUBLIC_APIKEY}:${process.env.MAILJET_SECRET_API}`
).toString("base64");
const enlace_activacion_cuenta = `http://localhost:3000/api/auth/registro/activarCuenta?email=${
  payload.email
}&idCliente=${resInsert.insertedId}&token=${jwt.sign(
  {
    email: payload.email,
    idCliente: resInsert.insertedId.toString(),
  },
  process.env.JWT_SIGNING_KEY,
  { expiresIn: "10min" }
)}&tipo=${tipo}`;

const bodyMail = JSON.stringify({
  Messages: [
    {
      From: {
        Email: "daw590779@gmail.com",
        Name: "Your Mailjet Pilot",
      },
      To: [
        {
          Email: "pixet82308@bllibl.com",
          Name: "testing 1",
        },
      ],
      Subject: "Activa tu cuenta en HSN",
      HTMLPart: `<div style="text-align:center;"><img src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logoHSNReduced.svg" alt="logo tienda HSN"/></div><div><h3>¡Te has registrado en HSN!</h3><br /><p>Gracias por registrarte, por favor confirma tu dirección de correo electrónico para activar tu cuenta con el siguiente enlace:
              <a href="${enlace_activacion_cuenta}">Activar cuenta</a></p></div>`,
    },
  ],
});
const envioEmail = await fetch("https://api.mailjet.com/v3.1/send", {
  method: "POST",
  headers: {
    Authorization: `Basic ${codBASE64_APIKEYS}`,
    "Content-Type": "application/json",
  },
  body: bodyMail,
});

const bodyRespuestaMAILJET = await envioEmail.json();
if (!envioEmail.ok || bodyRespuestaMAILJET.Messages?.[0].Status !== "success") {
  console.error("Mailjet error:", envioEmail.status, envioEmail.statusText, bodyRespuestaMAILJET);
  return resp.status(502).json({ error: "email_not_sent", details: bodyRespuestaMAILJET });
}
