import React from 'react'
import Select from 'react-select'

function SearchSelect(props: any) {

    const customFilterOption = (option: any, rawInput: any) => {
        const words = rawInput.toLowerCase().split(" ");
        return (
            option.data.__isNew__ ||
            words.reduce(
                (acc: any, cur: any) => acc &&
                    option.label.toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .includes(cur), true
            )
        );
    };

    const formatSearchLabel = () => {
        return "No se encontraron coincidencias"
    }

    const getOptions = (data: any) => {
        return data.map((row: any) => {
            return {
                value: row.id,
                label: row[props.display]
            }
        })
    }

    return (<>
        <Select
            noOptionsMessage={formatSearchLabel}
            filterOption={customFilterOption}
            options={getOptions(props.data)}
            id={props.id} name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>)
}

export default SearchSelect