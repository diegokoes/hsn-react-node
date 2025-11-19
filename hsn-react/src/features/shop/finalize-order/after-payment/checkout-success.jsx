import useGlobalState from "@/stores/GlobalState";
import { Link } from "react-router-dom";
import ResumenPedido from "../end-payment/order-info/order-info";
import "./checkout-success.css";

function CheckoutSuccess() {
  const { pedido, cliente } = useGlobalState();

  return (
    <div className="container">
      <div className="row"></div>
      <div className="row m-4">
        <div className="col-8">
          <div className="d-flex flex-column">
            <img src="/images/pedidoOK.jpg" style={{ width: "200px", height: "200px" }} alt="..." />
            <h5>
              Payment for order id: {pedido._id}{" "}
              {pedido.metodoPago.tipo == "PayPal" && `on PayPal: ${pedido.metodoPago.detalles.orderID}`} completed
              successfully
            </h5>
            {pedido.metodoPago.tipo == "PayPal" && (
              <div className="d-flex flex-column">
                <span className="text-small">
                  PayPal account id: {pedido.metodoPago.detalles.payer?.payer_id || ""}
                </span>
                <span className="text-small">
                  PayPal account email: {pedido.metodoPago.detalles.payer?.email_address || ""}
                </span>
                <span className="text-small">
                  PayPal account user full name:{" "}
                  {`${pedido.metodoPago.detalles.payer?.name.given_name || ""} ${
                    pedido.metodoPago.detalles.payer?.name.surname || ""
                  }`}
                </span>
              </div>
            )}
          </div>
          <hr />
          <div>
            <p>
              Thanks for your purchase, {cliente.nombre} {cliente.apellidos}!
            </p>
            <p>
              An email has been sent to <span style={{ color: "green" }}>{cliente.cuenta.email}</span> with the invoice
              (check your inbox or spam just in case).
            </p>
            <p> Go to your USER panel to see the list of orders you have placed.</p>
            <Link className="btn btn-success w-100" to="/Cliente/Panel/MisDatos">
              GO TO MY PANEL
            </Link>
          </div>
        </div>
        <div className="col-4">
          <ResumenPedido pedido={pedido} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
