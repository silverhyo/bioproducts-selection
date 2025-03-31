import React from 'react';
import { useContext } from 'react';

// import Style css
import "./AdminHome.css";

// Import Components
import Footer from '../../Common/Footer';
import Navigation from '../../Common/Navigation';
import NotFound from '../../Common/NotFound';
import AdminSelection0 from '../AdminSelection0';

// import Context
import { AuthContext } from '../../../Context/AuthContext';

export default function AdminHome() {

  const userInformation = useContext(AuthContext).userDatabaseInfo;

  return (
    <>
      <Navigation />
        {userInformation.databaseLevel == 'Admin' ?
        <>
          <AdminSelection0 />
        </>
        :
        <NotFound />
        }
      <Footer />
    </>
  )
}
