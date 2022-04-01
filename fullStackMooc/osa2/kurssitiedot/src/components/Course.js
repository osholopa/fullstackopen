import React from 'react'

const Header = props =>
    <h1>{props.course}</h1>

const Content = props =>
    props.parts.map((p) => <Part key={p.id} name={p.name} exercises={p.exercises} />)

const Part = props =>
    <p>{props.name} {props.exercises}</p>

const Total = props => {
    const total = props.parts.reduce((s, p) => s += p.exercises, 0)
    return <h2>Total of {total} excercises</h2>
}


const Course = props => (
    <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </>
)

export default Course