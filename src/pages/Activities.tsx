import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';

function Activities() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Actividades</h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Activities, {
    onRedirecting: () => <Loading />,
});