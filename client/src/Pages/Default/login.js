import React from 'react'
import { Button, LogoProfuelsFull } from '../../Components/DynamicComponents'
import UsrModel from '../../Models/UsrCredentials'
import TextField from '@material-ui/core/TextField';

export class login extends React.Component {

    state = {
        Usr: '',
        Pwd: '',
        Incorrect: false,
        Msg:'',
        buttonDisabled: false
    }

    resetForm() {

        this.setState({
            Usr: '',
            Pwd: '',
            Incorrect: true,
            Msg:'Usuario y/o contraseña incorrectos.',
            buttonDisabled: false
        })

    }

    async doLogin() {

        if (!this.state.Usr) {
            return;
        }
        if (!this.state.Pwd) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try {

            var url = '/login'

            let res = await fetch(url, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    Usr: this.state.Usr,
                    Pwd: this.state.Pwd
                }),
            });

            let result = await res.json();

            if (result && result.success) {

                UsrModel.userName = result.userName;
                UsrModel.isLoggedIn = true;

            } else if (result && !result.success) {

                this.resetForm();
            }

        } catch (e) {

            console.log(e)
            this.resetForm();

        }

    }

    setInputValue(property, val) {

        this.setState({
            Incorrect: false,
            Msg:''
        });

        val = val.trim();
        if (val.length > 50) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    render() {

        document.body.style.backgroundColor = '#0F212E';

        return (

            <div className='mainContent'>
                <div className='row loginParentDiv'>
                    <div className='col-md-3 loginChildDiv'>
                        <div className='row'>
                            <div className='col-md-12' style={{ textAlign: 'center', paddingBottom: 20 }}>
                                <div id='divLogo'>
                                    <LogoProfuelsFull
                                        id={'imgLogo'}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-md-12'>
                                <TextField
                                    id={'inpUsr'}
                                    error={this.state.Incorrect}
                                    helperText={this.state.Msg}
                                    fullWidth={true}
                                    autoComplete={'off'}
                                    value={this.state.Usr ? this.state.Usr : ''}
                                    label='Usuario'
                                    onChange={(val) => this.setInputValue('Usr', val.target.value)}
                                    onKeyDown={(e) => {

                                        if (e.keyCode === 13) {
                                            this.doLogin();
                                        }

                                    }}
                                />
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '1.5rem' }}>
                            <div className='col-md-12'>
                                <TextField
                                    id={'inpPwd'}
                                    error={this.state.Incorrect}
                                    helperText={this.state.Msg}
                                    fullWidth={true}
                                    type={'password'}
                                    label='Contraseña'
                                    value={this.state.Pwd ? this.state.Pwd : ''}
                                    onChange={(val) => this.setInputValue('Pwd', val.target.value)}
                                    onKeyDown={(e) => {

                                        if (e.keyCode === 13) {
                                            this.doLogin();
                                        }

                                    }}
                                />

                                <br />
                                <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                                    <a href='/#'>¿Olvidó su contraseña?</a>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='row' style={{ paddingTop: '12%' }} >
                            <div className='col-md-12' style={{ textAlign: 'center' }}>
                                <Button
                                    id={'btnLogIn'}
                                    className={'btn btn-outline-custom'}
                                    text={'Iniciar sesión'}
                                    disabled={this.state.buttonDisabled}
                                    onClick={() => { this.doLogin(); }}
                                />
                            </div>
                        </div>
                        <br />
                        <div className='row' style={{ paddingTop: '22%' }}>
                            <div className='col-md-12' style={{ textAlign: 'center' }}>
                                <p>¿No tiene cuenta?</p>
                                <p><a href='/#' style={{ fontWeight: 'bold' }}>Registrarse</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}