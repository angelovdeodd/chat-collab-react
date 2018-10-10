import { FormControl } from 'react-bootstrap';
import React from 'react';

const FieldInput = ({ input, meta, ...props }) => {
    return (
        <FormControl 
            type={props.type}
            placeholder={props.placeholder}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
             />
    );
}

export default FieldInput;