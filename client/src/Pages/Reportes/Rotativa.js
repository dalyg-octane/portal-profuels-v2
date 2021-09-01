import React from 'react'
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const VentaPerifericosProdutoOficial = () => {



    return (
        <>

            <main>
                <div style={{ textAlign: 'center' }}>
                    <h2>
                        INFORME PERIFERICOS
                    </h2>
                    <h4>
                        Nombre Estacion
                    </h4>
                    <br></br>
                    <h5>
                        Periodo: xx/xx/xxxx - xx/xx/xxxx
                    </h5>
                </div>
                <div className='flex-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Headers
                                </th>
                                <th>
                                    Headers
                                </th>
                                <th>
                                    Headers
                                </th>
                                <th>
                                    Headers
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Usuario
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    bodi
                                </td>
                                <td>
                                    bodi
                                </td>
                                <td>
                                    bodi
                                </td>
                                <td>
                                    bodi
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                <table>
                    <tbody>
                        <tr>
                            {
                                ofVentas.map((of) => 
                                    
                    <td>
            of.Oficial
            </td>
            <td>
of.Ventas
            </td>

                                )

                            }
                        </tr>
                    </tbody>
                </table>

            </main>
        </>
    )
}

