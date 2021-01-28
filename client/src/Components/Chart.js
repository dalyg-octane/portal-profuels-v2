import React, { useState, useEffect } from 'react'
import {
    XYPlot,
    makeWidthFlexible,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    Crosshair,
    LineMarkSeries,
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
                margin={{ left: 80, right: 70, bottom: 70 }}
                height={200}
                xType={'ordinal'}
                yDomain={[0, max]}

                onMouseLeave={
                    resetForm
                }
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <LineMarkSeries
                    opacity={0.6}
                    color={'forestgreen'}
                    data={chartData}
                    onNearestX={datapoint => {
                        setPoints(datapoint);
                    }}
                />
                <Crosshair
                    values={[points]}
                    className={'test-class-name'}
                    titleFormat={d => ({ title: 'Ventas', value: '' })}
                    itemsFormat={d => [{ title: 'Litros', value: d[0].y }, { title: 'Estación', value: d[0].x }]}
                />
                <XAxis color="#00a5ee"
                    tickLabelAngle={0}
                />
                <YAxis
                    tickFormat={v => `${v} lts`}
                />
            </FlexibleXYPlot>
        );

    } else {

        return (
            <div>
                <h4>Sin información</h4>
            </div>
        );
    }
}