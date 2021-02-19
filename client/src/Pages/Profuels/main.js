import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import UsrModel from '../../Models/UsrCredentials'
import { DynamicTable } from '../../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from 'axios'

export const Profuels = () => {

    const [data, setData] = useState([]);
    const [saldoDiv, setSaldo] = useState(false);
    const variants = ['h1', 'h3', 'body1', 'caption', 'h1', 'body1'];

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
                setSaldo(true)
            }

        } catch (err) {
            console.log(err);
        }

    }

    const saldoTot = data.reduce((acc, val) => acc + val.MontoASum, 0);
    const dataInvoices = data.map(({ MontoASum, ...keepAttrs }) => keepAttrs);

    document.body.style.backgroundColor = '#F8F8F8';

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
                    {(saldoDiv) ?
                        <DynamicTable data={dataInvoices} />
                        :
                        <div style={{ padding: '2%', backgroundColor: 'white', borderRadius: '5px', height: '60%' }}>
                            {variants.map((variant) => (
                                <Typography component="div" key={variant} variant={variant}>
                                    <Skeleton />
                                </Typography>
                            ))}
                        </div>
                    }
                </div>
                <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
            </main>
        </React.Fragment>
    )
}
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
export default Profuels
