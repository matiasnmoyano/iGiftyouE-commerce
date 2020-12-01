import React, { useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

export default function ButtonPromote({ id, Reload, onDataUser }) {
  const userActive = JSON.parse(localStorage.getItem('User'));
  useEffect(() => {}, [Reload]);
  const serAdmin = (id, user) => {
    Axios.post(`${process.env.REACT_APP_API_URL}/auth/promote/${id}`, user, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      Authorization: {
        user: user,
      },
    });
  };
  const handlePromote = (e) => {
    swal({
      text: 'Estas seguro que deseas promover a admin a este usuario?',
      icon: 'warning',
      buttons: ['No', 'Si'],
    })
      .then((respuesta) => {
        if (respuesta) {
          serAdmin(id, userActive);
          swal({ text: 'El usuario ya es admin!', icon: 'success' });
        }
      })
      .then(() => Reload())
      .then(() => onDataUser(false));
  };

  return (
    <div>
      <button onClick={() => handlePromote()} className="button-home">
        Convertir en Admin
      </button>
    </div>
  );
}
