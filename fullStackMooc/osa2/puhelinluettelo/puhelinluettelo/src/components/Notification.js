import React from 'react'

const Notification = ({message, setMessage}) => { 
    
    const messageStyle = {
        color: message[1] ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(message[0] == null) {
        return null
    }
    
    return (
        <div style={messageStyle}>
            {message[0]}
        </div>
    )
    
}

export default Notification