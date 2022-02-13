import { Button, } from 'reactstrap';
import logo from '../assets/logo/logo-horizontal.png';
import { Colors } from '../constants/colors';

export default function Login() {
    const handleClick = () => {
        alert('Redirecting to Auth0...')
        window.location.href = '/';
    }

    return (
        <main>
            <div className="row mx-5 justify-content-center align-items-center  ">
                <div className="logo-container text-center col-12 mb-3">
                    <img className="img-fluid mb-3" src={logo} alt="logo" />
                </div>
                <div className="justify-content-center text-center col-12 col-md-4">
                    <Button
                        onClick={handleClick}
                        style={{ backgroundColor: Colors.primary }}
                    >
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
        </main>
    );
}