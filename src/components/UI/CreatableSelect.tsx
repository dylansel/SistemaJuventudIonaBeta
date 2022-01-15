import React from 'react'
import CreatableSelect from 'react-select/creatable'

function CreatableSelectSearch(props: any) {

    const getOptions = (data: any) => {
        return data.map((row: any) => {
            return {
                value: row.id,
                label: row[props.display]
            }
        })
    }
    return (<>
        <CreatableSelect
            onChange={props.onChange}
            options={getOptions(props.data)}
            placeholder={props.placeholder}
        />
    </>)
}

export default CreatableSelectSearch