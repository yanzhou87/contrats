import PropTypes from 'prop-types'
import Header from "../Header";
import Button from "../Button";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const PageLogin = ({fetchUtilisateur, estLogin, setSuccesInscription}) => {

    useEffect(()=>{
        setSuccesInscription(false)
    })
    const [userName, setUserName] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    console.log(estLogin)

    const onSubmit = (e) => {
        e.preventDefault()

        fetchUtilisateur({nom : userName, motDePasse : motDePasse})

    }

    if (estLogin){
        console.log("login")
    }
    return (
            <div>
                <form className='add-form' onSubmit={onSubmit}>
                    <Header title={'Gestion les contrats'} position={'center'}/>
                    <div>
                        <label>Nom : </label>
                        <input type="text" placeholder={'nom'} onChange={(e) => setUserName(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Mot de passe : </label>
                        <input type="text" placeholder={'motDePasse'} onChange={(e) => setMotDePasse(e.target.value)}required/>
                    </div>

                    <input type='submit' value='Connexion' className='btn btn-block' />
                    <Link to={`/ajouterUtilisateur`}><Button text={'Créer un compte'} color={"pink"}/></Link>
                </form>
            </div>
    )
}

PageLogin.propTypes = {
    fechUtilisateur: PropTypes.func,
    setSuccesInscription: PropTypes.func,
}

export default PageLogin