import React from "react"
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteBody(props: any) {
    const deleteRequest = (id: number) => {
        props.function(id)
        props.toggle()
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
                    onClick={()=>deleteRequest(props.item.id)}
                >
                    {props.title.split(' ')[0]}
                </Button>
            </ModalFooter>
        </>
    );
}

export default DeleteBody