import './App.css';
import react, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api')
    .then((response) => response.json())
    .then(response => setData(response.message))
  }, [])

  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
