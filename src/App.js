import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from './componet/Container';
import Home from './componet/homePage/Home';
import GamePage from "./componet/gamePage/Gamepage";


function App() {
  return (
    <div className='bg-[#040001] relative' >
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route path="/samurai-battle" element={<Home />} />
            <Route path='/samurai-battle/game-page' element={<GamePage />} />
            <Route path='*' 
            element={<div className="h-[100uh] text-4xl flex justify-center items-center text-white">there is no page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
