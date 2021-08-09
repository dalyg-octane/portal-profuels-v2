import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const GetRazonSoc = ({ onclick }) => {

    const [data, setData] = useState([]);

    const GetRazocSociales = async () => {
        const { data } = await axios.post(`/GetRazonesSociales`, {});
        setData(data.data);
    }

    useEffect(() => {
        GetRazocSociales();
    }, []);


    return (
        <>
            {data.length > 1 ?
                <>
                    <h6 className="custom-h6">Razones sociales</h6>
                    <div className='flex-container hoverEl'>
                        {data.map((e) => {
                            return (
                                <button key={e.Id} id={e.Id} className='flex-item' style={{ textAlign: 'center' }} onClick={onclick}>
                                    {e.Nombre}
                                    <br></br>
                                    {`${e.Est}`}
                                </button>
                            )
                        })}
                    </div>
                    <br></br>
                </>
                :
                <>
                    <div></div>
                </>
            }
        </>
    )
}

