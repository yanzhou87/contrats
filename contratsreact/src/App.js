import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import {useEffect, useState} from "react";

function App() {
    const [utilisateur, setUtilisateur] = useState([])
    const [estLogin, setEstLogin] = useState(false)

    const fetchUtilisateur = async (u) => {
        console.log("utilisateur : " + u.nom)
        const res = await fetch(`http://localhost:8080/utilisateur/${u.nom}`)
        const data = await res.json()
        setUtilisateur(data)
        if (utilisateur.motDePasse === u.motDePasse){
           setEstLogin(true)
        }
        return data
    }

  return (
      <Router>
          <div>
              <Routes>
                  <Route exact path='/' element={<PageLogin fechUtilisateur={fetchUtilisateur} estLogin={estLogin} />}/>
              </Routes>
          </div>
      </Router>


  );
}

export default App;
