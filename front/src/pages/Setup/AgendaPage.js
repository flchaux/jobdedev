import React, { useContext } from 'react';
import AgendaWidget from '../../components/call/AgendaWidget';
import UserContext from '../../UserContext';
export default function AgendaPage(props) {
    const dev = useContext(UserContext)
    return <AgendaWidget {...props} reason='Initial' onPlanned={() => dev.InitialEventPlanned = true} />
}