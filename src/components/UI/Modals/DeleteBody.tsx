import React, { useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

function DeleteBody(props: any) {
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteRequest = async (id: number) => {
        setIsDeleting(true)
        await props.function(id)
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
                <Button onClick={props.toggle}>
                    Cancelar
                </Button>
                <Button
                    color="danger"
                    onClick={() => deleteRequest(props.item.id)}
                >
                    {isDeleting ? <div>Eliminando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                </Button>
            </ModalFooter>
        </>
    );
}

export default DeleteBody