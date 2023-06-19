import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import logo from '../assets/logo/logo-horizontal.png';
import { getProfile } from '../services/profileService';
import Loading from './misc/Loading';

export default function Dashboard() {
    const { getAccessTokenSilently } = useAuth0()

    const handleProfile = async() => {
        const data = await getProfile(getAccessTokenSilently)
        console.log(data)
    }

    return (
        <main>
            <div className="main-container row justify-content-xl-around mx-5">
                <div className="logo-container text-center col-12 mb-5 col-xl-6">
                    <img className="img-fluid" src={logo} alt="logo" />
                </div>
                <div className="dashboard col-12 col-xl-4">
                    <h2>Dashboard <span><i className="fas fa-thumbtack"></i></span></h2>
                    <div className="input-field">
                        <input type="text" />
                        <button><i className="fas fa-plus"></i></button>
                    </div>
                    <ul className="todo-list pl-0 mt-3">
                        <li>Tarea1<span><i className="fas fa-trash"></i></span></li>
                        <li>Tarea2<span><i className="fas fa-trash"></i></span></li>
                        <li>Tarea3<span><i className="fas fa-trash"></i></span></li>
                        <li>Tarea4<span><i className="fas fa-trash"></i></span></li>
                    </ul>
                    <div className="dashboard-footer d-flex justify-content-around mt-4">
                        <button>Limpiar todo</button>
                        <button onClick={handleProfile}>Profile</button>
                    </div>
                </div>

            </div>
        </main>
    );
}

