import React from 'react'
import CreatableSelect from 'react-select/creatable'

function CreatableSelectSearch(props: any) {

    const customFilterOption = (option: any, rawInput: any) => {
        const words = rawInput.toLowerCase().split(" ");
        return (
            option.data.__isNew__ ||
            words.reduce(
                (acc: any, cur: any) => acc && option.label.toLowerCase().startsWith(cur),
                true
            )
        );
    };
    const formatCreateLabel = (inputValue: string) => `${props.label} "${inputValue}"`;

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
            filterOption={customFilterOption}
            formatCreateLabel={formatCreateLabel}
            isDisabled={props.disabled}
            onChange={props.onChange}
            options={getOptions(props.data)}
            placeholder={props.placeholder}
        />
    </>)
}

export default CreatableSelectSearch