import React, { useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

function DeleteBody(props: any) {
    const isPreviouslyActive = props.item.active
    const [isSwitchingActive, setIsSwitchingActive] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const switchRequest = async (id: number, active: boolean) => {
        setIsSwitchingActive(true)
        await props.switchActive(id, !active)
        props.toggle()
        setIsSwitchingActive(false)
        props.refresh()
    }

    const deleteRequest = async (id: number) => {
        setIsDeleting(true)
        await props.delete(id)
        props.toggle()
        setIsDeleting(false)
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title}
            </ModalHeader>
            <ModalBody>
                <p>Está seguro que desea eliminar a {props.item.name}?</p>
            </ModalBody>
            <ModalFooter>
                <div className="row col-12">
                    <div className="col-6">
                        <Button
                            color="danger"
                            onClick={() => deleteRequest(props.item.id)}
                            disabled={isDeleting || isSwitchingActive}
                        >
                            {isDeleting ? <div>Eliminando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                    <div className="col-6">
                        <div>
                            <Button
                                onClick={props.toggle}
                                disabled={isDeleting || isSwitchingActive}
                            >
                                Cancelar
                            </Button>{"   "}
                            <Button
                                onClick={() => switchRequest(props.item.id, props.item.active)}
                                color="danger"
                                disabled={isDeleting || isSwitchingActive}
                            >
                                {isSwitchingActive ? <div> {"   "}<Spinner animation="border" variant="light" size="sm" /></div> : (isPreviouslyActive ? "Desactivar" : "Activar")}
                            </Button>
                        </div>
                    </div>
                </div>

            </ModalFooter>
        </>
    );
}

export default DeleteBody