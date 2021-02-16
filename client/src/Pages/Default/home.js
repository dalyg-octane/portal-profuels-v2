import React, { useEffect, useState } from 'react';
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
// import { Chart } from '../../Components/Chart.js';
import UsrModel from '../../Models/UsrCredentials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import GasPriceElement from '../../Components/GasPrices'
import { TankChart } from '../../Components/TankCharts';
import Radio from '@material-ui/core/Radio';
import axios from 'axios'


export const Landing = () => {

  const [dataRes, setData] = useState([]);
  const [dataPrecios, setDataPrecios] = useState([]);
  const [selectedValue, setSelectedValue] = useState('1');

  useEffect(() => {
    getSalesInfo();
    getPrecios();
    ScrollTop();
  }, []);

  const handleRadioChange = (e) => {

    setSelectedValue(e.target.value);
    getPrecios(e.target.value);

  }

  const getPrecios = async (t = 1) => {

    try {
      const { data } = await axios.post('/GetPrecios/' + t.toString(), {});
      setDataPrecios(data.data);
    } catch (e) {
      console.log(e);
    }

  }

  const getSalesInfo = async () => {

    try {
      const { res } = await axios.post(`/getSalesInfo`, {});
      setData(res.data);
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
          <h6>Información a un dia vencido: {(d => new Date(d.setDate(d.getDate() - 1)))(new Date()).toISOString().substring(0, 10)}</h6>
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
          <div className="flex-container">
            <div className="flex-item">
              <h6 className="custom-h6">Informaciónde inventarios en tanques 6:00am</h6>
              <br />
              <TankChart></TankChart>
            </div>
          </div>
          {/* <div className="flex-container">
            <div className="flex-item">
              <h6 className="custom-h6">Gráfica de ventas a un día vencido: {(d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString().substring(0, 10)}</h6>
              <br />
              <Chart data={dataRes} success={valid} />
            </div>
          </div> */}
          <br />
          <label>
            <Radio
              checked={selectedValue === '1'}
              onChange={handleRadioChange}
              value="1"
              color="primary"
              name="rbTiposPrecio"
              inputProps={{ 'aria-label': 'D' }}
            />
          Precios actuales
          </label>
          <label>
            <Radio
              checked={selectedValue === '2'}
              onChange={handleRadioChange}
              value="2"
              color="primary"
              name="rbTiposPrecio"
              inputProps={{ 'aria-label': 'E' }}
            />
            Precios para mañana
          </label>
          <br />
          <GasPriceElement key='gasElement' data={dataPrecios} />
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
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
