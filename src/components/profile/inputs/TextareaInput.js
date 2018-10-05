import React from 'react';
import { FormControl } from 'react-bootstrap';

const TextareaInput = ({ input, meta, ...props }) => {
    return (
        <FormControl
            componentClass={props.type}
            placeholder={props.placeholder}
            value={input.value}
            onChange={input.onChange} />
    )
}

export default TextareaInput;