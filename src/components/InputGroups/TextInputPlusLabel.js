import React from 'react'

const TextInput = ({ name, value, placeholder, className, onChange, id, label, type }) => {
    return (
        <React.Fragment>
            {/* label tag's htmlFor prop will be id, since it needs to match with input tag's id */}
            <label htmlFor={id} className="d-block font-weight-bold">{label}</label>
            <input
                className={`${className}`}
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </React.Fragment>
    )
}

export default TextInput