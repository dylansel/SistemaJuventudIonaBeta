import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';

function Prices() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Precios</h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Prices, {
    onRedirecting: () => <Loading />,
});