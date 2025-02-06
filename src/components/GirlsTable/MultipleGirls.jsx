import React from 'react'

const MultipleGirls = () => {
    const girls = 3;
    return (
        <div className='multiple-girls'>
            <p>Add meg melyik "szám" lány tartozik a szolgáltatáshoz!</p>
            <div className='multiple-girls-items'>
                {
                    Array.from({ length: girls }, (_, i) => (
                        <div className='multiple-girls-item'>
                            <label key={i} htmlFor={`${i}girl`}>{i + 1}. lány neve:</label>
                            <input type="text" name={`${i}girl`} id={`${i}girl`} />
                        </div>
                    ))
                }
            </div>
            <div className='multiple-girls-btn-container'>
                <button className='btn'>Mégse</button>
                <button className='btn'>Mentés</button>
            </div>
        </div>
    )
}

export default MultipleGirls
