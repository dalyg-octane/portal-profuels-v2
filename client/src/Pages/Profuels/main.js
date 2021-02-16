import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import UsrModel from '../../Models/UsrCredentials'
import { DynamicTable } from '../../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import axios from 'axios'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const Profuels = () => {

    const [data, setData] = useState([]);

    document.body.style.backgroundColor = '#F8F8F8';

    useEffect(() => {

        let mounted = true
        getSaldos(mounted);
        ScrollTop();
        return function cleanup() {
            mounted = false
        }

    }, []);

    const getSaldos = async (mounted) => {

        try {
            if (mounted) {
                const { data } = await axios.post('/GetSaldos', {});
                setData(data.data);
            }

        } catch (err) {
            console.log(err);
        }

    }

    const saldoTot = data.reduce((acc, val) => acc + val.MontoASum, 0);
    const dataInvoices = data.map(({ MontoASum, ...keepAttrs }) => keepAttrs);

    return (

        <React.Fragment>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div className='flex-container'>
                    <div className='flex-item' style={{ textAlign: 'center' }}>
                        <p>Estatus de cuenta: <span className='boldText' style={{ color: '#e3026f' }}> no corriente</span></p>
                        <p className='title-high'>{formatter.format(saldoTot.toFixed(2))}</p>
                        <Link to='/profuels/estadodecuenta'>
                            <p className='primary-text hover-link'>Ver estado de cuenta</p>
                        </Link>
                    </div>
                    <div className='flex-item' style={{ textAlign: 'center' }}>
                        <p>Nivel de cliente: </p>
                        <p className='title-high'>Gold</p>
                    </div>
                </div>
                <br />
                <div className='flex-container'>
                    <div className='flex-item-cards-btn'>
                        <Link to='/profuels/auxiliardemovimientos'>
                            <Button variant="contained" color="primary" fullWidth={true}>
                                Auxiliar de movimientos
                            </Button>
                        </Link>
                    </div>
                    <div className='flex-item-cards-btn'>
                        <Link to='/profuels/antiguedaddesaldos'>
                            <Button variant="contained" color="primary" fullWidth={true}>
                                Antigüedad de saldos
                            </Button>
                        </Link>
                    </div>
                    <div className='flex-item-cards-btn'>
                        <Link to='/profuels/informedesaldos'>
                            <Button variant="contained" color="primary" fullWidth={true}>
                                Informe de saldos
                            </Button>
                        </Link>
                    </div>
                </div>
                <br />
                <div id='div-profuels-table'>
                    <DynamicTable data={dataInvoices} />
                </div>
                <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
            </main>
        </React.Fragment>
    )

}

export default Profuels
