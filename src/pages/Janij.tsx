import { useParams, useNavigate } from 'react-router-dom'
import { getJanijById, deleteJanij } from '../services/janijService';
import JanijDTO from '../interfaces/JanijDTO'
import { useEffect, useState } from 'react';

export default function Janij() {
    let navigate = useNavigate();
    let params = useParams()
    let janijId: string = params.ID || '';
    const [loaded, setLoaded] = useState(false)
    const [janij, setJanij] = useState<JanijDTO>()

    async function fetchData() {
        setLoaded(false)
        setJanij(await getJanijById(parseInt(janijId)))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    if(!loaded){
        return <main><p>Cargando</p></main>
    }
    return (
        <main style={{ padding: "1rem" }}>
            <h2>{janij && janij.name} {janij && janij.familySurname}</h2>
            <p>Curso de madrijim : {janij && janij.leadersCourse ? "Sí" : "No"}</p>
            <p>Grupo: {janij && janij.groupName}</p>
            <p>
                <button
                    className='btn btn-danger'
                    onClick={() => {
                        deleteJanij(janij ? janij.id : -1);
                        navigate("/janijim");
                    }}
                >
                    Eliminar
                </button>
            </p>
        </main>
    );
}