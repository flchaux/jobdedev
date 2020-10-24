import React from 'react';
import Colors from './Theme';

export default (props) => {
    return <div style={{
        backgroundColor: Colors.neutral,
        color: Colors.dark,
        padding: 20,
        position: "relative",
        width: 'calc(100% - 200px)',
        boxSizing: "border-box",
        float: 'right',
    }}>{props.children}</div>
}