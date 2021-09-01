import React from 'react'
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const Reportes = () => {
    return (
        <>
        <NavBar
            text={UsrModel.userName.toUpperCase()}
        />
        <HorizonNavBar />
        <main>
            <div className='flex-container'>
                <div className='flex-item-cards-btn'>
                    <Link to='/reportes/controlvolumetrico'>
                        <Button variant="contained" color="primary" fullWidth={true}>
                            Control Volumétrico
                        </Button>
                    </Link>
                </div>
                <div className='flex-item-cards-btn'>
                    <Link to='/reportes/facturasemitidas'>
                        <Button variant="contained" color="primary" fullWidth={true}>
                            Facturas emitidas
                        </Button>
                    </Link>
                </div>
                <div className='flex-item-cards-btn'>
                    <Link to='/reportes/VentaPerifericosProductoOficial'>
                        <Button variant="contained" color="primary" fullWidth={true}>
                            Rotativa
                        </Button>
                    </Link>
                </div>
            </div>
            <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
        </main>
    </>
    )
}
