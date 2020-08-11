var Request = require("request");

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
    }

    getTransactions(App) {

        App.post('/getTransactions', (req, res) => {

            try {
                
                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    //"url": "https://portal.grupoeco.com.mx/sirexa/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Produccion
                    "url": `http://localhost:8000/api/GetTransactions/?fechaInicial=${req.body.fechaInicial}&fechaFinal=${req.body.fechaFinal}`, //// Pruebas
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        return false;

                    }
                    const apiRes = JSON.parse(body);

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

    downloafAcctFile(App) {

        App.post('/downloadAcctSmt', (req, res) => {

            try {
                
                const u = req.session.User;

                Request.get({
                    "headers": { "content-type": "application/json" },
                    //"url": "https://portal.grupoeco.com.mx/sirexa/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Produccion
                    "url": `http://localhost:8000/api/DownloadAcctFile/?fechaCorte=${req.body.Fecha}&IdCia=${req.body.IdCia}`, //// Pruebas
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
                    //"url": "https://portal.grupoeco.com.mx/sirexa/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Produccion
                    "url": "http://localhost:8000/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Pruebas
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
                    //"url": "https://portal.grupoeco.com.mx/sirexa/api/GetSaldos/?Opc=2", //// Produccion
                    "url": "http://localhost:8000/api/GetSaldos/?Opc=2",
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
                    //"url": "https://portal.grupoeco.com.mx/sirexa/api/GetSalesInfo", //// Produccion
                    "url": "http://localhost:8000/api/GetSalesInfo/",
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
                     //"url": "https://portal.grupoeco.com.mx/sirexa/api/VAcceso", //// Produccion
                     "url": "http://localhost:8000/api/VAcceso", //// Pruebas
                    body: JSON.stringify({
                        Usr: req.body.Usr,
                        Pwd: req.body.Pwd
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