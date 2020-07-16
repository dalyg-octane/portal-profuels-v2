import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../Components/NavBar.js';
import UsrModel from '../Models/UsrCredentials'
import { DynamicTable, NormalTable } from '../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core/';

import $ from 'jquery';

const initialState = [];

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const Profuels = () => {

    const [data, setData] = useState(initialState);
    const [edoctaState, setStateEdo] = useState(false);
    const [edoData, setEdoData] = useState({ data: [], loading: false });


    document.body.style.backgroundColor = '#F8F8F8';

    useEffect(() => {
        getSaldos();
        ScrollTop();
    }, []);

    async function getSaldos() {


        try {

            var url = '/GetSaldos'

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

        } catch (err) {

            console.log(err);

        }

    }

    async function getEdosCta() {

        if (!edoData.loading) {

            try {

                var url = '/getAcctStmt'

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

                    if (result.data.length !== 0) {
                        setEdoData({ data: result.data, loading: true });

                    }

                    return;

                }

            } catch (err) {

                console.log(err);

            }
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

    if (!edoctaState) {

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
                            <p className='primary-text hover-link' onClick={() => {

                                setStateEdo(true);

                            }}
                            >
                                ver estado de cuenta
                            </p>
                        </div>
                        <div className='flex-item' style={{ textAlign: 'center' }}>
                            <p>Nivel de cliente: </p>
                            <p className='title-high'>Gold</p>
                        </div>
                    </div>
                    <br />
                    <div className='flex-container'>
                        <div className='flex-item-cards-btn'>
                            <Button variant="contained" color="primary" fullWidth={true}>
                                Auxiliar de movimientos
                            </Button>
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
    } else {

        getEdosCta();

        return (

            <React.Fragment>
                <NavBar
                    text={UsrModel.userName.toUpperCase()}
                />
                <HorizonNavBar
                />

                <main>
                    <label>Estado de cuenta</label>
                    <NormalTable data={edoData.data} />
                </main>

            </React.Fragment>)
    }

}
