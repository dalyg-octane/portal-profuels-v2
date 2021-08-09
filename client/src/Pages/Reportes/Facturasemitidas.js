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
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import axios from 'axios'

export const Facturasemitidas = () => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    var todayD = new Date();
    const [fechaFin, setFechaFin] = useState(todayD.toISOString().slice(0, 10));
    todayD.setDate(todayD.getDate() - 3);
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

        var fechaFin = document.getElementById('dateFinal').value;
        var fechaIni = document.getElementById('dateInicio').value;

        if (fechaFin >= fechaIni) {
            try {
                const { data } = await axios.post('/GetFactEmitidas', { fechaInicial: fechaIni, fechaFinal: fechaFin });

                if (data && data.success) {
                    setData(data.data);
                } else {
                    setData([]);
                }
                setLoading(false);

            } catch (e) {
                console.log(e);
            }
        } else {
            setLoading(false);
            setOpen(true);
        }

    }

    return (
        <>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ backgroundColor: 'white', margin: '0 0 1% 0', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-11'>
                            <label className="titulo-seccion-form boldText">Facturas emitidas</label>
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
                                value={fechaIni}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setFechaIni(e.target.value)}
                            />
                            <TextField
                                id="dateFinal"
                                label="Final"
                                type="date"
                                value={fechaFin}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setFechaFin(e.target.value)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                                onClick={() => {
                                    setLoading(true);
                                    consultaMov();
                                }}
                            >
                                Generar
                            </Button>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12' style={{ textAlign: 'center' }}>
                            {(isLoading) ?
                                <CircularProgress />
                                :
                                <NormalTable data={data} docsCol={false} title='Facturas emitidas'></NormalTable>
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
        </>
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
