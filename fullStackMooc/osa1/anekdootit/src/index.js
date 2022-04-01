import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Header = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))
    const [mostVoted, setMostVoted] = useState(0)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    const handleVoteClick = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        setMostVoted(copy.indexOf(Math.max(...copy)))
    }

    return (
        <div>
            <Header text={"Anecdote of the day"} />
            {props.anecdotes[selected]}
            <br />
            <p>has {votes[selected]} votes</p>
            <Button text={"vote"} onClick={handleVoteClick} />
            <Button text={"next anecdote"} onClick={() => { setSelected(getRandomInt(anecdotes.length)) }} />
            <Header text={"Anecdote with most votes"} />
            {props.anecdotes[mostVoted]}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)