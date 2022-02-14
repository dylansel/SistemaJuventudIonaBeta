import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Button, } from 'reactstrap';
import logo from '../assets/logo/logo-horizontal.png';
import { Colors } from '../constants/colors';

export default function Login() {
    const { loginWithRedirect } = useAuth0()
    const [isRedirecting, setIsRedirecting] = useState(false)
    const handleClick = () => {
        setIsRedirecting(true)
        loginWithRedirect()
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
                        disabled={isRedirecting}
                        style={{ backgroundColor: Colors.primary }}
                    >
                        {!isRedirecting ? "Iniciar Sesión" : "Redireccionando..."}
                    </Button>
                </div>
            </div>
        </main>
    );
}