import PropTypes from 'prop-types'

import {useEffect, useState} from "react";
import {Box} from '@chakra-ui/react'
import {Button, Input, Link, Text, FormControl, FormLabel, FormHelperText,} from '@chakra-ui/react'

const PageLogin = ({fetchUtilisateur, estLogin, setSuccesInscription, estErreurPourMauvaisMotDePasse, compteExistePas}) => {

    useEffect(()=>{
        setSuccesInscription(false)
    })
    const [userName, setUserName] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const traiterInputChangeNom = (e) => setUserName(e.target.value)
    const traiterInputChangeMotDePasse = (e) => setMotDePasse(e.target.value)

    const estErreurPourMotDePasse = motDePasse === ''
    const estErreurPourNom = userName === ''

    const onSubmit = (e) => {
        e.preventDefault()
        fetchUtilisateur({nom : userName, motDePasse : motDePasse})
    }

    if (estLogin){
        window.location.assign("http://localhost:3000/utilisateurs/"+userName)
    }
    return (
        <Box>
            <Text fontSize='6xl' align="center">Gestion les contrats</Text>

            <Box bg = 'LightBlue'  color='white' m='auto' mt='5' p='1' width={500} height={400} borderRadius='15'>

                <form onSubmit={onSubmit}>
                    <FormControl  isInvalid={estErreurPourNom} isRequired >
                        <FormLabel m={3}>Nom : </FormLabel>
                        <Input width={400} m={3} type="text" placeholder={'nom'} value={userName} onChange={traiterInputChangeNom}/>
                        {compteExistePas ? (
                            <FormHelperText m={3} color='red'>
                                Compte existe pas .
                            </FormHelperText>
                        ) : (
                            <FormHelperText m={3}></FormHelperText>
                        )}
                        {estErreurPourNom ? (
                            <FormHelperText m={3} color='red'>
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
                            <FormHelperText m={3} color='red'>
                                Le mot de passe ne peut pas être vide
                            </FormHelperText>
                        ) : (
                            <FormHelperText m={3}></FormHelperText>
                        )}
                        {estErreurPourMauvaisMotDePasse ? (
                            <FormHelperText m={3} color='red'>
                                Mauvais mot de passe
                            </FormHelperText>
                        ) : (
                            <FormHelperText m={3}></FormHelperText>
                        )}
                        {estLogin ? (
                            <FormHelperText m={3} color='green'>
                                Login
                            </FormHelperText>
                        ) : (
                            <FormHelperText m={3}></FormHelperText>
                        )}
                    </FormControl>
                    <Input width={200} m={3} bg='pink' type='submit' value='Connexion'/>
                    <Link href='http://localhost:3000/ajouterUtilisateur' m={3}><Button bg='black' m='5' width={200} >Créer mon compte</Button></Link>
                </form>

            </Box>
        </Box>
    )
}

PageLogin.propTypes = {
    fechUtilisateur: PropTypes.func,
    setSuccesInscription: PropTypes.func,
}

export default PageLogin