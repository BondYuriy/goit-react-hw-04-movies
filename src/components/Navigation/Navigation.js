import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <NavLink exact to={routes.HOME} activeStyle={{ color: '#367a36' }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.MOVIES} activeStyle={{ color: '#367a36' }}>
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
