import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const ToggleButtonInput = ({ input, meta, ...props }) => (
    <ToggleButtonGroup type="radio" name={input.name} defaultValue={props.default}>
        <ToggleButton value={props.values[0]}>Yes</ToggleButton>
        <ToggleButton value={props.values[1]}>No</ToggleButton>
    </ToggleButtonGroup>
)

export default ToggleButtonInput;