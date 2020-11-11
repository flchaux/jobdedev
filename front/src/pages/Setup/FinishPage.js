import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Colors from '../../Theme';

export default (props) => {
    const [choice, setChoice] = useState()
    if(choice == 'call'){
        return <Redirect to='/setup/agenda' />
    }

    const style = {textAlign: "center", backgroundColor: Colors.dark, color: Colors.neutral, padding: 20 }
 
    return <>
        <Container style={style}>
            <p>C'est fini pour aujourd'hui ! Maintenant c'est à nous de travailler et de vous trouvez le JobDeDev de vos rêves :)</p>
            <p>On aime toujours discuter avec vous, il y a sûrement plein de choses qu'on peut apprendre qui pourrait faire la différence. Pour cela vous pouvez prendre rendez-vous avec votre agent, et ça se passe par ici :</p>
            <Button onClick={() => setChoice('call')} style={{color: Colors.light}}>Oraniser un rendeze-vous téléphonique</Button>
        </Container>
    </>
}