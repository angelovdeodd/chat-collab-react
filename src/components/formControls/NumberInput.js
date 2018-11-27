import { FormControl, InputGroup } from 'react-bootstrap';
import React from 'react';

const NumberInput = ({ input, meta, ...props }) => {
    var onClickPlus = () => {
        input.value++;
        props.changeAction(input.name, input.value);
    }

    var onClickMinus = () => {
        input.value--;
        props.changeAction(input.name, input.value);
    }
   
    input.value = input.value || props.defaultValue;

    return (
        <InputGroup>
            <InputGroup.Addon onClick={onClickMinus}>-</InputGroup.Addon>
            <FormControl  
                readOnly={true}
                type='text'
                name={input.name}
                value={input.value || props.defaultValue}
            />
            <InputGroup.Addon onClick={onClickPlus}>+</InputGroup.Addon>
        </InputGroup>
    );
}

export default NumberInput;