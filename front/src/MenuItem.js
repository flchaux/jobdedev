import React from 'react';
import { Link } from 'react-router-dom';
import Colors from './Theme';

export default function MenuItem(props) {
    return <li style={{
        color: Colors.primary,
        boxSizing: 'border-box',
        padding: 10,
    }}>
        <Link to={props.href} style={{
            color: Colors.primary,
            textDecoration: 'none'
        }}>{props.label}</Link>
    </li>
}