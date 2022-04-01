export const addFilter = (filter) => {
  return {
    type: 'ADD_FILTER',
    filter,
  }
}

export const showAll = () => {
  return {
    type: 'SHOW_ALL',
    filter: 'ALL',
  }
}

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return action.filter
    case 'SHOW_ALL':
      return action.filter
    default:
      return state
  }
}

export default filterReducer
