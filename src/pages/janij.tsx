import { useParams, useNavigate } from 'react-router-dom'
import { getJanij, deleteJanij } from '../services/janijim';
import JanijDTO from '../interfaces/JanijDTO'

export default function Janij() {
    let navigate = useNavigate();
    let params = useParams()
    let janijId: string = params.ID || '';

    let janij: JanijDTO = getJanij(parseInt(janijId));
    return (
        <main style={{ padding: "1rem" }}>
            <h2>{janij.name} {janij.familySurname}</h2>
            <p>Curso de madrijim : {janij.leadersCourse ? "Sí" : "No"}</p>
            <p>Grupo: {janij.groupName}</p>
            <p>
                <button
                    className='btn btn-danger'
                    onClick={() => {
                        deleteJanij(janij.ID);
                        navigate("/janijim");
                    }}
                >
                    Eliminar
                </button>
            </p>
        </main>
    );
}