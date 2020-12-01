import React from "react";
import "./Footer.css";


export default function Footer(props) {
  // Hijos del componente Footer
  const children = props.children;
  return (
    <>
    {/* Muestra los hijos del componente Footer */}
      {children}
      <footer className="footer">
        <a href="">
      <img
            src={require("../../Img/instagram.png")}
            className="ist"
      /></a>
      <a href="">
      <img
            src={require("../../Img/facebook.png")}
            className="ist"
      /></a>
      <div className="texto">Hecho con 💛 por alumnos de Henry.</div>  
      <a href="" className="texto2">Argentina-2020</a>
      </footer>
      </>
  );
}
