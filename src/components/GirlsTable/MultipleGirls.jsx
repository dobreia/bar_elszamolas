import React, { useEffect, useState } from 'react'

const MultipleGirls = ({ girl, selectedGirls, service, onClose, onSave }) => {
    const numberOfGirls = service.number_of_girls;
    const [errorMessages, setErrorMessages] = useState(Array(numberOfGirls).fill(""));
    const [inputValues, setInputValues] = useState(Array(numberOfGirls).fill(""));
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        setInputValues(Array(numberOfGirls).fill(""));
        setErrorMessages(Array(numberOfGirls).fill(""));
        setHasErrors(false);
    }, [numberOfGirls]);


    const handleInputChange = (index, value) => {
        setInputValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;

            setErrorMessages(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = value != "" ? "" : "A mező nem lehet üres";
                return newErrors;
            })

            setHasErrors(newValues.some(val => val === ""));

            return newValues
        });
    };

    const handleSave = () => {
        const newErrorMessages = inputValues.map(value => value.trim() === "" ? "A mező nem lehet üres" : "");
        setErrorMessages(newErrorMessages);

        if (newErrorMessages.some(error => error !== "")) {
            setHasErrors(true);
            return;
        }

        onSave(inputValues);
        onClose();
    };

    return (
        <div className='multiple-girls'>
            <p>Add meg melyik {numberOfGirls} lány tartozik a szolgáltatáshoz!</p>
            <div className='multiple-girls-items'>
                {
                    Array.from({ length: numberOfGirls }, (_, i) => (
                        <div key={i} className='multiple-girls-item'>
                            <label htmlFor={`${i}girl`}>{i + 1}. lány neve:</label>
                            <input
                                type="text"
                                name={`${i}girl`}
                                id={`${i}girl`}
                                value={inputValues[i]}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                            />
                            {errorMessages[i] && <p className='error-message'>{errorMessages[i]}</p>}
                        </div>
                    ))
                }

            </div >
            <div className='multiple-girls-btn-container'>
                <button className='btn' onClick={onClose}>Mégse</button>
                <button className='btn' onClick={handleSave}>Mentés</button>
            </div>
        </div>

    )
}

export default MultipleGirls
