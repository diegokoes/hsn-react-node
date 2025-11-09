import { useEffect, useRef, useState } from "react";

export default function HeaderTopPageAlert() {
  const intervalRef = useRef(null);

  //#region ---- STATE ----
  const [bannerMessages, setBannerMessages] = useState([
    [
      "Strength Weekend! Hasta 55% DTO en Anabólicos Naturales & Mass Gainers | 42% DTO Directo en el Resto de HSN",
      "#000000",
    ],
    [
      "Hasta 50% DTO en Sistema Inmune y Aparato Respiratorio | Regalo para pedidos de +49€ en Sistema Inmune y Aparato Respiratorio",
      "#54c3d5",
    ],
  ]);
  //#endregion

  //#region ---- EFFECTS ----
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval running");
      setBannerMessages((prevMessages) => {
        const [firstItem, ...otherItem] = prevMessages;
        return [...otherItem, firstItem];
      });
    }, 1000);
    intervalRef.current = intervalId;
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  //#endregion

  //#region ---- HANDLERS ----

  //#endregion

  //#region ---- UTILS ----

  //#endregion
  return (
    <div className="header_top_page_alert" style={{ background: bannerMessages[0][1] }}>
      <div className="header_top_page_alert_container py-2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="h5 mb-0">
                <a href="https://www.hsnstore.com/promociones/list-promo-3" className="text-decoration-none">
                  <b className="h6 ms-1 text-light"> {bannerMessages[0][0]}</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
