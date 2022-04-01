import React from "react"
import personService from "../services/persons"

const PersonForm = props => {
  const {
    persons,
    newName,
    newNumber,
    setNewName,
    setNewNumber,
    setPersons,
    handleNameInput,
    handleNumberInput,
    setMessage
  } = props

  const addName = event => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (newName === person.name) {
        found = true
      }
    })

    let nameObject = {
      name: newName,
      number: newNumber
    }

    if (found) {
      const person = persons.find(p => p.name === newName)
      const id = person.id
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, nameObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
            setNewName("")
            setNewNumber("")
            setMessage([`Updated ${returnedPerson.name}`, false])
            setTimeout(() => setMessage([null, false]), 3000)
          })
          .catch(error => {
            console.log(error)
            setMessage([
              `Information of ${person.name} has been removed from the server`,
              true
            ])
            setNewName("")
            setNewNumber("")
            setPersons(persons.filter(p => p.id !== id))
            setTimeout(() => setMessage([null, false]), 3000)
          })
      }
      return
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage([`Added ${returnedPerson.name}`, false])
        setTimeout(() => setMessage([null, false]), 3000)
      })
      .catch(error => {
        setMessage([`${error.message}`, true])
        setTimeout(() => setMessage([null, false]), 3000)
      })
  }

  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
          <br />
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
