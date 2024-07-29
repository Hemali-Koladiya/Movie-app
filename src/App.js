
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Movies from './Movies/Movies';
import SingalMovie from "./Movies/SingalMovie";
import Error from "./Movies/Error"

function App() {
  return (
   <>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="movies/:id" element={<SingalMovie />} />
        {/* <Route path="*" element={<Error />} /> */}
        
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
