import React, { useState} from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { isEmptyOrSpaces,formatDateEsToUs } from "../../../../utils/misc/strings";
import { addMultipleActivities } from '../../../../services/activityService';

function AddMultipleActivitiesBody(props: any) {

    const initialFieldsState = {
        fromDate:'',
        toDate:''

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
        if (isEmptyOrSpaces(fields.fromDate) || isEmptyOrSpaces(fields.toDate)){
            setError(true)
            return
        }
        setIsAdding(true)
        const ActivityToAdd = {
            fromDate: formatDateEsToUs(fields.fromDate),
            toDate: formatDateEsToUs(fields.toDate),
            price: 0 //TODO: Add value from field price
        }
        await addMultipleActivities(ActivityToAdd)
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
                            Fecha Límite
                        </Label>
                        <Input
                            id="toDate"
                            disabled={ isAdding}
                            name="toDate"
                            type="date"
                            onChange={addHandleChange}
                            autoComplete="off"
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
