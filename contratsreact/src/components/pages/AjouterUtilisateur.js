import {useState} from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Button";

const AjouterUtilisateur = ({onAjouter}) => {
    const [nom, setNom] = useState('')
    const [courriel, setCourriel] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [verifierMotDePasse, setVerifierMotDePasse] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!nom || !courriel || !motDePasse || !verifierMotDePasse) {
            alert('Veuillez ajouter toutes les informations')
            return
        }

        if (motDePasse !== verifierMotDePasse) {
            alert('Vérifier le mot de passe et le mot de passe ne correspondent pas')
            return
        }
        if(motDePasse.length < 6){
            alert("La longueur du mot de passe est supérieure à 5")
            return
        }
        onAjouter({nom : nom, courriel:courriel, motDePasse:motDePasse})
        setNom('')
        setCourriel('')
        setMotDePasse('')
        setVerifierMotDePasse('')
    }

    return (

        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Nom</label>
                <input type='text' placeholder='nom utilisateur'
                       value={nom}
                       onChange={(e) => setNom(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Courriel</label>
                <input type='email' placeholder='Courreil'
                       value={courriel}
                       onChange={(e) => setCourriel(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Mot de passe</label>
                <input type='text' placeholder='Mot De Passe'
                       value={motDePasse}
                       onChange={(e) => setMotDePasse(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Vérifier votre mot de passe</label>
                <input type='text' placeholder='Vérifier Mot De Passe'
                       value={verifierMotDePasse}
                       onChange={(e) => setVerifierMotDePasse(e.target.value)}/>
            </div>
            <input type='submit' value='Créer compte' className='btn btn-block'/>
            <Link to='/'><Button color={'red'} text={'Retourne'}/></Link>
        </form>
    )
}
AjouterUtilisateur.propTypes = {
    onAjouter: PropTypes.func,
}
export default AjouterUtilisateur
