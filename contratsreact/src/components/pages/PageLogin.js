import PropTypes from 'prop-types'
import Header from "../Header";
import {Button, Input, Link} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {Box} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react'

const PageLogin = ({fetchUtilisateur, estLogin, setSuccesInscription}) => {

    useEffect(()=>{
        setSuccesInscription(false)
    })
    const [userName, setUserName] = useState('')
    const traiterInputChangeNom = (e) => setUserName(e.target.value)
    const [motDePasse, setMotDePasse] = useState('')
    const traiterInputChangeMotDePasse = (e) => setMotDePasse(e.target.value)
    console.log(estLogin)

    const estErreurPourMotDePasse = motDePasse === ''
    const estErreurPourNom = userName === ''
    const onSubmit = (e) => {
        e.preventDefault()

        fetchUtilisateur({nom : userName, motDePasse : motDePasse})

    }

    if (estLogin){
        console.log("login")
    }
    return (
            <Box bg = 'LightBlue'  color='white' m={5} width={500} height={400}>
                <Header title={'Gestion les contrats'} position={'center'}/>

                    <form onSubmit={onSubmit}>
                        <FormControl  isInvalid={estErreurPourNom} isRequired>
                            <FormLabel m={3}>Nom : </FormLabel>
                            <Input width={400} m={3} type="text" placeholder={'nom'} value={userName} onChange={traiterInputChangeNom}/>
                            {estErreurPourNom ? (
                                <FormHelperText m={3}>
                                    Le mot ne peut pas être vide
                                </FormHelperText>
                            ) : (
                                <FormHelperText m={3}></FormHelperText>
                            )}
                        </FormControl>
                        <FormControl isInvalid={estErreurPourMotDePasse} isRequired>
                            <FormLabel m={3}>Mot de passe :</FormLabel>
                            <Input width={400} m={3} type="text" placeholder={'motDePasse'} value={motDePasse} onChange={traiterInputChangeMotDePasse}/>
                            {estErreurPourMotDePasse ? (
                                <FormHelperText m={3}>
                                    Le mot de passe ne peut pas être vide
                                </FormHelperText>
                            ) : (
                                <FormHelperText m={3}></FormHelperText>
                            )}

                        </FormControl>
                        <input m={3} type='submit' value='Connexion' className='btn btn-block' />
                        <Link href='http://localhost:3000/ajouterUtilisateur' m={3}><Button bg='black' m='5'>Créer mon compte</Button></Link>
                    </form>

            </Box>
    )
}

PageLogin.propTypes = {
    fechUtilisateur: PropTypes.func,
    setSuccesInscription: PropTypes.func,
}

export default PageLogin