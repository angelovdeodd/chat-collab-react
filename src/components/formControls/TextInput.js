import { FormControl } from 'react-bootstrap';
import React from 'react';

const TextInput = ({ input, meta, ...props }) => {
    return (
        <FormControl 
            type='text'
            placeholder={props.placeholder}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
        />
    );
}

export default TextInput;