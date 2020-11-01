import React from 'react';
import MenuItem from './MenuItem';
import Colors from './Theme';

export default () => {
    return <ul style={{
        listStyle: "none",
        backgroundColor: Colors.light,
        width: 200,
        boxSizing: 'border-box',
        padding: 20,
        float: 'left',
        margin: 0,
    }}>
        <MenuItem label="Mon profil" href="/profile" />
        <MenuItem label="Ma recherche" href="/job" />
        <MenuItem label="Mes touches" href="/contact" />
        <MenuItem label="Choisir mon agent" href="/agents" />
        <MenuItem label="Setup" href="/setup" />
    </ul>
}