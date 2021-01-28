import React, { useEffect, useState } from 'react'
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { NormalTable } from '../../Components/Table';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Antiguedaddesaldos = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        consultaAntiguedaad();
    }, [])

    const consultaAntiguedaad = async () => {

        try {

            var url = '/GetAntiguedad'

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

    return (
        <React.Fragment>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ height: '100%', backgroundColor: 'white', margin: '0 3% 1% 3%', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-11'>
                            <label className="titulo-seccion-form boldText">Antigüedad de saldos</label>
                        </div>
                        <div className='col-md-1' style={{ textAlign: 'right' }}>
                            <AssessmentIcon color='primary' fontSize='large'>
                            </AssessmentIcon>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NormalTable data={data} opc={false}></NormalTable>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Antiguedaddesaldos
