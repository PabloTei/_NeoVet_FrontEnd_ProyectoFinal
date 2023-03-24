import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { NeovetContext } from '../../context/neovetContext';
import Button from '../../UI/Button';

const Header = () => {
  const { logout, user } = useContext(NeovetContext);

  const typeUser = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <img
        src="https://res.cloudinary.com/depifliz3/image/upload/v1679478181/Neovet_blanco_Mesa_de_trabajo_1_uii63w.png"
        alt="logo Neovet"
      />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {localStorage.getItem('user') && typeUser.rol === 'userAdmin' && (
          <li>
            <NavLink to="/staff">Staff</NavLink>
          </li>
        )}
        {localStorage.getItem('user') && typeUser.rol === 'userClient' && (
          <li>
            <NavLink to="/userclients">Cliente</NavLink>
          </li>
        )}
        {localStorage.getItem('token') ? (
          <li className="logout-li">
            <Button padding="lg" text="Logout" variant="contained" action={logout} />
          </li>
        ) : (
          <>
            <li>
              <NavLink to="#">Login</NavLink>
              <ul>
                <li className="dropdown-li">
                  <NavLink to="/loginstaff">Login Staff</NavLink>
                </li>
                <li className="dropdown-li">
                  <NavLink to="/loginclientes">Login Clientes</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a href="/#formulario">
                <Button text="Regístrate" padding="lg" variant="contained" />
              </a>
            </li>
          </>
        )}
        <li>
          {user && typeUser.rol === 'userClient' && (
            <div className="avatar-staff">
              <h4>Bievenide, {user.name}</h4>
            </div>
          )}
          {user && typeUser.rol === 'userAdmin' && (
            <div className="avatar-staff">
              <div>
                <h4>{user.name}</h4>
                <p>{user.position}</p>
              </div>
              <img src={user.avatar} alt={user.avatar} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
