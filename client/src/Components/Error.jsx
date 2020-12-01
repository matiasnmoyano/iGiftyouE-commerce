import React from "react";

import "./Error.css";
import { faGift, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Errorr() {
  return (
    <body>
      <div className="error-page">
        <div className="content_error">
          <h2 className="header" data-text="404">
            404
          </h2>
          <p className="error_parrafo">La página que estás queriendo ingresar no existe.</p>
          <div className="btns">
            <Link to="/home">i<FontAwesomeIcon icon={faGift} />You</Link>
          </div>
        </div>
      </div>
    </body>
  );
}
