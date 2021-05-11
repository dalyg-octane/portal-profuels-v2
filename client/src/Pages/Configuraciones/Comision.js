import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import UsrModel from '../../Models/UsrCredentials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';
import { Radio, FormLabel, FormControlLabel, FormControl, RadioGroup, Button } from '@material-ui/core';
import JsonToSelect from '../../Components/JsonToSelect'
import SaveIcon from '@material-ui/icons/Save';
import { NormalTable } from '../../Components/Table';
import axios from 'axios'

export const Comision = () => {

    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState('0');
    const [dataTbl, setDataTbl] = useState([]);

    useEffect(() => {
        ScrollTop();
        prodList();
        GetComisiones();
    }, []);

    const prodList = async () => {
        try {
            const { data } = await axios.post('/GetProductos', {});
            setData(data.data);
        } catch (e) {
            console.log(e);
        }
    };
    const SaveComision = async () => {

        var selProd = document.getElementById('selLinea').value;
        var comAmt = document.getElementById('inpComision').value;

        const { data } = await axios.post(`/InsertComision`, { IdZona: 0, idEst: 0, IdProd: selProd, Monto: comAmt });

        if (data && data.success) {
            GetComisiones();
        }

    }

    const GetComisiones = async () => {

        try {
            const { data } = await axios.post('/GetComisiones', {});
            if (data && data.success) {
                setDataTbl(data.data);
            }
        } catch (e) {
            console.log(e);
        }

    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar />
            <main>
                <div style={{ height: '100%', backgroundColor: 'white', margin: '0 3% 1% 3%', padding: '1% 3% 1% 3%' }}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className="titulo-seccion-form boldText">Comisión de periféricos</label>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-md-12'>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Elige el nivel de afectación del monto de comisión</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">

                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="primary" />}
                                        onChange={handleChange}
                                        label="Grupo"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio color="primary" />}
                                        onChange={handleChange}
                                        label="Zona"
                                        labelPlacement="start"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio color="primary" />}
                                        onChange={handleChange}
                                        label="Estación"
                                        labelPlacement="start"
                                        disabled
                                    />

                                </RadioGroup>
                            </FormControl>

                        </div>
                    </div>
                    <div className='row'>
                        {(() => {
                            switch (selectedValue) {
                                case '1':
                                    return (
                                        <>
                                            <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Linea'></JsonToSelect>
                                            </div>
                                            {/* <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Grupo' func={handleChange}></JsonToSelect>
                                            </div> */}
                                            <div className='col-md-4'>
                                                <TextField
                                                    id="inpComision"
                                                    label="Comisión"
                                                    type="number"
                                                />
                                            </div>
                                        </>
                                    )
                                case '2':
                                    return (
                                        <>
                                            <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Linea'></JsonToSelect>
                                            </div>
                                            <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Zona'></JsonToSelect>
                                            </div>
                                            <div className='col-md-4'>
                                                <TextField
                                                    id="standard-basic"
                                                    label="Comisión"
                                                    type="number"
                                                />
                                            </div>
                                        </>
                                    )
                                case '3':
                                    return (
                                        <>
                                            <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Linea'></JsonToSelect>
                                            </div>
                                            <div className='col-md-3'>
                                                <JsonToSelect data={data} label='Estación'></JsonToSelect>
                                            </div>
                                            <div className='col-md-4'>
                                                <TextField
                                                    id="standard-basic"
                                                    label="Comisión"
                                                    type="number"
                                                />
                                            </div>
                                        </>
                                    )
                                default:
                                    return (
                                        <div></div>
                                    )
                            }
                        })()}

                    </div>
                    <br />
                    {selectedValue !== '0' ?
                        <div className='row'>
                            <div className='col-md-4'>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                    onClick={() => {
                                        SaveComision();
                                    }}
                                >
                                    Guardar
                                    </Button>
                            </div>
                        </div>
                        :
                        <>
                        </>
                    }
                    <br></br>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NormalTable data={dataTbl} opc={false}></NormalTable>
                        </div>
                    </div>
                </div>
                <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
            </main>
        </>
    )
}
