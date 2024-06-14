import { Route, Routes } from "react-router-dom";
import Container from './componet/Container';
import Home from './componet/homePage/Home';
import GamePage from "./componet/gamePage/Gamepage";


function App() {
  return (
    <div className='bg-[#040001] relative' >
      <Routes>
        <Route element={<Container />}>
          <Route index element={<Home />}></Route>
          <Route path='/game-page' element={<GamePage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
