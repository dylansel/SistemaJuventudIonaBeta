import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';

function SpecialPrice() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Precios Especiales</h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(SpecialPrice, {
    onRedirecting: () => <Loading />,
});