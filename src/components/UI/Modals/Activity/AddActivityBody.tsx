import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces,formatDateEsToUs } from "../../../../utils/misc/strings";
import { addActivity } from '../../../../services/activityService';

function AddActivityBody(props: any) {

    const initialFieldsState = {
        date: '',
        individualPrice: -1,

    }
    const [fields, setFields] = useState(initialFieldsState)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
    }
    
    const addHandleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    

    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.date) || fields.individualPrice <= -1 ){
            setError(true)
            return
        }
        console.log(formatDateEsToUs(fields.date))
        setIsAdding(true)
        const ActivityToAdd = {
            date: formatDateEsToUs(fields.date),
            individualPrice: fields.individualPrice,
            
        }
        await addActivity(ActivityToAdd)
        props.toggle()
        setIsAdding(false)
        props.refresh()
    }

    const toggleCancelAddModal = () => {
        setError(false)
        props.toggle()
    }
    useEffect(() => {
        fetchData()
    }, []);
    
    return (
        <>
            <ModalHeader toggle={toggleCancelAddModal} charcode="close">
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
                            disabled={!(loaded && viewData && viewData["families"] && viewData["groups"]) || isAdding}
                            name="date"
                            type="date"
                            onChange={addHandleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData && viewData["families"] && viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="individualPrice">
                            Costo invididual
                        </Label>
                        <Input
                            id="individualPrice"
                            disabled={!(loaded && viewData && viewData["families"] && viewData["groups"]) || isAdding}
                            name="individualPrice"
                            type="number"
                            step="5"
                            onChange={addHandleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData && viewData["families"] && viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
                    <ModalFooter>
                        <Button
                            onClick={toggleCancelAddModal}
                            disabled={isAdding}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isAdding ? "success" : "danger"}
                            disabled={!(loaded && viewData && viewData["families"] && viewData["groups"]) || isAdding}
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

export default AddActivityBody
