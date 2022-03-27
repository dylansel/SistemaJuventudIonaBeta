import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';

function Grants() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Casos de precios</h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Grants, {
    onRedirecting: () => <Loading />,
});