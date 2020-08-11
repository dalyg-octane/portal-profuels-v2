import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import UsrModel from '../../Models/UsrCredentials'
import { DynamicTable } from '../../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';

import $ from 'jquery';

const initialState = [];

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const Profuels = () => {

    const [data, setData] = useState(initialState);

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
            var url = '/GetSaldos'
            if (mounted) {


                let res = await fetch(url, {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });

                let result = await res.json();


                if (result && result.success) {

                    setData(result.data);

                    return;

                }

            }


        } catch (err) {

            console.log(err);

        }

    }

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

    const saldoTot = data.reduce((acc, val) => acc + val.MontoASum, 0);
    const newArray = data.map(({ MontoASum, ...keepAttrs }) => keepAttrs);

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
                            <p className='primary-text hover-link'>ver estado de cuenta</p>
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
                        <Button variant="contained" color="primary" fullWidth={true}>
                            Antigüedad de saldos
                            </Button>
                    </div>
                    <div className='flex-item-cards-btn'>
                        <Button variant="contained" color="primary" fullWidth={true}>
                            Informe de saldos
                            </Button>
                    </div>
                </div>
                <br />
                <div id='div-profuels-table'>
                    <DynamicTable data={newArray} />
                </div>
                <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
            </main>
        </React.Fragment>
    )

}

export default Profuels
