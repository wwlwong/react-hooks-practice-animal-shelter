import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(event){
    const filterType = event.target.value
    setFilters({type : filterType});
  }

  function handleAdoptPet(id){
    const newPets = pets.map((pet) =>
    pet.id === id ? { ...pet, isAdopted: true } : pet
);
    setPets(newPets);
  }

  function handleFindPets(){
    if (filters.type === "all") {
      fetch("http://localhost:3001/pets")
        .then((r) => r.json())
        .then((pets) => setPets(pets));
    }
    else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
        .then((r) => r.json())
        .then((pets) => setPets(pets));
    }
    
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;