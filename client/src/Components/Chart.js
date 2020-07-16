import React, { useState } from 'react'
import {
    XYPlot,
    makeWidthFlexible,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    Crosshair,
    VerticalBarSeries
} from 'react-vis';


const initialState = '';
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export const Chart = (props) => {

    const [points, setPoints] = useState(initialState);

    const resetForm = () => {
        setPoints(initialState);
    }

    const jsonRes = props.data;
    let max = 0;

    if (props.success) {

        const chartData = jsonRes.map(itm => {
            return {
                x: itm.Estacion,
                y: itm.SumLitros
            }

        })

        if (chartData.length > 0) {
            max = chartData.reduce((max, p) => p.y > max ? p.y : max, chartData[0].y);
        }

        return (
            <FlexibleXYPlot
                margin={{ left: 80, right: 70, bottom: 100 }}
                height={450}
                xType={'ordinal'}
                yDomain={[0, max]}
                onMouseLeave={
                    resetForm
                }
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <VerticalBarSeries
                    opacity={0.6}
                    color={'#00a5ee'}
                    data={chartData}
                    onNearestX={datapoint => {
                        setPoints(datapoint);
                    }}
                />
                <Crosshair
                    values={[points]}
                    className={'test-class-name'}
                    titleFormat={d => ({ title: 'Ventas', value: '' })}
                    itemsFormat={d => [{ title: 'Litros', value: /*formatter.format(d[0].y) VENTAS EN MONTOS*/ d[0].y}, { title: 'Estación', value: d[0].x }]}
                />
                <XAxis color="#00a5ee"
                    tickLabelAngle={-60}
                />
                <YAxis
                    tickFormat={v => `${v} lts`}
                />
            </FlexibleXYPlot>
        );

    } else {

        return (
            <div>
                <h3>Sin información</h3>
            </div>
        );
    }
}