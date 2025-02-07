import React from 'react'

const MultipleGirls = ({ service, onClose }) => {
    const girls = service.number_of_girls;
    return (
        <div className='multiple-girls'>
            <p>Add meg melyik {girls} lány tartozik a szolgáltatáshoz!</p>
            <div className='multiple-girls-items'>
                {
                    Array.from({ length: girls }, (_, i) => (
                        <div key={i} className='multiple-girls-item'>
                            <label htmlFor={`${i}girl`}>{i + 1}. lány neve:</label>
                            <input type="text" name={`${i}girl`} id={`${i}girl`} />
                        </div>
                    ))
                }
            </div>
            <div className='multiple-girls-btn-container'>
                <button className='btn' onClick={onClose}>Mégse</button>
                <button className='btn'>Mentés</button>
            </div>
        </div>

    )
}

export default MultipleGirls
