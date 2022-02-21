import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { getActivityById, updateActivity } from "../../../../services/activityService";

function EditActivityBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [viewData, setViewData] = useState<any>(null)
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setViewData(await getActivityById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState = {
        date: "",
        individualPrice: -1,
    }
    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {
        initialFieldsState = {
            date: viewData.date,
            individualPrice: viewData.individualPrice,
        }
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
    }

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "individualPrice") {
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

    const editRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.date) || fields.individualPrice <= 0) {
            setError(true)
            return
        }
        setIsUpdating(true)
        
        const activityToUpdate = {
            date:fields.date,
            individualPrice: fields.individualPrice,
        }
        if (JSON.stringify(activityToUpdate) != JSON.stringify(notEditedFields)) {
            await updateActivity(props.item.id, activityToUpdate)
        }
        setIsUpdating(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Actividad
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="date">
                            Fecha
                        </Label>
                        <Input
                            id="date"
                            disabled={isUpdating || !firstLoad}
                            name="date"
                            type="date"
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData)) ? "Cargando..." : ""}
                            value={loaded && viewData && firstLoad ? fields.date : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ordinal">
                            Precio invididual
                        </Label>
                        <Input
                            id="individualPrice"
                            disabled={isUpdating || !firstLoad}
                            name="individualPrice"
                            type="number"
                            step="5"
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData)) ? "Cargando..." : ""}
                            value={loaded && viewData && firstLoad ? fields.individualPrice : "Cargando..."}
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
                            disabled={isUpdating || !firstLoad}
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

export default EditActivityBody
