import React, { useEffect, useState } from 'react';
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { Chart } from '../../Components/Chart.js';
import UsrModel from '../../Models/UsrCredentials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


export const Landing = () => {

  const [dataRes, setData] = useState([]);
  const [valid, setValid] = useState(false);
  


  useEffect(() => {

    getSalesInfo();
    ScrollTop();

    if (sessionStorage.getItem("Animacion")) {

      var navbar = document.getElementById('ver-navBar');
      var hornavbar = document.getElementById('hor-navBar');
      var main = document.getElementById('main');

      navbar.classList.add('navbarAnimation');
      hornavbar.classList.add('fadeInAnimation');
      document.getElementById('main').classList.add('fadeInAnimation');


      navbar.addEventListener("animationend", function () {
        navbar.classList.remove('navbarAnimation');
      });
      hornavbar.addEventListener("animationend", function () {
        hornavbar.classList.remove('fadeInAnimation');
      });
      main.addEventListener("animationend", function () {
        main.classList.remove('fadeInAnimation');
      });
      sessionStorage.clear();

    }

  }, []);

  const ScrollTop = () => {

    var hoverUp = $('#hoverUp');

    $(window).scroll(() => {
      if ($(window).scrollTop() > 20) {
        hoverUp.addClass('show');
      } else {
        hoverUp.removeClass('show');
      }
    });

    hoverUp.on('click', e => {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '300');
    });
  }

  const getSalesInfo = async () => {

    try {

      var url = '/getSalesInfo'

      let res = await fetch(url, {
        method: 'post',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        }
      });


      let result = await res.json();

      if (result && result.success) {

        setValid(true);
        setData(result.data);

        return;

      }

    } catch (e) {

      console.log(e);

    }
  }

  document.body.style.backgroundColor = "#F8F8F8";

  if (UsrModel.isLoggedIn) {

    const venTot = dataRes.reduce((acc, val) => acc + val.SumVentasImp, 0);
    const venTotT1 = dataRes.reduce((acc, val) => acc + val.VenT1, 0);
    const venTotT2 = dataRes.reduce((acc, val) => acc + val.VenT2, 0);
    const venTotT3 = dataRes.reduce((acc, val) => acc + val.VenT3, 0);


    return (

      <React.Fragment>
        <NavBar
          text={UsrModel.userName.toUpperCase()}
        />
        <HorizonNavBar
        />
        <main id='main'>
          <div className="flex-container">
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales</h6>
              <p style={{ color: 'green' }}>{formatter.format(venTot)}</p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 1</h6>
              <p style={{ color: 'black' }}>{`${venTotT1.toFixed(2)} Lts`}</p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 2</h6>
              <p style={{ color: 'black' }}>{`${venTotT2.toFixed(2)} Lts`}</p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 3</h6>
              <p style={{ color: 'black' }}>{`${venTotT3.toFixed(2)} Lts`}</p>
            </div>
          </div>
          <br />
          <div className="flex-container">
            <div className="flex-item">
              <Chart data={dataRes} success={valid} />
            </div>
            <div className="flex-item">
              <Chart data={dataRes} success={valid} />
            </div>
          </div>
          <a id="hoverUp" href="/#"><FontAwesomeIcon icon={faChevronUp} /></a>
        </main>
      </React.Fragment>
    );

  } else {

    return (
      <div>
        <login></login>
      </div>
    );
  }

}
