import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import {useEffect, useState} from "react";
import AjouterUtilisateur from "./components/pages/AjouterUtilisateur";

function App() {
    const [utilisateur, setUtilisateur] = useState([])
    const [utilisateurs, setUtilisateurs] = useState([])
    const [estLogin, setEstLogin] = useState(false)

    useEffect(() => {
        const getUtilisateurs = async () => {
            const utilisateursFromServer = await fetchUtilisateurs()
            setUtilisateurs(utilisateursFromServer)
            getUtilisateurs()
        }
    }, [])

    const fetchUtilisateurs = async () => {
        console.log("fetcheUtilisateurs")
        const res = await fetch('http://localhost:8080/utilisateurs')
        const data = await res.json()
        return data
    }

    const fetchUtilisateur = async (u) => {
        console.log("utilisateur : " + u.nom)
        const res = await fetch(`http://localhost:8080/utilisateurs/${u.nom}`)
        const data = await res.json()
        console.log("utilisateur : " + data.motDePasse)
        console.log("mot de passe : " + data.motDePasse)
        setUtilisateur(data)
        if (data.motDePasse === u.motDePasse){
           setEstLogin(true)
        }
        else
            alert("Mauvais mot de passe")
        console.log(utilisateur)
        return data
    }

    const ajouterCompte = async (compte) => {
        const res = await fetch('http://localhost:8080/utilisateurs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compte)
            })
        console.log( "status : " + res.status)
        if(res.status === 404){
            alert("Le nom ou le courriel existent")
        }
        if(res.status === 201){
            const data = await res.json();
            setUtilisateurs([...utilisateurs, data])
        }
    }

    return (
      <Router>
          <div>
              <Routes>
                  <Route exact path='/' element={<PageLogin fetchUtilisateur={fetchUtilisateur} estLogin={estLogin} />}/>
                  <Route exact path='/ajouterUtilisateur' element={<AjouterUtilisateur onAjouter={ajouterCompte} />}/>
              </Routes>
          </div>
      </Router>


  );
}

export default App;
