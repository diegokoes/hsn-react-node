import { useState } from "react";
import "./checkout.css";

import useGlobalState from "@/stores/GlobalState";
import Envio from "../stage-1-Envio/Envio";
import Pago from "../stage-2-Pago/Pago";
import Finalizar from "../stage-3-Finalizar/Finalizar";
import OrderInfo from "./order-info/order-info";

export default function Checkout() {
  const { pedido } = useGlobalState();
  const [currentStage, setCurrentStage] = useState(1);
  const [stages, setStages] = useState([
    { Key: 1, Value: "Envio", Component: <Envio />, DatosCompletados: false },
    { Key: 2, Value: "Pago", Component: <Pago />, DatosCompletados: false },
    { Key: 3, Value: "Finalizar", Component: <Finalizar setCurrentStage={setCurrentStage} />, DatosCompletados: false },
  ]);

  function HandlerClickFase(e) {
    const step = parseInt(e.currentTarget.querySelector(".step-title").getAttribute("data-step"));
    setCurrentStage(step);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="title">Enter your data to complete the purchase</div>
          <hr></hr>

          <div id="onestepcheckout-steps-val" className="onestepcheckout-step">
            <div className="steps-val-container" id="steps-val-1" onClick={HandlerClickFase}>
              <div
                className={`step-check ${currentStage === 1 && (stages[0].DatosCompletados ? "checked" : "active")}`}
              >
                <i className="fa fa-check"></i>
              </div>
              <span
                className={`step-title ${currentStage === 1 && (stages[0].DatosCompletados ? "checked" : "active")}`}
                data-step="1"
              >
                Shipping
              </span>
            </div>
            <div className="separator"></div>
            <div className="steps-val-container" id="steps-val-2" onClick={HandlerClickFase}>
              <div
                className={`step-check ${currentStage === 2 && (stages[1].DatosCompletados ? "checked" : "active")}`}
              >
                <i className="fa fa-check"></i>
              </div>
              <span
                className={`step-title ${currentStage === 2 && (stages[1].DatosCompletados ? "checked" : "active")}`}
                data-step="2"
              >
                Payment
              </span>
            </div>
            <div className="separator"></div>
            <div className="steps-val-container" id="steps-val-3" onClick={HandlerClickFase}>
              <div
                className={`step-check ${currentStage === 3 && (stages[2].DatosCompletados ? "checked" : "active")}`}
              >
                <i className="fa fa-check"></i>
              </div>
              <span
                className={`step-title ${currentStage === 3 && (stages[2].DatosCompletados ? "checked" : "active")}`}
                data-step="3"
              >
                Finish
              </span>
            </div>
          </div>

          <div className="stage-component">{stages.find((stage) => stage.Key === currentStage)?.Component}</div>

          {currentStage > 0 && currentStage < 3 && (
            <div className="d-flex flex-row justify-content-between m-4">
              <div onClick={() => setCurrentStage(currentStage - 1)}>
                <span
                  style={{ color: "#666", cursor: "pointer", font: 'normal 1.5em "unineue", "Open Sans", sans-serif' }}
                >
                  <i className="fa fa-chevron-left"></i>Back {currentStage == 1 && "to cart"}
                </span>
              </div>
              <div
                onClick={() => {
                  setCurrentStage(currentStage + 1);
                  setStages(stages.map((st) => (st.Key === currentStage ? { ...st, DatosCompletados: true } : st)));
                }}
              >
                <span className="active">
                  Continue<i className="fa fa-chevron-right"></i>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="col-4">
          <OrderInfo pedido={pedido} />
        </div>
      </div>
    </div>
  );
}
