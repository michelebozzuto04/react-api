import { useState } from 'react'
import './index.css'

function App() {

  const [actors, setActors] = useState([]);
  const [actresses, setActresses] = useState([]);

  fetch('https://lanciweb.github.io/demo/api/actresses/')
    .then(response => response.json())
    .then(data => setActresses(data))

  fetch('https://lanciweb.github.io/demo/api/actors/')
    .then(response => response.json())
    .then(data => setActors(data))

  return (
    <div className='container'>
      <div className='actorsSection'>
        {actors.map((actor, index) => {
          return (
            <div className='cardContainer' key={actor.id}>
              <img className='imgContainer' src={actor.image} />
              <div className='detailsContainer'>
                <h2>{actor.name}</h2>
                <p>Nationality: {actor.nationality}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
