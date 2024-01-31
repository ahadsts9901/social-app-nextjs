import * as React from 'react';
import TextField from '@mui/material/TextField';
import "../../globals.css"

export default function TextFieldMUI(props) {
    return (
        <TextField
            id="standard-basic"
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            variant="standard"
            InputLabelProps={{
                shrink: true,
            }}
            multiline={props.multiline}
            rows={props.rows}
            className='hide-scrollbar'
        />
    );
}
