var Request = require("request");

class Router {

    constructor(App) {

        this.login(App);
        this.logout(App);
        this.isLoggedIn(App);
        this.getSalesInfo(App);
        this.getSaldos(App);
        this.downloadFile(App);
        this.getAcctStmt(App);
    }

    getAcctStmt(App) {

        App.post('/getAcctStmt', (req, res) => {

            try {

                const u = req.session.User;

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": "https://portal.grupoeco.com.mx/sirexa/api/GetAcctStmts", //// Produccion
                    //"url": "http://localhost:59417/api/GetAcctStmts", //// Pruebas
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        console.log(response)

                        res.json({
                            success: false,
                            msg: error
                        });

                        console.log(error);
                        return false;

                    }


                    const apiResponse = JSON.parse(body);

                    console.log(apiResponse);

                    if (apiResponse) {

                        res.json({
                            success: true,
                            data: apiResponse
                        });

                    } else {

                        res.json({
                            success: false,
                        });

                    }

                });

            } catch (e) {

                console.log(e);


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

                console.log(req.body);

                Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": "https://portal.grupoeco.com.mx/sirexa/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Produccion
                    //"url": "http://localhost:59417/api/DownloadFile?IdFact=" + req.body.IdFact + "", //// Pruebas
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        console.log(error);
                        return false;

                    }


                    const userResponse = JSON.parse(body);

                    console.log(userResponse);

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
                    "url": "https://portal.grupoeco.com.mx/sirexa/api/GetSaldos/?Opc=2", //// Produccion
                    //"url": "http://localhost:59417/api/GetSaldos/?Opc=2",
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        console.log(error);
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
                    "url": "https://portal.grupoeco.com.mx/sirexa/api/GetSalesInfo", //// Produccion
                    //"url": "http://localhost:59417/api/GetSalesInfo",
                    body: JSON.stringify(u),
                }, (error, response, body) => {

                    if (error) {

                        res.json({
                            success: false,
                            msg: error
                        });

                        console.log(error);
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

    login(App) {

        App.post('/login', (req, res) => {

            try {

                Request.post({
                    "headers": { "content-type": "application/json" },
                     "url": "https://portal.grupoeco.com.mx/sirexa/api/VAcceso", //// Produccion
                    //"url": "http://localhost:59417/api/VAcceso", //// Pruebas
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

                        console.log(error);
                        return false;

                    }

                    const userResponse = JSON.parse(body);

                    if (userResponse && userResponse.Valid) {

                        req.session.User = userResponse;

                        console.log(req.session.User);

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