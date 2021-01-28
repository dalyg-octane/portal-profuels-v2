import React, { useEffect, useState } from 'react'
import UserImg2 from '../Images/userImg2.png'
import CmpnyLogo from '../Images/cmpnyLogo.png'
import LogoFull from '../Images/Logo Profuels flama 1.jpg'
import GasArco from '../Images/ARCO.png'
import GasPemex from '../Images/pemex.png'
import GasUnbranded from '../Images/unbranded.png'
import ProfuelsFlamesImg from '../Images/Flamas.png'
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import moment from "moment";
import axios from 'axios'
export class Arco extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={GasArco}
                alt='logo'
            />
        )
    }
}

export class Pemex extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={GasPemex}
                alt='logo'
            />
        )
    }
}

export class Unbranded extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={GasUnbranded}
                alt='logo'
            />
        )
    }
}
export class UserLogo extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={UserImg2}
                alt='logo'
            />
        )
    }
}
export class ProfuelsFlames extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={ProfuelsFlamesImg}
                alt='logo'
            />
        )
    }
}
export class CmpanyLogo extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={CmpnyLogo}
                alt='logo'
            />
        )
    }
}
export class LogoProfuelsFull extends React.Component {

    render() {
        return (
            <img
                id={this.props.id}
                src={LogoFull}
                className='App-logoText'
                alt='logo'>
            </img>
        )
    }
}
export class Button extends React.Component {

    render() {
        return (
            <button
                id={this.props.id}
                className={this.props.className}
                disabled={this.props.disabled}
                onClick={() => this.props.onClick()}
            >
                {this.props.text}
            </button>
        )
    }
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

export const EdoCta = () => {

    const [meses, setMeses] = useState([]);
    let currentYear = new Date().getFullYear();

    useEffect(() => {
        generateMonths();
    }, []);

    const generateMonths = async () => {

        const { data } = await axios.post(`/GetMonthsAcct`, {});
        setMeses(data.fecha);

    };

    const getAcctSmnt = async (fechaCorte, IdCIa) => {

        try {

            var url = '/downloadAcctSmt'

            let res = await fetch(url, {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    Fecha: fechaCorte,
                    IdCia: IdCIa
                }),
            });


            let result = await res.json();


            if (result && result.success) {

                var jsonRes = JSON.parse(JSON.parse(JSON.parse(result.data)));

                const file = new Blob(
                    [_base64ToArrayBuffer(jsonRes[0].File)],
                    { type: 'application/pdf' });
                let url = window.URL.createObjectURL(file);
                //window.open(url);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${jsonRes[0].Id}`;
                a.click();
            }

        } catch (e) {

            console.log(e);

        }
    }

    return (
        meses.map(m => {
            return (
                <React.Fragment>
                    <div className="row" style={{ backgroundColor: 'white', padding: '1rem', height: '6rem', marginBottom: '1%' }}>
                        <div className="col-md-4">
                            <label>{moment(m.m, 'MM').format('MMMM')} <label style={{fontWeight:'bold'}}>{new Date(m.a, m.m - 1 + 1, 0).toISOString().substring(0, 10)}</label></label>
                        </div>
                        <div className="col-md-8" style={{ textAlign: 'right' }}>
                            <PictureAsPdfOutlinedIcon className='hover-icon' fontSize="large" style={{ color: 'red', fontSize: 31 }} onClick={(e) => {
                                e.preventDefault();
                                getAcctSmnt((new Date(m.a, m.m - 1 + 1, 0).toISOString().substring(0, 10)), 'P8301');
                            }} />
                        </div>
                    </div>
                </React.Fragment>
            )
        })
    )
}