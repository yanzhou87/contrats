import PropTypes from 'prop-types'
import Header from "../Header";
import Button from "../Button";
import {Link, useParams} from "react-router-dom";
import {useState} from "react";

const PageLogin = ({fetchUtilisateur, estLogin}) => {

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
                    <input type="text" placeholder={'nom'} onChange={(e) => setUserName(e.target.value)} required/>
                    <input type="text" placeholder={'motDePasse'} onChange={(e) => setMotDePasse(e.target.value)}required/>
                    <input type='submit' value='Connexion' className='btn btn-block'/>
                </form>
                <Link to={`/ajouterUtilisateur`}><Button text={'Créer un compte'} color={"pink"}/></Link>

                <Button text={"Connexion"} onclick={()=>{fetchUtilisateur({nom : userName, motDePasse : motDePasse})}}/>
            </div>

    )
}

PageLogin.propTypes = {
    fechUtilisateur: PropTypes.func,
}

export default PageLogin