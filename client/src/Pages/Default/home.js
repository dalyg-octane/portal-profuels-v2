import React, { useEffect, useState } from 'react';
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { Chart } from '../../Components/Chart.js';
import UsrModel from '../../Models/UsrCredentials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import GasPriceElement from '../../Components/GasPrices'
import { TankChart } from '../../Components/TankCharts';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const Landing = () => {

  const [dataRes, setData] = useState([]);
  const [dataPrecios, setDataPrecios] = useState([]);

  const [valid, setValid] = useState(false);

  useEffect(() => {

    getSalesInfo();
    getPrecios();
    ScrollTop();

  }, []);


  const getPrecios = async () => {

    try {

      var url = '/GetPrecios'

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

        setDataPrecios(result.data);

        return;

      }

    } catch (e) {

      console.log(e);

    }
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
          <h6>Información a un dia vencido: {(d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString().substring(0, 10)}</h6>
          <div className="flex-container">
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales</h6>
              <p className='custom-p' style={{ color: 'green' }}>{formatter.format(venTot)}</p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 1</h6>
              <p className='custom-p'>{`${numberWithCommas(venTotT1.toFixed(2))}`} <label className='custom-lbl'>Lts</label></p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 2</h6>
              <p className='custom-p'>{`${numberWithCommas(venTotT2.toFixed(2))}`} <label className='custom-lbl'>Lts</label></p>
            </div>
            <div className="flex-item-cards">
              <h6 className="custom-h6">Ventas totales turno 3</h6>
              <p className='custom-p'>{`${numberWithCommas(venTotT3.toFixed(2))}`} <label className='custom-lbl'>Lts</label></p>
            </div>
          </div>
          <br />
          {/* <div className="flex-container">
            <div className="flex-item">
              <h6 className="custom-h6">Gráfica de ventas a un día vencido: {(d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString().substring(0, 10)}</h6>
              <br />
              <TankChart></TankChart>
            </div>
          </div> */}
          <div className="flex-container">
            <div className="flex-item">
              <h6 className="custom-h6">Gráfica de ventas a un día vencido: {(d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString().substring(0, 10)}</h6>
              <br />
              <Chart data={dataRes} success={valid} />
            </div>
          </div>
          <br />
          <GasPriceElement data={dataPrecios} />
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
