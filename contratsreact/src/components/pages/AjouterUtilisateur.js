import {useState} from 'react'
import PropTypes from "prop-types";
import {Box, Button, FormControl, FormHelperText, FormLabel, Input, Link, Text} from '@chakra-ui/react'
const AjouterUtilisateur = ({onAjouter, succesInscription, nomOuCourrielExistent}) => {
    const [nom, setNom] = useState('')
    const [courriel, setCourriel] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [verifierMotDePasse, setVerifierMotDePasse] = useState('')

    const estErreurPourMotDePasse = motDePasse === ''
    const estErreurPourNom = nom === ''
    const estErreurPourCourriel = courriel === ''
    const estErreurPourVerifierMotDePasse = verifierMotDePasse === ''
    const [estErreurPourComparerVerifierMotDePasse, setEstErreurPourComparerVerifierMotDePasse] = useState(false)

    const traiterInputChangeNom = (e) => setNom(e.target.value)
    const traiterInputChangeCourriel = (e) => setCourriel(e.target.value)
    const traiterInputChangeMotDePasse = (e) => setMotDePasse(e.target.value)
    const traiterInputChangeVerifierMotDePasse = (e) => setVerifierMotDePasse(e.target.value)
    const onSubmit = (e) => {
        e.preventDefault()

        if (motDePasse !== verifierMotDePasse) {
            setEstErreurPourComparerVerifierMotDePasse(true)
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
        <Box>
            {
                succesInscription ?
                    <Box m='auto' mt='5' p='1' align="center" >
                        <Text fontSize='6xl' color='green'>Bravo !!! Succès Inscription</Text>
                        <Link  href='/'><Button bg="green" color='white'>Connexion</Button></Link>
                    </Box>
                    :
                    <Box bg = 'LightBlue'  color='white' m='auto' mt='10' p='2' width={500} height={650} borderRadius='15'>
                        <form  onSubmit={onSubmit}>
                            <FormControl mb='3' mt='3' isRequired>
                                {nomOuCourrielExistent ? (
                                    <FormHelperText m={3} color='red' fontSize={36}>
                                        Le nom ou le courriel existent
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                                <FormLabel>Nom</FormLabel>
                                <Input type='text' placeholder='nom utilisateur'
                                       value={nom}
                                       onChange={traiterInputChangeNom}/>
                                {estErreurPourNom ? (
                                    <FormHelperText m={3} color='red'>
                                        Le mot est requise
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mb='3' isRequired>
                                <FormLabel>Courriel</FormLabel>
                                <Input type='email' placeholder='Courreil'
                                       value={courriel}
                                       onChange={traiterInputChangeCourriel}/>
                                {estErreurPourCourriel ? (
                                    <FormHelperText m={3} color='red'>
                                        Le courriel est requise
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mb='3' isRequired>
                                <FormLabel>Mot de passe</FormLabel>
                                <Input type='text' placeholder='Mot De Passe'
                                       value={motDePasse}
                                       onChange={traiterInputChangeMotDePasse}/>
                                {estErreurPourMotDePasse ? (
                                    <FormHelperText m={3} color='red'>
                                        Le mot de passe est requise
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                            </FormControl>
                            <FormControl mb='3' isRequired>
                                <FormLabel>Vérifier votre mot de passe</FormLabel>
                                <Input type='text' placeholder='Vérifier Mot De Passe'
                                       value={verifierMotDePasse}
                                       onChange={traiterInputChangeVerifierMotDePasse}/>
                                {estErreurPourVerifierMotDePasse ? (
                                    <FormHelperText m={3} color='red'>
                                        Le mot est requise
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                                {estErreurPourComparerVerifierMotDePasse ? (
                                    <FormHelperText m={3} color='red'>
                                        Le mot de passe vérifié est requise
                                    </FormHelperText>
                                ) : (
                                    <FormHelperText m={3}></FormHelperText>
                                )}
                            </FormControl>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Input type='submit' value='Créer compte'  mt='50' ml='3' width={250} bg='black'/>
                                <Link href='/'><Button color={'red'} mt='50' mr='3'>Retourne</Button></Link>
                            </Box>
                        </form>
                    </Box>

            }
        </Box>
    )
}
AjouterUtilisateur.propTypes = {
    onAjouter: PropTypes.func,
    succesInscription: PropTypes.bool
}
export default AjouterUtilisateur
