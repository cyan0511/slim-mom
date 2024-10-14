import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
//import Footer from 'components/Footer/Footer';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/*     <Footer /> */}
    </>
  );
};
