import React from "react";
import personService from "../services/persons";

const Numbers = props => {
  const { persons, search, showAll, setPersons, setMessage } = props;

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(search));

  const deletePerson = person => {
    const id = person.id;

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id));
          setMessage([`Successfully deleted ${person.name}`, false]);
          setTimeout(() => setMessage([null, false]), 3000);
        })
        .catch(error => {
          console.log(error);
          setMessage([
            `Information of ${person.name} has already been removed from the server`,
            true
          ]);
          setPersons(persons.filter(p => p.id !== id));
          setTimeout(() => setMessage([null, false]), 3000);
        });
    }
  };

  return (
    <>
      {contactsToShow.map(person => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => deletePerson(person)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Numbers;
