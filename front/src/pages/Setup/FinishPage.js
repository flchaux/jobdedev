import { Button, Container } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Colors from '../../Theme';
import UserContext from '../../UserContext';

export default function FinishPage(props) {
    const [choice, setChoice] = useState()
    const dev = useContext(UserContext)
    if (choice === 'call') {
        return <Redirect push to='/setup/agenda' />
    }
    else if (choice === 'profile') {
        return <Redirect push to='/setup/wish' />
    }
    else if (choice === 'finish') {
        return <Redirect push to='/' />
    }

    const style = { textAlign: "center", backgroundColor: Colors.dark, color: Colors.neutral, padding: 20 }

    var nextContent
    if (!dev.InitialEventPlanned) {
        nextContent = <>
            <p>On aime toujours discuter avec vous, il y a sûrement plein de choses qu'on peut apprendre qui pourrait faire la différence. Pour cela vous pouvez prendre rendez-vous avec votre agent, et ça se passe par ici :</p>
            <Button onClick={() => setChoice('call')} style={{ color: Colors.light }}>Oraniser un rendeze-vous téléphonique</Button>
        </>
    }
    else if (!dev.JobTitleRequired) {
        nextContent = <>
            <p>En attendant notre coup de fil vous pouvez remplir votre profil : </p>
            <Button onClick={() => setChoice('profile')} style={{ color: Colors.light }}>Remplir mon profil</Button>
        </>
    }
    else {
        nextContent = <Button onClick={() => setChoice('finish')} style={{ color: Colors.light }}>Accéder à l'application</Button>
    }

    return <>
        <Container style={style}>
            <p>C'est fini pour aujourd'hui ! Maintenant c'est à nous de travailler et de vous trouvez le JobDeDev de vos rêves :)</p>
            {nextContent}
        </Container>
    </>
}