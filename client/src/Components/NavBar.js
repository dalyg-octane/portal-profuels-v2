import React, { useEffect, useState } from 'react'
import { UserLogo } from '../Components/DynamicComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBell, faFire, faHome } from '@fortawesome/free-solid-svg-icons'
import UsrModel from '../Models/UsrCredentials'
import { Badge, Typography, Breadcrumbs } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail'
import { Link } from 'react-router-dom';

const doLogout = async () => {

    try {

        var url = '/logout'

        let res = await fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

        let result = await res.json();

        if (result && result.success) {

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
                        <Link color="inherit" to='#'>
                            Material-UI
                        </Link>
                        <Link color="inherit" to='#'>
                            Core
                        </Link>
                        <Typography color="textPrimary">Breadcrumb</Typography>
                    </Breadcrumbs>
                </li>

                <li className='navHor-item'>
                    <Badge badgeContent={10} color='secondary' className={'horIcon'}>
                        <MailIcon />
                    </Badge>
                    <FontAwesomeIcon icon={faBell} size={'lg'} className={'horIcon'} />
                    <Link to='/home' className={'horIcon'}><FontAwesomeIcon icon={faHome} size={'lg'} /></Link>
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

            var url = '/GetLinks'

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

                setData(result.data);
            }

        } catch (e) {

            console.log(e);

        }
    }

    const OpenLink = async (Llave) => {

        try {

            var url = '/ValidaLink'

            let res = await fetch(url, {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    Llave: Llave,
                }),
            });

            let result = await res.json();

            if (result && result.success) {
                window.open(`${result.data[0].Link}`);

                // let a = document.createElement('a');
                // a.href = `${result.data[0].Link}`;
                // a.click();
            }

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