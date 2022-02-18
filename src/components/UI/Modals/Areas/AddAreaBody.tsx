import React, { useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addArea } from "../../../../services/areaService";

function AddAreaBody(props: any) {
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const initialFieldsState = {
        name: "",
        ordinal: -1,
    }
    const [fields, setFields] = useState(initialFieldsState)

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "ordinal") {
            value = parseInt(value)
        }
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleCancel = () => {
        setError(false)
        props.toggle()
    }

    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || fields.ordinal <= 0) {
            setError(true)
            return
        }
        const name = capitalizeAllWords(fields.name)
        const areaToAdd = {
            name,
            ordinal: fields.ordinal,
        }
        setIsAdding(true)
        await addArea(areaToAdd)
        setIsAdding(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Shijva
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            disabled={isAdding}
                            name="name"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ordinal">
                            Ordinal
                        </Label>
                        <Input
                            id="ordinal"
                            disabled={isAdding}
                            name="ordinal"
                            type="number"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>

                    <ModalFooter>
                        <Button
                            onClick={handleCancel}
                            disabled={isAdding}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isAdding ? "success" : "danger"}
                            disabled={isAdding}
                            onClick={postRequest}
                        >
                            {isAdding ? <div>Guardando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default AddAreaBody