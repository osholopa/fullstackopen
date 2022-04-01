import anecdoteService from '../services/anecdoteService'

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    })
  }
}

export const addVote = (anecdote) => {
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.add(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      return state.map((anecdote) =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    case 'ADD':
      return [...state, action.data]
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
