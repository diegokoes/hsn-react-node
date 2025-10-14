export default function HeaderTopPageAlert() {
  return (
    <div className="header_top_page_alert" style={{ background: "#fff6cc" }}>
      <div className="header_top_page_alert_container py-2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="h5 mb-0">
                <a
                  href="https://www.hsnstore.com/promociones/list-promo-3"
                  className="text-decoration-none"
                >
                  <b className="h5 text-warning">Hasta 55% DTO</b>
                  <b className="h6 ms-1 text-dark">
                    {" "}
                    en Ácidos Grasos Esenciales y Antioxidantes
                  </b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
