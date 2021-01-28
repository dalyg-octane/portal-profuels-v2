import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    RadialChart,
} from 'react-vis';

export const TankChart = () => {

    const [dataSet, setData] = useState([]);

    const GetTanques = async () => {
        const { data } = await axios.post(`/GetAcctStmtMonths`, { opc: 1 });
        setData(data.data);
        console.log(data.data)
    }

    useEffect(() => {
        GetTanques();
    }, []);

    return (
        <>
            <div className='gas-container'>
                {dataSet.map(elm => {
                    return (
                        <RadialChart
                            data={[{ angle: elm.Porcentaje, color: elm.Color }, { angle: elm.Total, color: '#F8F8F8' }]}
                            width={260}
                            height={260}
                            innerRadius={65}
                            radius={110}
                            colorType="literal"
                        // showLabels
                        />
                    )
                })}


                {/* <div className='container-img'>
                </div> */}
            </div>

        </>
    )
}