import React, { useState } from 'react'
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import { NormalTable } from '../../Components/Table';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Auxiliardemovimiento = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);

    const consultaMov = async () => {

        const fechaInicio = document.getElementById('dateInicio').value;
        const fechaFinal = document.getElementById('dateFinal').value;

        try {

            var url = '/getTransactions'

            let res = await fetch(url, {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    fechaInicial: fechaInicio,
                    fechaFinal: fechaFinal
                }),
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
        <React.Fragment key={'rct'}>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ height: '100%', backgroundColor: 'white', margin: '0 3% 1% 3%', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-11'>
                            <label className="titulo-seccion-form boldText">Auxiliar de movimientos</label>
                        </div>
                        <div className='col-md-1' style={{ textAlign: 'right' }}>
                            <AssessmentIcon color='primary' fontSize='large'>
                            </AssessmentIcon>
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className='col-md-10'>
                            <TextField
                                id="dateInicio"
                                label="Inicio"
                                type="date"
                                defaultValue={new Date().toISOString().slice(0, 10)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="dateFinal"
                                label="Final"
                                type="date"
                                defaultValue={new Date().toISOString().slice(0, 10)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button className={'btn btn-outline-custom'} onClick={() => { consultaMov() }}>
                                Consultar
                            </button>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NormalTable data={data}></NormalTable>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Auxiliardemovimiento
