import React from 'react'
import { NavBar, HorizonNavBar } from '../../Components/NavBar.js';
import { EdoCta } from '../../Components/DynamicComponents.js'
import UsrModel from '../../Models/UsrCredentials'

const Estadocuentaprofuels = () => {
    return (
        <React.Fragment>
            <NavBar
                text={UsrModel.userName.toUpperCase()}
            />
            <HorizonNavBar
            />
            <main>
                <div style={{ margin: '0 25% 1% 25%' }}>
                    <EdoCta />
                </div>
            </main>
        </React.Fragment>
    )
}

export default Estadocuentaprofuels
