import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { getAreaById, updateArea } from "../../../../services/areaService";

function EditAreaBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [viewData, setViewData] = useState<any>(null)
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setViewData(await getAreaById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState = {
        name: "",
        ordinal: 0,
    }
    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {
        initialFieldsState = {
            name: viewData.name,
            ordinal: viewData.ordinal,
        }
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
    }

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
        setFields(initialFieldsState)
        props.toggle()
    }

    const editRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || fields.ordinal === 0) {
            setError(true)
            return
        }
        setIsUpdating(true)
        const name = capitalizeAllWords(fields.name)
        const areaToUpdate = {
            name,
            ordinal: fields.ordinal,
        }
        if (JSON.stringify(areaToUpdate) != JSON.stringify(notEditedFields)) {
            await updateArea(props.item.id, areaToUpdate)
        }
        setIsUpdating(false)
        props.toggle()
        setFields(initialFieldsState)
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
                            disabled={isUpdating || !firstLoad}
                            name="name"
                            onChange={handleChange}
                            autoComplete="off"
                            value={loaded && viewData && fields.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ordinal">
                            Ordinal
                        </Label>
                        <Input
                            id="ordinal"
                            disabled={isUpdating || !firstLoad}
                            name="ordinal"
                            type="number"
                            onChange={handleChange}
                            autoComplete="off"
                            value={loaded && viewData && fields.ordinal}
                        />
                    </FormGroup>

                    <ModalFooter>
                        <Button
                            onClick={handleCancel}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isUpdating ? "warning" : "danger"}
                            disabled={isUpdating}
                            onClick={editRequest}
                        >
                            {isUpdating ? <div>Editando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default EditAreaBody