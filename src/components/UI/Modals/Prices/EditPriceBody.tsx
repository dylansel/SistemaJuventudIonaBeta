import React, { useState, useEffect } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { getPriceById, updatePrice } from "../../../../services/priceService";

function EditPriceBody(props: any) {

    const [loaded, setLoaded] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [firstLoad, setFirstLoad] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState<any>([null])
    const [notEditedPrice, setNotEditedPrice] = useState<number>(-1)
    const [editedPrice, setEditedPrice] = useState(-1)

    async function fetchData() {
        setLoaded(false)
        setData(await getPriceById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);


    if (loaded && !firstLoad) {
        setNotEditedPrice(data.amount)
        setEditedPrice(data.amount)
        setFirstLoad(true)
    }

    const editHandleChange = (e: any) => {
        setError(false)
        setEditedPrice(parseInt(e.target.value))
    }

    const toggleCancelEditModal = () => {
        setError(false)
        props.toggle()
    }

    const updateRequest = async () => {
        setError(false)
        if (isNaN(editedPrice) || editedPrice <= 0) {
            setError(true)
            return
        }
        setIsUpdating(true)
        if (editedPrice !== notEditedPrice) {
            data.amount = editedPrice
            await updatePrice(props.item.id, data)
        }
        setIsUpdating(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={toggleCancelEditModal} charcode="close">
                {props.title} Precio
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="price">
                            Precio
                        </Label>
                        <Input
                            id="price"
                            disabled={!(loaded && data) || isUpdating}
                            name="price"
                            type="number"
                            value={loaded ? editedPrice : -1}
                            onChange={editHandleChange}
                        />
                    </FormGroup>
                    <ModalFooter>
                        <Button
                            onClick={toggleCancelEditModal}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isUpdating ? "warning" : "danger"}
                            disabled={(!loaded && data) || isUpdating || !firstLoad}
                            onClick={updateRequest}
                        >
                            {isUpdating ? <div>Editando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default EditPriceBody
