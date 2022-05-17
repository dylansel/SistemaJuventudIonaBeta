import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { getSpecialPriceById, updateSpecialPrice } from "../../../../services/specialPriceService";
import SpecialPriceDTO from "../../../../dtos/SpecialPriceDTO";
import SpecialPriceRequestDTO from "../../../../dtos/SpecialPriceRequestDTO";

function EditSpecialPricesBody(props: any) {
    let initialviewDataState: SpecialPriceDTO = {
        id: -1,
        payments: [],
        month: "",
        amount: -1,
    }
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [specialPriceLoaded, setSpecialPriceLoaded] = useState<SpecialPriceDTO>(initialviewDataState)
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setSpecialPriceLoaded(await getSpecialPriceById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState: SpecialPriceRequestDTO = {
        familyId: -1,
        amount: -1,
        month: ""
    }
    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {
        initialFieldsState = {
            familyId: specialPriceLoaded.payments[0].family.id,
            amount: specialPriceLoaded.amount,
            month: specialPriceLoaded.month
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
        props.toggle()
    }

    const editRequest = async () => {
        setError(false)
        if (fields.amount <= 0) {
            setError(true)
            return
        }
        setIsUpdating(true)
        if (JSON.stringify(fields) !== JSON.stringify(notEditedFields)) {
            await updateSpecialPrice(props.item.id, fields)
        }
        setIsUpdating(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Precio Especial
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        {loaded && specialPriceLoaded && firstLoad ?
                            <h5>Familia {specialPriceLoaded.payments[0].family.surname}</h5>
                            : "Cargando..."}

                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">
                            Precio
                        </Label>
                        <Input
                            id="amount"
                            disabled={isUpdating || !firstLoad}
                            name="amount"
                            type="number"
                            onChange={handleChange}
                            autoComplete="off"
                            min="0"
                            step={50}
                            placeholder={(!(loaded && specialPriceLoaded)) ? "Cargando..." : ""}
                            value={loaded && specialPriceLoaded && firstLoad ? fields.amount : "Cargando..."}
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

export default EditSpecialPricesBody