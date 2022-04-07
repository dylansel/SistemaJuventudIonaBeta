import React, { useState} from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces,formatDateEsToUs } from "../../../../utils/misc/strings";
import { addMultipleActivities } from '../../../../services/activityService';

function AddMultipleActivitiesBody(props: any) {

    const initialFieldsState = {
        fromDate:'',
        toDate:'',
        price: -1
    }
    const [fields, setFields] = useState(initialFieldsState)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

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
        if (isEmptyOrSpaces(fields.fromDate) || isEmptyOrSpaces(fields.toDate) || fields.price === -1){
            setError(true)
            return
        }
        setIsAdding(true)
        const activityToAdd = {
            fromDate: formatDateEsToUs(fields.fromDate),
            toDate: formatDateEsToUs(fields.toDate),
            price: fields.price
        }
        await addMultipleActivities(activityToAdd)
        props.toggle()
        setIsAdding(false)
        props.refresh()
    }

    const toggleCancelAddModal = () => {
        setError(false)
        props.toggle()
    };
    
    return (
        <>
            <ModalHeader toggle={toggleCancelAddModal} charcode="close">
                {props.title} Actividades
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="fromDate">
                            Fecha Inicio
                        </Label>
                        <Input
                            id="fromDate"
                            disabled={isAdding}
                            name="fromDate"
                            type="date"
                            onChange={addHandleChange}
                            autoComplete="off"
                            
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="toDate">
                            Fecha Fin
                        </Label>
                        <Input
                            id="toDate"
                            disabled={isAdding}
                            name="toDate"
                            type="date"
                            onChange={addHandleChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="individualPrice">
                            Costo invididual
                        </Label>
                        <Input
                            id="price"
                            disabled={isAdding}
                            name="price"
                            type="number"
                            step="5"
                            min="0"
                            onChange={addHandleChange}
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

export default AddMultipleActivitiesBody
