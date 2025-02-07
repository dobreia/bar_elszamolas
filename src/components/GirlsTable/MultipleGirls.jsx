import React, { useEffect, useState } from 'react'

const MultipleGirls = ({ girl, selectedGirls, service, onClose, onSave }) => {
    const numberOfGirls = service.number_of_girls;
    const [errorMessages, setErrorMessages] = useState(Array(numberOfGirls - 1).fill(""));
    const [inputValues, setInputValues] = useState(Array(numberOfGirls - 1).fill(""));
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        setInputValues(Array(numberOfGirls - 1).fill(""));
        setErrorMessages(Array(numberOfGirls - 1).fill(""));
        setHasErrors(false);
    }, [numberOfGirls]);


    const handleInputChange = (index, event) => {
        const { value } = event.target;

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
        const selectedGirlsList = [girl.name, ...inputValues];
        onSave(selectedGirlsList);
        onClose();
    };

    return (
        <div className='multiple-girls'>
            <p className='header'>Add meg melyik {numberOfGirls} lány tartozik a szolgáltatáshoz!</p>
            <div className='multiple-girls-items'>
                <div className='multiple-girls-item'>
                    <p className='first-girl'>1. lány neve:<span>{girl.name}</span></p>
                </div>
                {Array.from({ length: numberOfGirls - 1 }, (_, i) => (
                    <div key={i} className='multiple-girls-item'>
                        <label htmlFor={`${i + 2}girl`}>{i + 2}. lány neve:</label>
                        <select
                            id={`${i + 2}girl`}
                            value={inputValues[i]}
                            onChange={(e) => handleInputChange(i, e)}
                        >
                            <option value=""></option>
                            {selectedGirls.map((selectedGirl, index) => (
                                <option key={index} value={selectedGirl.name}>{selectedGirl.name}</option>
                            ))}
                        </select>
                        {errorMessages[i] && <p className='error-message'>{errorMessages[i]}</p>}
                    </div>
                ))}

            </div >
            <div className='multiple-girls-btn-container'>
                <button className='btn' onClick={onClose}>Mégse</button>
                <button className='btn' onClick={handleSave}>Mentés</button>
            </div>
        </div >

    )
}

export default MultipleGirls
