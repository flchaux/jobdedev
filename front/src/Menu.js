import React from 'react';
import MenuItem from './MenuItem';
import Colors from './Theme';

export default (props) => {
    return <ul {...props}>
        <MenuItem label="Mon profil" href="/profile" />
        <MenuItem label="Ma recherche" href="/job" />
        <MenuItem label="Mes touches" href="/contact" />
        <MenuItem label="Choisir mon agent" href="/agents" />
        <MenuItem label="Setup" href="/setup" />
    </ul>
}