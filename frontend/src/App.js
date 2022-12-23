import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import Home from './components/Home/Home'
import MovieGuess from './components/Movie/MovieGuess'
import Words from './components/Words/Words'
import Jumble from './components/Jumble/Jumble'
function App() {
  return (

    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/movie-guess" element={<MovieGuess />} />
        <Route path="/create-words" element={<Words />} />
        <Route path="/jumble" element={<Jumble />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
