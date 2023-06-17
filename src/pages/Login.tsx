import { useState } from 'react';
import logo from '../assets/logo/logo-horizontal.png';
import { Colors } from '../constants/colors';
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces } from '../utils/misc/strings';
import { login } from '../services/authService';
import { useNavigate  } from 'react-router-dom';
import { setAuthSesion } from '../auth/authUtils';



export default function Login() {
    const [user, setUser] = useState({user:"",password:""})
    const [error, setError] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleClick = async () => {
        if(isEmptyOrSpaces(user.user) || isEmptyOrSpaces(user.password)){
            return setError(true);
        }
        setIsRedirecting(true)
        const response = await login(user.user,user.password);
        
        if(response){
            setAuthSesion(user.user,user.password);
            navigate('/');// Redirecciona a la página de Dashboard
            window.location.reload();
        }else{
            setError(true);
        }
        setIsRedirecting(false)
    }
    
    return (
        <main>
            <div className="row mx-5 justify-content-center align-items-center  ">
                <div className="logo-container text-center col-12 col-md-6  col-lg-6 mb-3">
                    <img className="img-fluid mb-3" src={logo} alt="logo" />
                </div>
                <div className="justify-content-center text-center col-12 col-md-4 col-lg-3">
            {error && <Alert color="danger" className="text-center">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="user">
                            Usuario
                        </Label>
                        <Input
                            id="user"
                            disabled={isRedirecting}
                            name="user"
                            value={user.user}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            disabled={isRedirecting}
                            name="password"
                            type={showPass?"text":"password"}
                            value={user.password}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <Input
                            id="check"
                            disabled={isRedirecting}
                            name="check"
                            type="checkbox"
                            onChange={()=>setShowPass(!showPass)}
                            autoComplete="off"
                        />
                        <Label for="check" className="mx-2"> Mostrar contraseña</Label>
                    </FormGroup>

                        <Button
                            color={isRedirecting ? "success" : "danger"}
                            disabled={isRedirecting}
                            onClick={handleClick}
                        >
                            {isRedirecting ? <div>Iniciando Sesion... <Spinner animation="border" variant="light" size="sm" /></div> : "Login"}
                        </Button>
                    
                </Form>
                    
                </div>
            </div>
        </main>
    );
}