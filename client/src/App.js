import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import UsrModel from './Models/UsrCredentials';
import { Redirect } from 'react-router-dom';
import LoggedIn from './Components/CommonFunctions/LoggedIn'

export const App = observer(() => {

  useEffect(() => {

    if (!sessionStorage['Animacion']) {
      sessionStorage.setItem('Animacion', true);
    }

    LoggedIn();

  }, []);

  if (UsrModel.isLoggedIn) {
    return (
      <Redirect to='home'></Redirect>
    );
  } else {
    return (
      <Redirect to=''></Redirect>

    );
  }

});
