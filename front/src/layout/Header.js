import { Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext } from 'react';
import UserContext from '../UserContext';

export default function Header(props) {
    const dev = useContext(UserContext)
    return <header style={props.style}>
        <Hidden smUp implementation="css">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.switchMenu}
            >
                <MenuIcon />
            </IconButton>
        </Hidden>
        JobDeDev - Bonjour {dev.FirstName}
    </header >
}