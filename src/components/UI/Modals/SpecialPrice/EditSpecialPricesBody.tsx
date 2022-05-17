import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { capitalizeAllWords, isEmptyOrSpaces,listArrToString} from "../../../../utils/misc/strings";
import { getAreaById, updateArea } from "../../../../services/areaService";
import { getSpecialPriceById, updateSpecialPrice } from "../../../../services/specialPriceService";
import SpecialPriceDTO from "../../../../dtos/SpecialPriceDTO";
import SpecialPriceRequestDTO from "../../../../dtos/SpecialPriceRequestDTO";





function EditSpecialPricesBody(props: any) {
    let initialviewDataState:SpecialPriceDTO =  {
        id:-1,
        payments:[],
        month: "",
        amount: -1,
    }
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [viewData, setViewData] = useState<SpecialPriceDTO>(initialviewDataState)
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setViewData(await getSpecialPriceById(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState:SpecialPriceRequestDTO =  {
        familyId:-1,
        month: "",
        amount: -1,
    }
    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad ) {
        initialFieldsState = {
            familyId:viewData.payments[0].family.id,
            month: viewData.month,
            amount: viewData.amount,
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
        if (isEmptyOrSpaces(fields.month) || fields.amount <= 0) {
            setError(true)
            return
        }
        setIsUpdating(true)
        if (JSON.stringify(fields) != JSON.stringify(notEditedFields)) {
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
                        {loaded && viewData && firstLoad ? 
                        <>
                        <h5>Familia {viewData.payments[0].family.surname}</h5>
                        
                        </>
                        
                        
                        : "Cargando..."}
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="month">
                            Fecha
                        </Label>
                        <Input
                            id="month"
                            type="month"
                            disabled={isUpdating || !firstLoad}
                            name="month"
                            onChange={handleChange}
                            autoComplete="off"
                            Value={loaded && viewData && firstLoad ? fields.month : ""}
                            
                        />
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
                            placeholder={(!(loaded && viewData)) ? "Cargando..." : ""}
                            value={loaded && viewData && firstLoad ? fields.amount : "Cargando..."}
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