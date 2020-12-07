import React, { useContext, useEffect, useState } from 'react';
import AgentsList from '../components/agent/AgentsList';
import UserContext from '../UserContext';

export default function AgentsPage(props) {
    const dev = useContext(UserContext)
    const [agents, setAgents] = useState([])
    useEffect(() => {
        props.agentStore.getAllAvailable().then((result) => setAgents(result));
    }, [props.agentStore])

    function updateAgent(agent) {
        props.devStore.updateAgent(dev, agent).then((result) => {
            if (result.success) {
                props.errorManager.setError('Erreur')
            }
            else {
                props.errorManager.setError('Erreur')
            }
        })
    }

    return <AgentsList change={updateAgent} agents={agents} {...props} />
}