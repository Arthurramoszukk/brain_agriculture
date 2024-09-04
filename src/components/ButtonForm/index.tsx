import React, { ReactNode } from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import './styles.scss';

type Color = { 
    readonly [key: string]: 
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined 
}

type ButtonProps = {
    readonly type: "submit" | "cancel",
    readonly children: React.ReactNode,
    readonly disabled?: boolean;
    readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
    readonly sx?: SxProps<Theme>;
}


export default function ButtonForm(props: ButtonProps) {
    const color:Color = {
        'submit': 'success',
        'cancel': 'error'
    }
    
    return (
        <Button
            {...props}
            type={ props.type == 'submit' ? 'submit' : 'button' }
            variant="contained"
            size="medium"
            disabled={props.disabled}
            color={color[props.type]}
            onClick={props.onClick}
            sx={{
                ...props.sx,
                textTransform: 'none',
                marginLeft: 'auto' 
            }}
        >
            {props.children}
        </Button>
    )
}