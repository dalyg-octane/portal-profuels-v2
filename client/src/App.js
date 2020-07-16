import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import UsrModel from './Models/UsrCredentials';
import { Redirect } from 'react-router-dom';

export const App = observer(() => {

  useEffect(() => {

    if (!sessionStorage['Animacion']) {
      sessionStorage.setItem('Animacion', true);
    }
    isLoggedin();
  }, []);

  async function isLoggedin() {

    try {

      var url = '/isLoggedIn'

      let res = await fetch(url, {
        method: 'post',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
      });

      let result = await res.json();

      if (result && result.success) {

        UsrModel.userName = result.userName;
        UsrModel.loading = false;
        UsrModel.isLoggedIn = true;

      } else {

        UsrModel.loading = false;
        UsrModel.isLoggedIn = false;

      }

    } catch (e) {

      UsrModel.loading = false;
      UsrModel.isLoggedIn = false;

    }

  }

  if (UsrModel.isLoggedIn) {
    return (
      <Redirect to='/home'></Redirect>
    );

  } else {
    return (
      <div>
        <Redirect to='/'></Redirect>
      </div>
    );
  }

});
