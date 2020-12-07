import amplitude from 'amplitude-js';
import { useLocation } from 'react-router-dom';

export default function AppController(props) {
    const location = useLocation()
    if (process.env.NODE_ENV === 'production') {
        amplitude.getInstance().logEvent('page-' + location.pathname.split('/').slice(1).join('-'));
    }
    return props.children
}