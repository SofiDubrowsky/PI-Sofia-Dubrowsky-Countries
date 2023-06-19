
import './App.css';
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing';
import { Route, Routes, useLocation} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      <div className='shadow'>
      { location.pathname !== '/' && location.pathname !== '/home' ? <Nav/>: null }
      <Routes>
         <Route path='/' element={<Landing/>}/>  
         <Route path='/home' element={<Home/>}/>
         <Route path='/detail/:id' element={<Detail/>}/>
         <Route path='/form' element={<Form/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
