import React, { useEffect, useState } from 'react'
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import JsonToSelect from '../../Components/JsonToSelect'
import { NormalTable } from '../../Components/Table';
import axios from 'axios'

const Informedesaldos = () => {

    const [data, setData] = useState([]);
    const [dataMes, setDataMes] = useState([]);
    const [dataTable, setDataTbl] = useState([]);

    useEffect(() => {
        estacionesList();
    }, []);

    const estacionesList = async () => {

        try {
            const { data } = await axios.post('/GetEstaciones', {});
            setData(data.data);
            setDataMes(months);

        } catch (e) {
            console.log(e);
        }

    }

    const consultaInforme = async () => {

        var selMes = document.getElementById('selMes').value
        var selEst = document.getElementById('selEstaciones').value

        if (selMes !== '' & selEst !== '') {

            try {
                const { data } = await axios.post('/GetInformes', { Est: selEst, Mes: selMes });
                setDataTbl(data.data);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ height: '100%', backgroundColor: 'white', margin: '0 3% 1% 3%', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-3'>
                            <JsonToSelect data={data} label='Estaciones' func={consultaInforme}></JsonToSelect>
                        </div>
                        <div className='col-md-3'>
                            <JsonToSelect data={dataMes} label='Mes' func={consultaInforme}></JsonToSelect>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NormalTable data={dataTable} docsCol={false}></NormalTable>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}

const months = [
    {
        Id: 1,
        Nombre: 'Enero'
    },

    {
        Id: 2,
        Nombre: 'Febrero'
    },
    {
        Id: 3,
        Nombre: 'Marzo'
    },
    {
        Id: 4,
        Nombre: 'Abril'
    },
    {
        Id: 5,
        Nombre: 'Mayo'
    },
    {
        Id: 6,
        Nombre: 'Junio'
    },
    {
        Id: 7,
        Nombre: 'Julio'
    },
    {
        Id: 8,
        Nombre: 'Agosto'
    },
    {
        Id: 9,
        Nombre: 'Septiembre'
    },
    {
        Id: 10,
        Nombre: 'Octubre'
    }
]

export default Informedesaldos
