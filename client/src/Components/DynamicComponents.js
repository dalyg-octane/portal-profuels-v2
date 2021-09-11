import React, { useEffect, useState } from 'react'
import UserImg2 from '../Images/userImg2.png'
import CmpnyLogo from '../Images/cmpnyLogo.png'
import LogoFull from '../Images/Logo Profuels flama 1.jpg'
import GasArco from '../Images/ARCO.png'
import GasPemex from '../Images/pemex.png'
import GasUnbranded from '../Images/unbranded.png'
import ProfuelsFlamesImg from '../Images/Flamas.png'
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import { IconButton } from '@material-ui/core/';
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
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        generateMonths();
    }, []);

    const generateMonths = async () => {

        const { data } = await axios.post(`/GetMonthsAcct`, {});
        setMeses(data.fecha);

    };

    const getAcctSmnt = async (fechaCorte, IdCIa) => {


        try {
            setLoading(true);
            const { data } = await axios.post('/downloadAcctSmt', { Fecha: fechaCorte, IdCia: IdCIa });

            console.log(JSON.parse(data));
            console.log(JSON.parse(JSON.parse(JSON.parse(data.data))))
            
            var jsonRes = JSON.parse(JSON.parse(JSON.parse(data.data)));
            const file = new Blob(
                [_base64ToArrayBuffer(jsonRes[0].File)],
                { type: 'application/pdf' });
            let url = window.URL.createObjectURL(file);
            let a = document.createElement('a');
            setLoading(false);
            a.href = url;
            a.download = `${jsonRes[0].Id}`;
            a.click();
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
                            <label>{moment(m.m, 'MM').format('MMMM')} <label style={{ fontWeight: 'bold' }}>{new Date(m.a, m.m - 1 + 1, 0).toISOString().substring(0, 10)}</label></label>
                        </div>
                        <div className="col-md-8" style={{ textAlign: 'right' }}>


                            <IconButton aria-label="expand row" size="small" disabled={isLoading} onClick={(e) => {
                                e.preventDefault();
                                getAcctSmnt((new Date(m.a, m.m - 1 + 1, 0).toISOString().substring(0, 10)), 'P8301');
                            }}>
                                <PictureAsPdfOutlinedIcon color={(isLoading) ? 'disabled' : 'secondary'} fontSize={'large'}></PictureAsPdfOutlinedIcon>
                            </IconButton>

                        </div>
                    </div>
                </React.Fragment>
            )
        })
    )
}