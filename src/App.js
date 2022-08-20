import axios from 'axios'

const App =()=> {

  axios
  .get('https://data.mongodb-api.com/app/data-pucta/endpoint/data/v1')
  .then(response => {
    console.log(response)
  })

  return (
    <>
    <h1>Clifora</h1>
    <h1>The best in the world woohoo!!!!!</h1>
    </>
  );
}

export default App;
