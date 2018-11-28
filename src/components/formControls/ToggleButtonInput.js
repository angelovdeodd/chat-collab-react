import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const ToggleButtonInput = ({ input, meta, ...props }) => (
    <ToggleButtonGroup value={input.value || props.defaultValue} onChange={input.onChange} type="radio" name={input.name} defaultValue={props.defaultValue}>
        <ToggleButton value={props.values[0]}>Yes</ToggleButton>
        <ToggleButton value={props.values[1]}>No</ToggleButton>
    </ToggleButtonGroup>
)

export default ToggleButtonInput;