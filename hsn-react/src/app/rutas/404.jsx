import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <section className="container py-5 hsn-404">
      <style>{`
        .hsn-404 p { color: #666666; }
        /* remove visible card borders */
        .hsn-404 .hsn-card { border: none; box-shadow: none; transition: none; }
        /* keep a subtle hover state if desired (no border) */
        .hsn-404 .hsn-card:hover { box-shadow: 0 0 0 rgba(0,0,0,0); }
        /* slightly smaller icons */
        .hsn-404 .action-box img { height: 44px; }
        .hsn-404 .action-box p { color: #666666; font-size: .9rem; }

        /* smaller card fonts */
        .hsn-404 .card-body { font-size: .85rem; }

        /* product title inside cards: smaller and bolder */
        .hsn-404 .card-title {
          font-size: .82rem;
          font-weight: 700;
          color: #333333;
          margin-bottom: .35rem;
        }

        /* price text slightly smaller */
        .hsn-404 .card-body .h5 { font-size: .92rem; }

        /* smaller, tighter action buttons/links */
        .hsn-404 .hsn-btn {
          color: #999999;
          border: 1px solid #999999;
          background: transparent;
          padding: .225rem .45rem;
          font-size: .78rem;
          line-height: 1;
        }
        /* ensure card-specific buttons are equally compact */
        .hsn-404 .card .hsn-btn { padding: .2rem .4rem; font-size: .78rem; }

        .hsn-404 .hsn-btn:hover {
          border-color: #cbcbcb;
          color: #999999;
          background: rgba(0,0,0,0.03);
        }
        .hsn-404 a { color: #999999; }
        .hsn-404 a:hover { color: #999999; text-decoration: none; }
      `}</style>

      <div className="row justify-content-center mb-1 text-center">
        <div className="col-12 col-md-10 col-lg-8">
          <img
            src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/cms/404_image.svg"
            alt=""
            className="img-fluid mx-auto d-block"
          />
        </div>
      </div>

      <div className="row text-center">
        <div className="col">
          <h2
            className="display-9 fst-italic text-uppercase"
            style={{ fontFamily: "cursive", fontWeight: 700 }}
          >
            ¡UPPPPPPSSSS!
          </h2>
          <p
            className="lead mb-1 fst-italic"
            style={{ fontFamily: "cursive", fontWeight: 700 }}
          >
            ESTA PÁGINA NO EXISTE O YA NO SE ENCUENTRA DISPONIBLE
          </p>
          <p className="text-muted fw-light ">
            Pero ya que has llegado hasta aquí, podemos ayudarte a que
            encuentres lo que necesitas
          </p>
        </div>
      </div>

      <div className="row g-4 align-items-stretch mt-1">
        <div className="col-12 col-md-4">
          <div className="h-100 rounded-3 p-4 text-center action-box">
            <img
              src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/cms/search_404.svg"
              alt=""
              className="mb-3"
            />
            <p className="fw-semibold mb-0">¿Has probado el buscador?</p>
            <p className="mb-3">¡es rápido y comodísimo!</p>
            <div>
              <Link to="/" className="btn hsn-btn">
                Empezar a buscar
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="h-100 rounded-3 p-4 text-center action-box">
            <img
              src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/cms/Suggest_404.svg"
              alt=""
              className="mb-3"
            />
            <p className="fw-semibold mb-0">¿No encuentras un producto?</p>
            <p className="mb-3">
              Sugiérenos lo que buscas ¡y lo encontraremos por ti!
            </p>
            <div>
              <a
                className="btn hsn-btn"
                href="https://www.hsnstore.com/contacts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar sugerencia
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="h-100 rounded-3 p-4 text-center action-box">
            <img
              src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/cms/Contact_404.svg"
              alt=""
              className="mb-3"
            />
            <p className="fw-semibold mb-0">¿Necesitas ayuda?</p>
            <p className="mb-3">
              Ponte en contacto con nosotros ¡y te ayudaremos en un suspiro!
            </p>
            <div>
              <a
                className="btn hsn-btn"
                href="https://www.hsnstore.com/contacts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar con nosotros
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
