import React from "react";
import {
  faGithub,
  faLinkedinIn,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faGift, faEmail } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="contenedor-aboutus">
      <div className="headline">
        <h1 className="titulo-aboutus">NOSOTROS</h1>
        <h4>
          Les presentamos al equipo de i<FontAwesomeIcon icon={faGift} />
          You:
        </h4>
      </div>
      <div className="grid-container">
        <div className="card-1">
          <img
            className="img_nosotros"
            src={require("../Img/aaron.jpg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Aaron Bortnic</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                href="https://www.linkedin.com/in/aaron-bortnic"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/BortnicAaron">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="card-2">
          <img
            className="img_nosotros"
            src={require("../Img/Lucia.jpeg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Lucía Ayala</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                href="https://www.linkedin.com/in/lunia98"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/Lunia98">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="card-3">
          <img
            className="img_nosotros"
            src={require("../Img/franco.jpg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Franco Garzón</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                href="https://www.linkedin.com/in/franco-garz%C3%B3n99"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/FrancoGarzon99">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="card-4">
          <img
            className="img_nosotros"
            src={require("../Img/matias.jpg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Matías Moyano</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                className="elemento"
                href="https://www.linkedin.com/in/matias-moyano-42b74016b"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/matiasnmoyano">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="card-5">
          <img
            className="img_nosotros"
            src={require("../Img/ailin2.jpg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Ailín Nakaganeku</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                href="https://www.linkedin.com/in/ailinak"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/ailinnakaganeku">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="card-6">
          <img
            className="img_nosotros"
            src={require("../Img/tomas.jpg")}
            alt=""
          ></img>
          <div className="info">
            <h2>Tomás Wagner</h2>
            <p>Desarrollador Web Full Stack</p>
          </div>
          <div className="social-container">
            <div className="social-media">
              <a
                className="elemento"
                href="https://www.linkedin.com/in/tom%C3%A1s-wagner-7a5538135"
              >
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>{" "}
              </a>
            </div>
            <div className="social-media2">
              <a className="elemento" href="https://github.com/pivotrooky">
                <span>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
