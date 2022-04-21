import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';

function PricesByMonth() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Precios de </h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(PricesByMonth, {
    onRedirecting: () => <Loading />,
});