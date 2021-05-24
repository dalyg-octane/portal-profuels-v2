import React, { useState } from 'react'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton } from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import MUIDataTable from "mui-datatables";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios'

export const NormalTable = ({ data, docsCol,title }) => {

    var columns = [];
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const noCols = ["Sin información"];
    const noData = [[""]];

    const handleClose = (r) => {
        if (r === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const DownloadFile = async (Opc, IdFact) => {

        try {
            setLoading(true);
            const { data } = await axios.post('/DownloadInvoiceFile', { IdFact: IdFact, Opc: Opc });
            console.log(data);

            if (data && data.success) {
                const file = new Blob(
                    [_base64ToArrayBuffer(data.data[0].Data)],
                    { type: data.data[0].contentType });
                let url = window.URL.createObjectURL(file);
                if (Opc === 1) {
                    setLoading(false);
                    window.open(url);
                } else {
                    setLoading(false);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.data[0].IdDoc}`;
                    a.click();
                }
            } else {
                setLoading(false);
                setOpen(true);

            }

        } catch (e) {
            console.log(e);
        }

    }

    if (data.length) {

        columns = Object.keys(data[0]).map((key, index) => {
            return {
                name: key,
                label: replaceAll(key, '_', ' '),
            }
        });

        if (docsCol) {

            columns.push(
                {
                    name: 'keyDoc',
                    label: 'Documentos',
                    options: {
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <>
                                <IconButton id={tableMeta.rowData[0]} aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                                    DownloadFile(0, tableMeta.rowData[0]);
                                }}>
                                    <DescriptionOutlinedIcon color={(isLoading) ? 'disabled' : 'primary'} fontSize={'large'}></DescriptionOutlinedIcon>
                                </IconButton>

                                <IconButton id={tableMeta.rowData[0]} aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                                    DownloadFile(1, tableMeta.rowData[0]);
                                }}>
                                    <PictureAsPdfOutlinedIcon color={(isLoading) ? 'disabled' : 'secondary'} fontSize={'large'}></PictureAsPdfOutlinedIcon>
                                </IconButton>
                            </>
                        )
                    }
                }
            );

        }
    };

    return (
        <>
            <MUIDataTable
                title={title}
                data={data.length ? data : noData}
                columns={columns.length ? columns : noCols}
                options={{
                    selectableRows: 'none'
                }}
            />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="error">
                    Hubo un problema al consultar la factura.
                </Alert>
            </Snackbar>
        </>
    );
}

export const DynamicTable = ({ data }) => {

    var columns = [];
    var rows = [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = (r) => {
        if (r === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const DownloadFile = async (Opc, IdFact) => {

        try {
            setLoading(true);

            const { data } = await axios.post('/DownloadInvoiceFile', { IdFact: IdFact, Opc: Opc });
            console.log(data);
            if (data && data.success) {
                const file = new Blob(
                    [_base64ToArrayBuffer(data.data[0].Data)],
                    { type: data.data[0].contentType });
                let url = window.URL.createObjectURL(file);
                if (Opc === 1) {
                    setLoading(false);
                    window.open(url);
                } else {
                    setLoading(false);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.data[0].IdDoc}`;
                    a.click();
                }
            } else {
                setLoading(false);
                setOpen(true);

            }
        } catch (e) {
            console.log(e);
        }

    }

    if (data.length > 0) {

        const { Detalle, ...objKeys } = data[0];

        columns = Object.keys(objKeys).map(function (key) {
            return {
                id: key,
                label: replaceAll(key, '_', ' '),
                minWidth: 170
            }
        });

        rows = data;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const RowDetail = (props) => {

        const [open, setOpen] = React.useState(false);
        const { dataCol } = props;
        const { dataRow } = props;
        const { Detalle } = dataRow;

        const detailDtcolumns = Object.keys(Detalle[0]).map(function (key) {
            return {
                key: key,
                id: key,
                label: replaceAll(key, '_', ' '),
                minWidth: 170
            }
        });

        return (
            <React.Fragment>
                <TableRow key={dataRow.Número_de_factura} hover role='checkbox' tabIndex={-1} >
                    <TableCell key={'icon' + dataRow.Número_de_factura}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    {dataCol.map((column) => {
                        const value = dataRow[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                        );
                    })}
                    <TableCell key={'iconFile' + dataRow.Número_de_factura}>

                        <IconButton id={dataRow.Número_de_factura} aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                            DownloadFile(0, dataRow.Número_de_factura);
                        }}>
                            <DescriptionOutlinedIcon color={(isLoading) ? 'disabled' : 'primary'} fontSize={'large'}></DescriptionOutlinedIcon>
                        </IconButton>

                        <IconButton id={dataRow.Número_de_factura} aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                            DownloadFile(1, dataRow.Número_de_factura);
                        }}>
                            <PictureAsPdfOutlinedIcon color={(isLoading) ? 'disabled' : 'secondary'} fontSize={'large'}></PictureAsPdfOutlinedIcon>
                        </IconButton>

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={0}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Detalle
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            {detailDtcolumns.map((column) => {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Detalle.map((dt) => {
                                            return (
                                                <TableRow key={dt.id}>
                                                    {detailDtcolumns.map((col) => {
                                                        const value = dt[col.id];
                                                        return (
                                                            <TableCell key={dt.id} align={dt.align}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={'doc'} style={{ minWidth: 170 }}
                            >
                                Documentos
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowDetail dataCol={columns} dataRow={row} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="error">
                    Hubo un problema al consultar la factura.
                </Alert>
            </Snackbar>
        </Paper>
    );
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
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

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    table: {
        minWidth: 650,
    },

});