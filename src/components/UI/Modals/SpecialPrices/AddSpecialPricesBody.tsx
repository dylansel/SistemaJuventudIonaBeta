
import React, { useState, useEffect } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addSpecialPrice } from "../../../../services/specialPriceService";
import { getAllFamiliesWithChildren } from "../../../../services/familyService";

function AddSpecialPricesBody(props: any) {
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
    const initialFieldsState = {
        familyId: -1,
        month: currentDate,
        amount: -1,
    }
    const [fields, setFields] = useState(initialFieldsState)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [families, setFamilies] = useState<any>([null])

    async function fetchData() {
        setLoaded(false)
        setFamilies(await getAllFamiliesWithChildren("sort=surname,asc"))
        setLoaded(true)
    }

    const addChangeFamily = (e: any) => {
        setError(false)
        if (typeof (e.value) == "number") {
            setFields(prevState => ({
                ...prevState,
                familyId: e.value,
            }))
        }
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
        if (fields.familyId === -1 || isEmptyOrSpaces(fields.month) || fields.amount < 0) {
            setError(true)
            return
        }
        setIsAdding(true)
        const specialPriceToAdd = {
            familyId: fields.familyId,
            month: fields.month,
            amount: fields.amount,
        }
        await addSpecialPrice(specialPriceToAdd)
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
                {props.title} Precio Especial
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="familyId">
                            Familia
                        </Label>
                        <CreatableSelectSearch
                            data={(loaded && families) ? families : []}
                            disabled={!(loaded && families) || isAdding}
                            display="fullFamily"
                            label="No se encontró"
                            id="family"
                            name="family"
                            className="mb-3"
                            isValidNewOption={false}
                            onChange={addChangeFamily}
                            placeholder={(loaded && families) ? "Busca apellido" : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="month">
                            Fecha
                        </Label>
                        <Input
                            id="month"
                            disabled={!(loaded && families) || isAdding}
                            name="month"
                            type="month"
                            defaultValue={!(loaded && families) ? "" : fields.month}
                            onChange={addHandleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">
                            Precio
                        </Label>
                        <Input
                            id="amount"
                            disabled={!(loaded && families) || isAdding}
                            name="amount"
                            type="number"
                            step="50"
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
                            disabled={!(loaded && families) || isAdding}
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

export default AddSpecialPricesBody