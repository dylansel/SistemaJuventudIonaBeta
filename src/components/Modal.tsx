import React from "react"
import { getJanijim } from "../services/janijim";

function Modal(props: any) {
    let janijim = getJanijim()

    return (
        <div className="modal fade" id={props.modalName} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title} Janij {props.title === "Editar" ? props.id : ""}</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div>
                                <label htmlFor="nombre">Nombre:</label>
                                <input autoComplete="on" className="mx-2 mb-3" type="text" id="apellido" />
                            </div>
                            <div>
                                <label htmlFor="apellido">Apellido:</label>
                                <input className="mx-2 mb-3" type="text" id="apellido" />
                            </div>
                            <div>
                                <label htmlFor="groups">Grupo:</label>
                                <select className="form-select w-50 d-inline mx-2 mb-3" id="groups">
                                    <option selected></option>
                                    {janijim.map(() => (
                                        <option value="">{props.groups}</option>
                                    )
                                    )}
                                </select>
                            </div>
                            <div>
                                <input className="form-check-input" type="checkbox" value="" id="curso-check" />
                                <label className="form-check-label mx-1" htmlFor="curso-check">
                                    Curso de Madrijim
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="submit" className="btn btn-danger">{props.title}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal