import React from 'react'
import Select from 'react-select'

function SearchSelect(props: any) {
    
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
            options={getOptions(props.data)}
            id={props.id} name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>)
}

export default SearchSelect