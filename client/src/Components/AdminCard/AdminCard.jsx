import React from "react";
import "./AdminCard.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
export default function AdminCard() {
  return (
    <div className="container-home-admin">
      <div className="flex-text-admin">
        <h1 className="title">Admin</h1>
        <h4 className="subtitle">
          We<FontAwesomeIcon icon={faGift} />
          you... poderes de admin. No rompas todo.
        </h4>
      </div>
      <div className="admin-container">
        <Link to="/users">
          <Button className="admin-link" size="lg">
            Users
          </Button>
        </Link>
        <Link to="/form">
          <Button className="admin-link" size="lg">
            Productos
          </Button>
        </Link>
        <Link to="/formCategory">
          <Button className="admin-link" size="lg">
            Categorias
          </Button>
        </Link>
        <Link to="/orders">
          <Button className="admin-link" size="lg">
            Ordenes
          </Button>
        </Link>
        <Link to="/formQuiz">
          <Button className="admin-link" size="lg">
            Cuestionario
          </Button>
        </Link>
      </div>
    </div>
  );
}
