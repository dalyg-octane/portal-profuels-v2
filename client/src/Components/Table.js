import React from 'react'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton } from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import axios from 'axios'

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

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const DynamicTable = (props) => {

    var columns = [];
    var rows = [];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { data } = props;

    const classes = useStyles();

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

    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    function downloadFile(IdFact) {
        try {
            axios.get(`https://portal.grupoeco.com.mx/sirexa/api/DownloadFile?IdFact=${IdFact}`,
                {
                    method: 'GET',
                }).then((response) => {
                    const file = new Blob(
                        [_base64ToArrayBuffer(response.data)],
                        { type: 'application/xml' });
                    let url = window.URL.createObjectURL(file);
                    //window.open(url);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `${IdFact}.xml`;
                    a.click();
                });

        } catch (e) {
            alert(e);
        }
    }
   
    function RowDetail(props) {

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
                    <TableCell>
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
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" id={dataRow.Número_de_factura} onClick={(e) => {
                            downloadFile(dataRow.Número_de_factura);
                        }}>
                            <AttachFileIcon ></AttachFileIcon>
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
                                style={{ minWidth: 170 }}
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
        </Paper>
    );
}
export const NormalTable = (props) => {

    var rows = [];
    var columns = [];
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function downloadAcctFile(IdAcctSmnt) {
        try {
            axios.get(`https://portal.grupoeco.com.mx/sirexa/api/DownloadAcctFile?IdAcctSmnt=${IdAcctSmnt}`,
                {
                    method: 'GET',
                }).then((response) => {
                    const file = new Blob(
                        [_base64ToArrayBuffer(response.data[0].File)],
                        { type: 'application/pdf' });
                    let url = window.URL.createObjectURL(file);
                    //window.open(url);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `${response.data[0].Id}`;
                    a.click();
                });

        } catch (e) {
            alert(e);
        }
    }

    const { data } = props;

    if (data.length > 0) {

        columns = Object.keys(data[0]).map(function (key) {
            return {
                id: key,
                label: key,
                minWidth: 170
            }
        });

        rows = data;
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
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
                                style={{ minWidth: 170 }}
                            >
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <IconButton aria-label="expand row" size="small" id={row.Id} onClick={(e) => {
                                            downloadAcctFile(row.Id);
                                        }}>
                                            <PictureAsPdfIcon fontSize="large" style={{color:'red',fontSize: 31}}></PictureAsPdfIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
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
        </Paper>
    )

}


