import React, { useEffect, useState } from 'react'
import { UserLogo } from '../Components/DynamicComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faFire, faHome, faChartLine, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import UsrModel from '../Models/UsrCredentials'
import { Breadcrumbs } from '@material-ui/core'
import { Link } from 'react-router-dom';
import axios from 'axios'

const doLogout = async () => {

    try {
        const { data } = await axios.post('/logout', {});
        if (data && data.success) {
            UsrModel.isLoggedIn = false;
            UsrModel.userName = '';
        } else {
            UsrModel.isLoggedIn = false;
            UsrModel.userName = '';
        }
    } catch (e) {
        console.log(e);
    }

}
export const HorizonNavBar = () => {

    return (
        <nav id='hor-navBar' className='navbarHor'>
            <ul className='navbarHor-nav'>
                <li className='navHor-item'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to='/home'>
                            Home
                        </Link>
                    </Breadcrumbs>
                </li>

                <li className='navHor-item'>
                    <Link to='/home' className={'horIcon'}><FontAwesomeIcon icon={faHome} size={'lg'} color={'#183153'} title={'Home'}/></Link>
                    {/* <Link to='/configuraciones' className={'horIcon'}><FontAwesomeIcon icon={faCogs} size={'lg'} color={'#183153'} title={'Configuraciones'} /></Link> */}
                    <a href='https://helpdesk.grupoeco.com.mx/logon.asp' target='_blank' rel="noopener noreferrer" className={'horIcon'}><FontAwesomeIcon icon={faTicketAlt} size={'lg'} color={'#183153'} title={'Helpdesk'}></FontAwesomeIcon></a>
                    <Link to='/reportes' className={'horIcon'}><FontAwesomeIcon icon={faChartLine} size={'lg'} color={'#183153'} title={'Reportes'} /></Link>
                    <Link to='/profuels' className={'horIcon'}><FontAwesomeIcon icon={faFire} size={'lg'} color={'#FF9600'} title={'Profuels'} /></Link>
                </li>
            </ul>
        </nav>
    )
}
export const NavBar = ({ text }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        GetLinks();
    }, []);

    const GetLinks = async () => {

        try {
            const { data } = await axios.post('/GetLinks', {});
            setData(data.data);

        } catch (e) {
            console.log(e);
        }
        
    }

    const OpenLink = async (Llave) => {

        try {
            const { data } = await axios.post('/ValidaLink', { Llave: Llave });
            window.open(`${data.data[0].Link}`);

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <React.Fragment>
            <nav id='ver-navBar' className='navbar'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a href='/#' className='nav-link'>
                            <UserLogo
                                className={'profile-pic'}
                            />
                            <div>
                                <span className='link-text'>Bienvenido, {text}.</span>
                                <br />
                                <span className='link-text'>Grupo: {text}.</span>
                            </div>
                        </a>
                    </li>
                    <br></br>
                    {data.map(e => {
                        return (
                            <li className='nav-item section-items'>
                                <p id={e.Llave} className='nav-link' onClick={() => {
                                    OpenLink(e.Llave);
                                }}>
                                    <span className='link-text'>{e.Nombre}</span>
                                </p>
                            </li>
                        )
                    })}

                    <li className='nav-item section-items'>
                        <a href='/#' className='nav-link' onClick={() => { doLogout() }}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span className='link-text'>Cerrar sesión</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}