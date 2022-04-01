let timeoutID = null

export const setNotification = (notification, duration) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: '',
      })
      timeoutID = null
    }, duration * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer
