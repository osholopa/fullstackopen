import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter, showAll } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filter = (e) => {
    const filter = e.target.value
    if (filter === '') {
      dispatch(showAll())
    } else {
      dispatch(addFilter(filter))
    }
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      Filter <input name="filter" type="text" onChange={(e) => filter(e)} />
    </div>
  )
}

export default Filter
