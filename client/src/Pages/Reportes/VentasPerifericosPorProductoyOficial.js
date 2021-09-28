import React, { useEffect, useState } from "react";
import UsrModel from "../../Models/UsrCredentials";
import { NavBar, HorizonNavBar } from "../../Components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { NormalTable } from "../../Components/Table";
import AssessmentIcon from "@material-ui/icons/Assessment";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import JsonToSelect from "../../Components/JsonToSelect";

import axios from "axios";

//select
import Select from "react-select";

export const VentasPerifericosPorProductoyOficial = () => {
  const [estaciones, setEstaciones] = useState([]);

  const classes = useStyles();
  const [reportedata, setReportedata] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  var todayD = new Date();
  const [fechaFin, setFechaFin] = useState(todayD.toISOString().slice(0, 10));
  todayD.setDate(todayD.getDate() - 3);
  const [fechaIni, setFechaIni] = useState(todayD.toISOString().slice(0, 10));

  const Generar = () => {
    GetDataReporte();
  };

  const VentasPerifericosProductoYOficialPDF = async () => {

    var fechaFin = document.getElementById("dateFinalRepPerif").value;
    var fechaIni = document.getElementById("dateInicioRepPerif").value;
    var selEst = document.getElementById('selEstacion').value
    if (selEst != '') {
      try {
        const { data } = await axios.post('/PerifericosProductoYOficialPDF', {
          opc: 3,
          FechaInicial: fechaIni,
          FechaFinal: fechaFin,
          ZonaId: 0,
          EstacionId: selEst,
          LineaPerifericoId: 0,
          TipoInforme: "A",
        });
        console.log(data.File)
        var jsonRes = JSON.parse(data.File);
        const file = new Blob(
          [_base64ToArrayBuffer(jsonRes.File)],
          { type: 'application/pdf' });
        let url = window.URL.createObjectURL(file);
        let a = document.createElement('a');
        a.href = url;
        a.download = `Reporte ${jsonRes.Name}`;
        a.click();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Seleccione una estación');
    }
  }
  //obtener Reporte Perifericos
  const GetDataReporte = async () => {

    var fechaFin = document.getElementById("dateFinalRepPerif").value;
    var fechaIni = document.getElementById("dateInicioRepPerif").value;
    var selEst = document.getElementById('selEstacion').value


    if (selEst != '') {
      setLoading(true);
      try {
        const { data } = await axios.post(
          //"/PerifericosProductoYOficialPDF",
          "/GetVentasPerifericosProductoOficial",
          {
            opc: 2,
            FechaInicial: fechaIni,
            FechaFinal: fechaFin,
            ZonaId: 0,
            EstacionId: selEst,
            LineaPerifericoId: 0,
            TipoInforme: "A",
          }
        );
        if (data && data.success) {
          setReportedata(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          setReportedata([]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    else {
      alert('Seleccione una estación');
    }

  };

  useEffect(() => {
    GetEstaciones();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const GetEstaciones = async (t = 1) => {
    try {
      const { data } = await axios.post("/GetEstaciones", { opc: 5 });

      if (data && data.success) {
        setEstaciones(data.data);
      } else {
        setEstaciones([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = (r) => {
    if (r === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <NavBar text={UsrModel.userName.toUpperCase()} />
      <HorizonNavBar />
      <main>
        <div
          style={{
            backgroundColor: "white",
            margin: "0 0 1% 0",
            padding: "1% 3% 1% 3%",
          }}
        >
          <div className="row">
            <div className="col-md-11">
              <label className="titulo-seccion-form boldText">
                Reporte Perifericos
              </label>
            </div>
            <div className="col-md-1" style={{ textAlign: "right" }}>
              <AssessmentIcon color="primary" fontSize="large"></AssessmentIcon>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5">
              <JsonToSelect data={estaciones} label="Estacion"></JsonToSelect>
              {/* <Select
                id="selectEstacionRepPerif"
                value={selectedOption}
                // onChange={(text) => handleChange(text)}
                onChange={(e) => handleAddrTypeChange(e)}
    
                options={zonas}
              /> */}
            </div>
            <div className="col-md-5">
              <TextField
                id="dateInicioRepPerif"
                label="Inicial"
                type="date"
                value={fechaIni}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setFechaIni(e.target.value)}
              />
              <TextField
                id="dateFinalRepPerif"
                label="Final"
                type="date"
                value={fechaFin}
                className={classes.textField}
                InputLabelProps={
                  {
                    // shrink: true,
                  }
                }
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <br></br>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={() => {
                  Generar();
                  // setLoading(true);
                }}
              >
                Generar
              </Button>
            </div>
          </div>
          <br></br>
          <div className="row"></div>
          <br></br>
          <br></br>
          <div className="row">
            <div className="col-md-12" style={{ textAlign: "center" }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <NormalTable
                  data={reportedata}
                  docsCol={false}
                  title="Reporte Ventas Perifericos  por producto y oficial"
                  pdf={1}
                  onclick={VentasPerifericosProductoYOficialPDF}

                ></NormalTable>
              )}
            </div>
          </div>
        </div>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="warning">
          La fecha inicial no puede ser mayor a la final
        </Alert>
      </Snackbar>
    </>
  );
};
function _base64ToArrayBuffer(base64) {

  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
