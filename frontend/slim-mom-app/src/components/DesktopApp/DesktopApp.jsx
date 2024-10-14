import { useMediaQuery } from 'react-responsive';
import React from 'react';
import './DesktopApp.css';
import picture from '../../images/desktopApp.png';

export const DesktopApp = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="desk-app">
      <h2>
        You can download the desktop version of the program to your Windows PC
        from the &nbsp;
      </h2>
      <br />
      <h3>
        To use the desktop version of the application, you need to unzip the
        downloaded archive and execute the file SlimMom.exe
      </h3>
      <br />
      <br />
      <br />
      {isDesktop && <img src={picture} alt="desktop" width="1000" />}
    </div>
  );
};

export default DesktopApp;
