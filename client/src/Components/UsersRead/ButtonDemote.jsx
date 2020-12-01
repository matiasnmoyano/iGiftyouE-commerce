import React, { useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

export default function ButtonDemote({ id, Reload, onDataUser }) {
  const userActive = JSON.parse(localStorage.getItem('User'));
  useEffect(() => {}, [Reload]);

  const quitarAdmin = (id, user) => {
    Axios.post(`http://localhost:3001/auth/demote/${id}`, user, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      Authorization: {
        user: user,
      },
    });
  };
  const handleDemote = (e) => {
    swal({
      text: 'Estas seguro que deseas quitarle los poderes de admin a este usuario?',
      icon: 'warning',
      buttons: ['No', 'Si'],
    })
      .then((respuesta) => {
        if (respuesta) {
          quitarAdmin(id, userActive);
          swal({ text: 'El usuario ya no es admin!', icon: 'success' });
        }
      })
      .then(() => Reload())
      .then(() => onDataUser(false));
  };

  return (
    <div>
      <button onClick={() => handleDemote()} className="button-home">
        Quitar Admin
      </button>
    </div>
  );
}
