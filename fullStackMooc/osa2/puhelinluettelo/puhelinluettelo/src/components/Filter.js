import React from 'react'

const Filter = (props) => {
    const { search, handleSearchInput } = props
    return (
        <div>
            filter shown with <input value={search} onChange={handleSearchInput} />
        </div>
    )
}

export default Filter