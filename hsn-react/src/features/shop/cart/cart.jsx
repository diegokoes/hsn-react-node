import useGlobalState from "@/stores/GlobalState";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./cart-item/cart-item";
import "./cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { pedido, setPedido, cliente } = useGlobalState();

  console.log("pedido en Order.jsx:", pedido);

  return (
    <div className="container">
      {pedido.itemsPedido.length > 0 ? (
        <div className="row">
          <div className="col-9 mt-4">
            <h3>Your basket has {pedido.itemsPedido.length} item(s)</h3>
            <hr />
            <div className="container">
              {pedido.itemsPedido.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col">
                    <CartItem item={item} setPedido={setPedido} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* .... subtotal, gastos envio, total y finalizar pedido ... */}
          <div className="col-3 mt-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span style={{ font: 'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight: "400" }}>
                Subtotal
              </span>
              <span style={{ font: 'normal 1.1em "Roboto", "Open Sans", "sans-serif"', fontWeight: "400" }}>
                {pedido.subtotal.toFixed(2)} €
              </span>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span
                style={{ font: 'normal 1.3em "Roboto", "Open Sans", "sans-serif"', fontWeight: "400", color: "#999" }}
              >
                Shipping
              </span>
              <span style={{ color: "#00b22d", fontWeight: "800", fontSize: "1em" }}>
                {pedido.gastosEnvio.toFixed(2)} €
              </span>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span style={{ font: 'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight: "800" }}>Total</span>
              <span style={{ font: 'normal 2em "Roboto", "Open Sans", "sans-serif"', fontWeight: "800" }}>
                {pedido.total.toFixed(2)} €
              </span>
            </div>
            <div className="mt-3">
              <span style={{ fontSize: "0.75em" }}>
                With this purchase you'll add <strong>0 HSNpoints = 0,00 €</strong>
              </span>
              {!cliente && (
                <span style={{ fontSize: "0.75em" }}>
                  Want to redeem your points?{" "}
                  <strong>
                    <Link to="/Cliente/Login">Log in</Link>
                  </strong>
                </span>
              )}
            </div>
            <button
              type="button"
              className="btn btn-hs1 w-100 mt-2"
              onClick={() => navigate("/Pedido/FinalizarPedido")}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <h3>Your basket is empty</h3>
          </div>
        </div>
      )}
    </div>
  );
}
