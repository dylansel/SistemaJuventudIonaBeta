import React, { useState, useEffect } from "react"
import { getAddGroupData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addGroup } from "../../../../services/groupService";

function AddGroupBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const initialFieldsState = {
        name: "",
        ordinal: 0,
        areaId: 0,
    }
    const [fields, setFields] = useState(initialFieldsState)

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "ordinal" || name === "areaId") {
            value = parseInt(value)
        }
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCancel = () => {
        setError(false)
        setFields(initialFieldsState)
        props.toggle()
    }

    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddGroupData())
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || fields.ordinal === 0 || fields.areaId === 0) {
            setError(true)
            return
        }
        const name = capitalizeAllWords(fields.name)
        const groupToAdd = {
            name,
            areaId: fields.areaId,
            ordinal: fields.ordinal,
        }
        setIsAdding(true)
        await addGroup(groupToAdd)
        setIsAdding(false)
        props.toggle()
        setFields(initialFieldsState)
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Grupo
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
                    <FormGroup>
                        <Label for="areaId">Area</Label>
                        <Input
                            id="areaId"
                            name="areaId"
                            className="mb-3"
                            type="select"
                            onChange={handleChange}
                            disabled={!(loaded && viewData && viewData["areas"]) || isAdding}
                        >
                            {loaded && viewData && viewData["areas"].map((area: any) => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </Input>
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

export default AddGroupBody