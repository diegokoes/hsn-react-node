const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const API_STRIPE_URL = "https://api.stripe.com/v1";
function createJWTStripe(server_signature, payload) {}

function verifyJWTuser(token, email, id) {
  try {
    const jwtDecoded = jwt.verify(token, process.env.JWT_SIGNING_KEY);
    if (jwtDecoded.email === email && jwtDecoded.idCliente === id) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Error verifying JWT:", err);
    return false;
  }
}

module.exports = {
  createCustomerStripe: async (token, id, name, lastName, email, address) => {
    if (!verifyJWTuser(token, email, id)) {
      throw new Error("Invalid user token");
    }
    try {
      const petCustomer = await fetch(`${API_STRIPE_URL}/customers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {
          name,
          email,
          "address[line1]": address.street,
          "address[city]": address.city,
          "address[state]": address.province,
          "address[country]": address.country,
          "address[postal_code]": address.postal_code,
        },
      });

      const petCustomerJson = await petCustomer.json();
      return petCustomerJson.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  createCardStripe: async (customerId, cardDetails) => {
    try {
      const token = await stripe.tokens.create({
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
        },
      });

      const card = await stripe.customers.createSource(customerId, {
        source: token.id,
      });
      return card;
    } catch (error) {
      console.error("Error creating card:", error);
      throw error;
    }
  },
  createPayment: async (customerId, cardId, amount) => {},
};
