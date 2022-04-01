import React from 'react'

const Filter = (props) => {
    const { search, handleSearchInput } = props
    return (
        <div>
            find countries <input value={search} onChange={handleSearchInput} />
        </div>
    )
}

export default Filter
