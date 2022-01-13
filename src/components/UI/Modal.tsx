import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../services/viewService";

function Modal(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [viewData, setViewData] = useState<any>(null)
    let action: any = props.title.split(' ')[0]

    async function fetchData() {
        setLoaded(false)
        if (props.modalName === 'modaljanij' && action === 'Agregar') {
            setViewData(await getAddJanijData())
        }
        setLoaded(true)
    }

    useEffect(() => {
        action = props.title.split(' ')[0]
        fetchData()
    }, []);

    return (
        <div className="modal fade" id={props.modalName} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input autoComplete="on" className="mb-3 form-control" type="text" id="apellido" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Apellido:</label>
                                <input className="mb-3 form-control" type="text" id="apellido" />
                            </div>
                            {loaded && console.log()}
                            <div className="form-group">
                                <label htmlFor="groups">Grupo:</label><br />
                                <select defaultValue={'Empty'} className="form-select form-control w-100 d-inline mb-3" id="groups">
                                    {viewData && viewData["groups"].map((group: any) => (
                                        <option value={group.id}>{(group.name) && group.name}</option>
                                    )
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <input className="form-check-input" type="checkbox" value="" id="curso-check" />
                                <label className="form-check-label mx-1" htmlFor="curso-check">
                                    Curso de Madrijim
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" className="btn btn-danger">{action}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal