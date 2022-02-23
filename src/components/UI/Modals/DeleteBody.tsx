import React, { useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Spinner, Input } from 'reactstrap';

function DeleteBody(props: any) {
    const [canDelete, setCanDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleChange = (e: any) => {
        e.preventDefault();
    };

    const handleDeleteField = (e: any) => {
        const { value } = e.target
        setCanDelete(value === props.item.name ? true : false)
        console.log(value, canDelete)
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
                <p>Para eliminar ingrese "<b>{props.item.name}</b>"</p>
                <p><span className="text-danger">Esta acción no se puede deshacer.</span></p>
                <Input
                    id="name"
                    name="name"
                    onChange={handleDeleteField}
                    autoComplete="off"
                    onCut={handleChange}
                    onCopy={handleChange}
                    onPaste={handleChange}
                />
            </ModalBody>
            <ModalFooter>
                <div className="row col-12">
                    <div className="col-6">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={props.toggle}
                                disabled={isDeleting}
                                className="mx-2"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                    <div className="col-6">
                        <Button
                            color="danger"
                            onClick={() => deleteRequest(props.item.id)}
                            disabled={isDeleting || !canDelete}
                        >
                            {isDeleting ? <div>Eliminando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>

            </ModalFooter>
        </>
    );
}

export default DeleteBody