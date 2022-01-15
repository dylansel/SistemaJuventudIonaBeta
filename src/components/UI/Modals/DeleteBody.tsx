import React from "react"
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteBody(props: any) {

    return (
        <>
            <ModalHeader toggle={props.toggler} charcode="close">
                {props.title}
            </ModalHeader>
            <ModalBody>
                <p>Está seguro que desea eliminar a {props.itemSelected.name}?</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.toggler}>
                    Cancelar
                </Button>
                <Button
                    color="danger"
                    onClick={()=>props.function(props.itemSelected.id)}
                >
                    {props.title.split(' ')[0]}
                </Button>
            </ModalFooter>
        </>
    );
}

export default DeleteBody