import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import GrantDTO from "../../../../dtos/GrantDTO";
import { getGrantById, updateGrant } from "../../../../services/grantService";
import { isEmptyOrSpaces } from "../../../../utils/misc/strings";

function EditGrantsBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [grantLoaded, setGrantLoaded] = useState<GrantDTO>()
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setGrantLoaded(await getGrantById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState = {
        familyId: -1,
        percentile: 0,
        since: "",
        until: ""
    }

    const [fields, setFields] = useState(initialFieldsState)

    if (grantLoaded && loaded && !firstLoad) {
        initialFieldsState = {
            familyId: grantLoaded.family.id,
            percentile: grantLoaded.percentile * 100,
            since: grantLoaded.since,
            until: grantLoaded.until
        }
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
    }

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === 'percentile') {
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
        if (fields.percentile <= 0 || fields.percentile > 100 || isEmptyOrSpaces(fields.since) || isEmptyOrSpaces(fields.until)) {
            setError(true)
            return
        }
        if (grantLoaded) {
            setIsUpdating(true)
            const grantToUpdate = {
                familyId: grantLoaded.family.id,
                percentile: fields.percentile / 100,
                since: fields.since,
                until: fields.until
            }
            if (JSON.stringify(grantToUpdate) != JSON.stringify(notEditedFields)) {
                grantToUpdate.familyId = grantLoaded.family.id
                await updateGrant(props.item.id, grantToUpdate)
            }
            setIsUpdating(false)
            props.refresh()
        }
        props.toggle()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Beca
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        {loaded && grantLoaded && firstLoad ?
                            <h5>Familia {grantLoaded.family.surname}</h5>
                            : ""}
                    </FormGroup>
                    <FormGroup>
                        <Label for="percentile">
                            Porcentaje (Entre 1 y 100)
                        </Label>
                        <Input
                            id="percentile"
                            disabled={isUpdating || !firstLoad}
                            name="percentile"
                            type="number"
                            min={1}
                            max={100}
                            onChange={handleChange}
                            autoComplete="off"
                            value={loaded && firstLoad ? fields.percentile : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="since">
                            Desde
                        </Label>
                        <Input
                            id="since"
                            disabled={isUpdating || !firstLoad}
                            name="since"
                            type="month"
                            onChange={handleChange}
                            value={loaded && firstLoad ? fields.since : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="until">
                            Hasta
                        </Label>
                        <Input
                            id="until"
                            disabled={isUpdating || !firstLoad}
                            name="until"
                            type="month"
                            onChange={handleChange}
                            value={loaded && firstLoad ? fields.until : "Cargando..."}
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

export default EditGrantsBody