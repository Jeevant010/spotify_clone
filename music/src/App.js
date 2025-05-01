import './output.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LoginComponent from '../src/routes/Login'

function App() {
  return (
    <div className="App w-screen h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HelloComponent /> } />
          <Route path="/login" element={ <LoginComponent /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
    return <h1>Hello, World!</h1>;
  };



export default App;
