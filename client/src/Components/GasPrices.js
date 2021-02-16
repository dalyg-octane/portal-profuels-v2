import React from 'react'
import { Arco, Pemex, Unbranded } from '../Components/DynamicComponents'

//Si el div padre tiene hijos, ir += si no normal

const GasPriceElement = ({ data }) => {

    var group = "";

    if (data.length !== 0) {
        group = data.reduce((acc, item) => {
            if (!acc[item['Número de estación']]) {
                acc[item['Número de estación']] = [];
            }
            acc[item['Número de estación']].push(item);
            return acc;

        }, {})
    }

    return (

        Object.entries(group).map((e, i) => {

            return (

                <>
                    <div className="flex-container">
                        <div className="flex-item shadow-item">
                            <div className='row'>
                                <div className='col-md-2' style={{ textAlign: 'center', padding: '3.5rem' }}>
                                    {e[1][0].IdMarcaGasolinera === 1 ? <Pemex className={'estacion-logo'} /> : e[1][0].IdMarcaGasolinera === 2 ? <Arco className={'estacion-logo'} /> : <Unbranded className={'estacion-logo'} />}
                                </div>
                                <div className='col-md-3' style={{ paddingTop: '3.5rem', borderRight: '1px solid rgb(220,220,220)' }}>
                                    <p>Estación: <label style={{ fontWeight: '500' }}>{e[1][0].Nombre}</label></p>
                                    <p>Zona TAR: {e[1][0]['Nombre Tar']}</p>
                                    <p>Fecha de precio: {e[1][0].FechaProgramacion}</p>
                                </div>
                                <div className='col-md-7'>
                                    <table className='table tblPrecios' style={{ borderCollapse: 'collapse', border: 'none' }}>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                {e[1].map((e, i) => {
                                                    return (
                                                        <th style={{ color: e.Color }}>{e['Nombre producto']}</th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td key='puPrices'>PU</td>
                                                {e[1].map((e, i) => {

                                                    return (
                                                        <td>{e.PU}</td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td key='puIEPS'>IEPS</td>
                                                {e[1].map((e, i) => {
                                                    return (
                                                        <td>{e.IEPS}</td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td key='puPM'>Precio molécula</td>
                                                {e[1].map((e, i) => {
                                                    return (
                                                        <td>{e['Precio molecula']}</td>
                                                    )
                                                })}
                                            </tr>
                                            <tr style={{ borderTop: '1px solid rgb(220,220,220)' }}>
                                                <td key='puIVA'>Precio con IVA</td>
                                                {e[1].map((e, i) => {
                                                    return (
                                                        <td style={{ fontWeight: '500' }}>{e['Precio con IVA']}</td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td key='puMI'>Precio molécula mas IEPS</td>
                                                {e[1].map((e, i) => {
                                                    return (
                                                        <td style={{ fontWeight: '500' }}>{e['Precio C/Imp']}</td>
                                                    )
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </>
            )
        })
    )
}

export default GasPriceElement
