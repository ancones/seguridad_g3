import { useState } from 'react'


const LabelData = ({ label, data}) => {
    return (
        <>
            <label>{label}:</label>
            <p>
                {data}
            </p>
        </>
    );
}

export default LabelData