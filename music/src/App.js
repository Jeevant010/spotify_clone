import './output.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginComponent from '../src/routes/Login'
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import { useCookies } from 'react-cookie';


function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  
  return (
    <div className="App w-screen h-screen font-poppins">
      <BrowserRouter>
        {  
        cookie.token ? (
        <Routes>
          <Route path="/" element={ <HelloComponent /> } />
          <Route path='/home' element={ <LoggedInHomeComponent/> }/>
          <Route path='/uploadSong' element={ <UploadSong/> }/>
          <Route path="*" element = { <Navigate to="/home" />  }/>
        </Routes>
        ) :
        (
          <Routes>
          <Route path="/login" element={ <LoginComponent /> } />
          <Route path="/signup" element={ <SignupComponent /> } />
          <Route path='/home' element={ <HomeComponent/> }/>
          <Route path="*" element = { <Navigate to="/login" />  }/>
        </Routes>
        )
        }
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
    return <h1>Hello, World!</h1>;
  };



export default App;
