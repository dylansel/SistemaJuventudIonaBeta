import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';

function Attendance() {
    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Asistencia</h3>
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Attendance, {
    onRedirecting: () => <Loading />,
});