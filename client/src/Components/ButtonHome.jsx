import React from "react";
import "./ButtonHome.css";

export default function ButtonHome({ name }) {
  return (
    <button className="button-home">
      <span className="text-button-home">{name}</span>
    </button>
  );
}
