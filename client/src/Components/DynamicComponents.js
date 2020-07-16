import React from 'react'
import UserImg from '../Images/userImg.jpg'
import CmpnyLogo from '../Images/cmpnyLogo.png'
import LogoFull from '../Images/Logo Profuels flama 1.jpg'
import ProfuelsFlamesImg from '../Images/Flamas.png'

export class UserLogo extends React.Component {

    render() {
        return (
            <img
                className={this.props.className}
                src={UserImg}
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

