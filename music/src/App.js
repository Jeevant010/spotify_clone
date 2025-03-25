import 'output.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <div>
            hello
          </div>} />
        </Routes>
        <Route></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
