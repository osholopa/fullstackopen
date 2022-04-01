import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Statistics = (props) => {

    return (
        <tr>
            <td>{props.text}</td><td>{props.value}</td>
        </tr>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [click,setClick] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGood = () => {
      setClick(click+1)
      setGood(good + 1)
      setSum(sum + 1)
  }

  const handleNeutral = () => {
      setClick(click+1)
      setNeutral(neutral + 1)
  }

  const handleBad = () => {
      setClick(click+1)
      setBad(bad + 1)
      setSum(sum - 1)
  }


  return (
    <div>
        <Header text={"give feedback"}/>
        <Button text={"good"} onClick={handleGood}/>
        <Button text={"neutral"} onClick={handleNeutral}/>
        <Button text={"bad"} onClick={handleBad}/>
        <Header text={"statistics"}/>
        {click === 0 ? <div>No feedback given</div>: <table>
        <Statistics text="good" value={good}/>
        <Statistics text="neutral" value={neutral}/>
        <Statistics text="bad" value={bad}/>
        <Statistics text="all" value={good+neutral+bad}/>
        <Statistics text="average" value={sum / click}/>
        <Statistics text="positive" value={good / click * 100+" %"}/>
        </table>}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)