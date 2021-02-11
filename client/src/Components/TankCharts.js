import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    RadialChart,
} from 'react-vis';

export const TankChart = () => {

    const [dataSet, setData] = useState([]);

    const GetTanques = async () => {
        const { data } = await axios.post(`/GetInventariosByUserKey`, { opc: 1 });
        setData(data.data);
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
                            data={[{ angle: elm.Porcentaje, color: elm.Color, label: `${elm.Porcentaje}%` }, { angle: elm.Total, color: '#F8F8F8'}]}
                            width={260}
                            height={240}
                            innerRadius={65}
                            radius={110}
                            colorType="literal"
                            labelsRadiusMultiplier={0.98}
                            labelsStyle={{fontSize: 12, fill: 'white'}}
                            showLabels
                        />
                    )
                })}


                {/* <div className='container-img'>
                </div> */}
            </div>

        </>
    )
}