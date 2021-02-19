import React, { useEffect, useState } from 'react'
import UsrModel from '../../Models/UsrCredentials'
import { NavBar, HorizonNavBar } from '../../Components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import { NormalTable } from '../../Components/Table';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'

const Auxiliardemovimiento = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);

    var todayD = new Date();
    const [fechaFin, setFechaFin] = useState(todayD.toISOString().slice(0, 10));
    todayD.setDate(todayD.getDate() - 5);
    const [fechaIni, setFechaIni] = useState(todayD.toISOString().slice(0, 10));


    useEffect(() => {

        consultaMov();

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = (r) => {
        if (r === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const consultaMov = async () => {

        if (fechaFin >= fechaIni) {
            try {
                const { data } = await axios.post('/getTransactions', { fechaInicial: fechaIni, fechaFinal: fechaFin });
                setData(data.data);
                setLoading(false);

            } catch (e) {
                console.log(e);
            }
        } else {
            setOpen(true);
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
                <div style={{ backgroundColor: 'white', margin: '0 0 1% 0', padding: '1% 3% 1% 3%' }}>
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
                                defaultValue={fechaIni}
                                onChange={(e) => {
                                    setFechaIni(e.target.value)
                                    consultaMov();
                                    // consultaMov();
                                }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="dateFinal"
                                label="Final"
                                type="date"
                                defaultValue={fechaFin}
                                onChange={(e) => {
                                    setFechaFin(e.target.value)
                                    consultaMov();
                                    // consultaMov();
                                }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12' style={{ textAlign: 'center' }}>
                            {(isLoading) ?
                                <CircularProgress />
                                :
                                <NormalTable data={data} docsCol={true}></NormalTable>
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="warning">
                    La fecha inicial no puede ser mayor a la final
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

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

export default Auxiliardemovimiento
