import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [allActors, setAllActors] = useState([]);
  const [filteredActors, setFilteredActors] = useState(allActors)
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('https://lanciweb.github.io/demo/api/actresses/'),
          fetch('https://lanciweb.github.io/demo/api/actors/'),
        ]);

        const [actresses, actors] = await Promise.all([
          response1.json(),
          response2.json(),
        ]);

        const all = [...actresses, ...actors];

        setAllActors(all);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allActors.filter(actor => actor.name.toLowerCase().includes(searchInput.toLowerCase()));

    setFilteredActors(filtered)
  }, [allActors, searchInput])

  return (
    <div className='container'>
      <div className='searchContainer'>
        <input className='searchInput' placeholder='Search actor name...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' />
      </div>
      <div className='actorsSection'>
        {filteredActors.map((actor, index) => {
          return (
            <div className='cardContainer' key={index}>
              <img className='imgContainer' src={actor.image} />
              <div className='detailsContainer'>
                <h2>{actor.name}</h2>
                <p>{actor.birth_year}, {actor.nationality}</p>
                <p className='actorAwardsText'>{actor.awards}</p>
                <p>{actor.biography}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
