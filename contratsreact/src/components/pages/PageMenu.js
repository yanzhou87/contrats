import {Box, Button, Link, Stack, Text} from '@chakra-ui/react'
import {useParams} from "react-router-dom";
import Header from "../Header";

const PageMenu = ({}) => {
    const {nom} = useParams();

    return (
        <Box>
            <Header color={"black"} h={20} text={nom} w={20} mt="3"></Header>
            <Box m="auto" w="600px">
                <Text fontSize='6xl' align="center" color="LightBlue">Menu</Text>
                <Stack direction='column' mt="10" spacing={10}>
                    <Link href={`http://localhost:3000/utilisateurs/${nom}/contrats`}  m="auto"><Button bg="LightBlue">Les contrats</Button></Link>
                    <Button bg="LightBlue" >Les contrats expirant</Button>
                    <Button bg="LightBlue" >Ajouter un nouveau contrat</Button>
                </Stack>
            </Box>
        </Box>
    )
}
PageMenu.propTypes = {
}
export default PageMenu
