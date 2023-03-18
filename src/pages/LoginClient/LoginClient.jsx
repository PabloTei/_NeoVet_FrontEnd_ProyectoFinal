import React, { useContext, useEffect, useState } from 'react';
import('./LoginClient.css');

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import { API } from '../../services/API';

const LoginClient = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { login } = useContext(NeovetContext);
  const [errorEmptyfield, setErrorEmptyfield] = useState(null);
  const [otherError, setOtherError] = useState(null);

  const formSubmit = (formData) => {
    if (!formData.email || !formData.password) {
      setErrorEmptyfield('Es necesario rellenar todos los campos del formulario');
      setOtherError(null);
    } else {
      API.post('/userclients/login', formData)
        .then((res) => {
          if (res.status === 200) {
            login(res.data.userClient, res.data.token);
            navigate('/userclients');
          }
        })
        .catch(() => {
          setOtherError('Email o contraseña no coinciden, si eres staff utiliza ');
          setErrorEmptyfield(null);
        });
    }
  };
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => currentTarget.value;

  return (
    <main>
      <h2>Login Clientes</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="email">
          <label htmlFor="email">email</label>
          <input type="text" id="email" name="email" {...register('email')} />
        </div>
        <div className="pass">
          <label htmlFor="password">Password</label>
          <input
            type={shown ? 'text' : 'password'}
            onChange={onChange}
            id="password"
            name="password"
            {...register('password')}
          />
          <button type="button" onClick={switchShown} className="pass_visual">
            {!shown ? (
              <img
                src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1679167363/9206607_zqbsmv.png"
                alt="Ocultar"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1679167348/3495857_pc77ht.png"
                alt="Mostrar"
              />
            )}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      {errorEmptyfield !== null && <h2>{errorEmptyfield}</h2>}
      {otherError !== null && (
        <h2>
          {otherError}
          <a href="/loginstaff">el login de staff</a>
        </h2>
      )}
    </main>
  );
};

export default LoginClient;