import PropTypes from 'prop-types'
import Header from "../Header";
import Button from "../Button";
import {Link} from "react-router-dom";
import {useState} from "react";

const PageLogin = ({fechUtilisateur, estLogin}) => {
    const [userName, setUserName] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    console.log(estLogin)
    if (estLogin){
        //return <pageMenu />;
    }
    return (

            <div>
                <form className='add-form' >
                    <Header title={'Gestion les contrats'} position={'center'}/>
                    <input type="text" placeholder={'nom'} onChange={(e) => setUserName(e.target.value)} required/>
                    <input type="text" placeholder={'motDePasse'} onChange={(e) => setMotDePasse(e.target.value)}required/>
                </form>
                <Link to={`/ajouterUtilisateur`}><Button text={'Créer un compte'} color={"pink"}/></Link>
                <Button text={"Connexion"} onClick={()=>fechUtilisateur({nom : userName, motDePasse : motDePasse})}/>

            </div>

    )
}

PageLogin.propTypes = {
    fechUtilisateur: PropTypes.func,
}

export default PageLogin