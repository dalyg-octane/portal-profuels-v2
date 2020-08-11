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
                <div style={{ margin: '0 8% 1% 8%' }}>
                    <div className='row'>
                        <label>Estado de cuenta</label>
                    </div>
                    <EdoCta />
                </div>
            </main>
        </React.Fragment>
    )
}

export default Estadocuentaprofuels
