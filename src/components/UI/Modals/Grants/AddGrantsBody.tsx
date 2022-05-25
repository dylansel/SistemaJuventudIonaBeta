import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addGrant } from "../../../../services/grantService";
import { getAllFamiliesWithChildren } from "../../../../services/familyService";
import SearchSelect from "../../Selects/SearchSelect";

function AddGrantsBody(props: any) {
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [families, setFamilies] = useState<any[]>([])

    const initialFieldsState = {
        familyId: -1,
        percentile: 0,
        since: "",
        until: ""
    }

    const [fields, setFields] = useState(initialFieldsState)

    const changeFamily = (e: any) => {
        setError(false)
        if (typeof (e.value) == "number") {
            setFields(prevState => ({
                ...prevState,
                familyId: e.value,
            }))
        }
    }

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "familyId" || name === 'percentile') {
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
        if (fields.familyId <= -1 || fields.percentile <= 0 || fields.percentile > 100 || isEmptyOrSpaces(fields.since) || isEmptyOrSpaces(fields.until)) {
            setError(true)
            return
        }
        setIsAdding(true)
        await addGrant({
            familyId: fields.familyId,
            percentile: fields.percentile / 100,
            since: fields.since,
            until: fields.until
        })
        setIsAdding(false)
        props.toggle()
        props.refresh()
    }

    async function fetchData() {
        setLoaded(false)
        setFamilies(await getAllFamiliesWithChildren("sort=surname,asc"))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Beca
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="familyId">Familia</Label>
                        <SearchSelect
                            data={(loaded && families) ? families : []}
                            disabled={!(loaded && families) || isAdding}
                            display="fullFamily"
                            label="No se encontró"
                            id="familyId"
                            name="familyId"
                            className="mb-3"
                            onChange={changeFamily}
                            placeholder={(loaded && families) ? "Busca apellido" : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="percentile">
                            Porcentaje (Entre 1 y 100)
                        </Label>
                        <Input
                            id="percentile"
                            disabled={isAdding}
                            name="percentile"
                            type="number"
                            min={1}
                            max={100}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="since">
                            Desde
                        </Label>
                        <Input
                            id="since"
                            disabled={!(loaded && families) || isAdding}
                            name="since"
                            type="month"
                            defaultValue={!(loaded && families) ? "" : fields.since}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="until">
                            Hasta
                        </Label>
                        <Input
                            id="until"
                            disabled={!(loaded && families) || isAdding}
                            name="until"
                            type="month"
                            defaultValue={!(loaded && families) ? "" : fields.until}
                            onChange={handleChange}
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

export default AddGrantsBody