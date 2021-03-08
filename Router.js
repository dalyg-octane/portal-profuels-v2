const { response } = require("express");
var Request = require("request");
//var url = 'http://localhost:8000/api'
var url = 'https://portal.grupoeco.com.mx/sirexa/api'

class Router {

    constructor(App) {

        this.login(App);
        this.logout(App);
        this.isLoggedIn(App);
        this.getSalesInfo(App);
        this.getSaldos(App);
        this.downloadFile(App);
        this.downloafAcctFile(App);
        this.getTransactions(App);
        this.GetAntiguedad(App);
        this.GetEstaciones(App);
        this.GetInformes(App);
        this.GetPrecios(App);
        this.GetLinksByUserLlave(App);
        this.ValidaLink(App);
        this.DownloadInvoiceFile(App);
        this.GetInventariosByUserKey(App);
        this.GetMonthsAcct(App);
        this.GetRazonesSociales(App);
        this.GetFechaCorte(App);
        this.GetCtrlVolFile(App);

    }

    GetCtrlVolFile(App) {

        App.post('/GetCtrlVolFile', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetCtrlVolFile?opc=${req.body.opc}&est=${req.body.est}&fechacorte=${req.body.fcorte}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        console.log(body);
                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });

    }


    GetFechaCorte(App) {

        App.post('/GetFechaCorte', (req, res) => {

            try {

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetFechaCorte?opc=${req.body.opc}&est=${req.body.est}`,
                    body: JSON.stringify({}),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });

    }



    GetRazonesSociales(App) {

        App.post('/GetRazonesSociales', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetRazonesSociales`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    GetMonthsAcct(App) {

        App.post('/GetMonthsAcct', (req, res) => {

            try {

                var date = new Date();
                var fechas = [];
                var ma = {};

                for (var i = 1; i <= 3; i++) {

                    var newDate = new Date(date.setMonth(date.getMonth() - 1));
                    ma = { a: newDate.getFullYear(), m: (newDate.getMonth() + 1) }

                    fechas.push(ma);

                }

                res.json({
                    success: true,
                    fecha: fechas,
                });


            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    GetInventariosByUserKey(App) {

        App.post('/GetInventariosByUserKey', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetInventariosByUserKey?opc=${req.body.opc}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    DownloadInvoiceFile(App) {


        App.post('/DownloadInvoiceFile', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/DownloadFile?Opc=${req.body.Opc}&IdFact=${req.body.IdFact}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);
                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {
                        res.json({
                            msg: error,
                            success: false
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    ValidaLink(App) {

        App.post('/ValidaLink', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/ValidaLink?Llave=${req.body.Llave}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    GetLinksByUserLlave(App) {

        App.post('/GetLinks', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetLinksByUsrLlave`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    GetPrecios(App) {

        App.post('/GetPrecios/:t', (req, res) => {

            try {

                const l = req.session.User.Llave; // "Llave": "B1085BB4-694F-4E12-B217-499DB26D8C34" (para pruebas),
                const t = req.params.t; // "Tipo": req.params.t (para pruebas)

                const u = {
                    "Llave": l,
                    "Tipo": t
                }

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetPrecios`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    GetInformes(App) {

        App.post('/GetInformes', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetInformeSaldos/?FechaCorte=${req.body.Mes}&IdSitio=${req.body.Est}&Currency=${'MXN'}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }



    GetEstaciones(App) {

        App.post('/GetEstaciones', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetEstaciones/?Opc=${req.body.opc}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }


    GetAntiguedad(App) {

        App.post('/GetAntiguedad', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetAntiguedad/`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }


    getTransactions(App) {

        App.post('/getTransactions', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetTransactions/?fechaInicial=${req.body.fechaInicial}&fechaFinal=${req.body.fechaFinal}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    if (body) {

                        const apiRes = JSON.parse(body);

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    downloafAcctFile(App) {

        App.post('/downloadAcctSmt', (req, res) => {

            try {

                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/DownloadAcctFile/?fechaCorte=${req.body.Fecha}&IdCia=${req.body.IdCia}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }
                    const apiRes = body;

                    if (apiRes) {

                        res.json({
                            success: true,
                            data: apiRes
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    downloadFile(App) {

        App.post('/downloadFile', (req, res) => {

            try {

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/DownloadFile?IdFact=${req.body.IdFact}`,
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }


                    const userResponse = JSON.parse(body.body);

                    if (userResponse) {

                        res.json({
                            success: true,
                            File: userResponse.File
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    getSaldos(App) {

        App.post('/GetSaldos', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetSaldos/?Opc=2&rfc=${req.body.rfc}`,
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }
                    const salesResponse = JSON.parse(body);

                    if (salesResponse) {

                        res.json({
                            success: true,
                            data: salesResponse
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }


    getSalesInfo(App) {

        App.post('/getSalesInfo', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/GetSalesInfo/`,
                    body: JSON.stringify(u),
                }, (error, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    const salesResponse = JSON.parse(body.body);

                    if (salesResponse) {

                        res.json({
                            success: true,
                            data: salesResponse
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });
    }

    login(App) {

        App.post('/login', (req, res) => {

            try {

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": `${url}/vAcceso`,
                    body: JSON.stringify({
                        Usr: req.body.Usr,
                        Pwd: req.body.Pwd,
                        IdLink: '8045A0AA-AD43-42AA-811F-AC0C42BA00EE',
                    }),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }

                    const userResponse = JSON.parse(body);

                    if (userResponse && userResponse.Valid) {

                        req.session.User = userResponse;

                        res.json({
                            success: true,
                            userName: userResponse.Usuario
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                res.json({
                    success: false,
                    msg: e
                });

            }
        });

    }

    logout(App) {

        App.post('/logout', (req, res) => {

            if (req.session.User) {

                req.session.destroy();

                res.json({
                    success: true,
                });

                return true;

            } else {

                res.json({
                    success: false,
                });

                return false;

            }

        })

    }

    isLoggedIn(App) {

        App.post('/isLoggedIn', (req, res) => {
            if (req.session.User) {

                res.json({
                    success: true,
                    userName: req.session.User.Usuario
                })

            } else {

                res.json({
                    success: false,
                })

            }
        });
    }

}

module.exports = Router;