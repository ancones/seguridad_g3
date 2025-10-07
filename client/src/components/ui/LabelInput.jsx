import { useState } from 'react'


const LabelInput = ({ label, htmlFor, placeholder, state,  setState, required, type = 'text' }) => {
    const [test, setTest] = useState()
    const handleChange = (e) => {
        const value = type === 'number' ? Number(e.target.value) : e.target.value;
        if (setState) {
            setState(value);
        } else {
            setTest(value);
        }
    };
    return (
        <>
            <label htmlFor={htmlFor || ''}>{label}:</label>
            <input
                type={type}
                id={htmlFor || ''}
                placeholder={placeholder || ''}
                required={required}
                value={state !== undefined ? state : test}
                onChange={handleChange}
            />
        </>
    );
}

export default LabelInput