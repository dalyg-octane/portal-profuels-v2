import React, { useEffect, useState } from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import ScrollTop from '../../Components/CommonFunctions/ScrollTop'
import UsrModel from '../../Models/UsrCredentials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import JsonToSelect from '../../Components/JsonToSelect'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { IconButton } from '@material-ui/core/';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios'

export const Reportes = () => {

    const [data, setData] = useState([]);
    const [fcorte, setFcorte] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        ScrollTop();
        estacionesList();
    }, []);

    const estacionesList = async () => {
        try {
            const { data } = await axios.post('/GetEstaciones', { opc: 5 });
            setData(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const GetFechaCorte = async () => {

        var selEst = document.getElementById('selEstaciones').value
        const { data } = await axios.post(`/GetFechaCorte`, { opc: 0, est: selEst });
        if (data && data.success) {
            setFcorte(data.data);
        }
    }
    const GetCtrlFile = async (fecha, opc) => {

        var selEst = document.getElementById('selEstaciones').value
        const { data } = await axios.post(`/GetCtrlVolFile`, { opc: 1, est: selEst, fcorte: fecha });

        if (data && data.success) {

            //Archivo del Mes
            const file = new Blob([_base64ToArrayBuffer(data.data[0].contenidoArchivoMes)], { type: data.data[0].contentType });
            let url = window.URL.createObjectURL(file);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${data.data[0].nombreArchivoMes}`;
            a.click();

            //Archivo del dia
            const fileDia = new Blob([_base64ToArrayBuffer(data.data[0].contenidoArchivoDia)], { type: data.data[0].contentType });
            let urlDia = window.URL.createObjectURL(fileDia);
            let aDia = document.createElement('a');
            aDia.href = urlDia;
            aDia.download = `${data.data[0].nombreArchivoDia}`;
            aDia.click();

        }
    }

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
                            <label className="titulo-seccion-form boldText">Descarga de reportes de control volumétrico</label>
                        </div>
                    </div>
                    <br />

                    <div className='row'>
                        <div className='col-md-3'>
                            <JsonToSelect data={data} label='Estaciones' func={GetFechaCorte}></JsonToSelect>
                        </div>
                    </div>
                    <br />
                    {
                        fcorte.map(m => {
                            return (
                                <div className="row" style={{ backgroundColor: 'rgb(248,255,255)', padding: '1rem', height: '6rem', margin: '1% 15% 1% 15%', border: 'solid 1px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                                    <div className="col-md-4">
                                        <label style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{m.mes}</label>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Fecha corte de mensual: {m.fMes}</p>
                                        <p>Fecha corte de diario: {m.fDia}</p>
                                    </div>
                                    <div className="col-md-4" style={{ textAlign: 'right' }}>
                                        <Tooltip title={<span style={{ fontSize: '1.5em' }}>Descarga de reporte mensual y diario</span>}>

                                            <IconButton aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                                                e.preventDefault(m.date);
                                                GetCtrlFile(m.date);
                                            }}>
                                                <DescriptionOutlinedIcon style={{ color: 'rgb(17,82,147)' }} fontSize={'large'}></DescriptionOutlinedIcon>
                                            </IconButton>
                                        </Tooltip>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <a id='hoverUp' href='/#'><FontAwesomeIcon icon={faChevronUp} /></a>
            </main>
        </>
    )
}
function _base64ToArrayBuffer(base64) {

    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
//Descarga de reporte mensual y diario tooltip
//Descarga de reporte 