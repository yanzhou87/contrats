import {CloseIcon, StarIcon} from "@chakra-ui/icons";
import {Heading, Link, Stack} from "@chakra-ui/react";

const Header = ({ w, h, text, color }) => {
    return (
        <Stack direction='row' ml="10" >
            <StarIcon w={w} h={h}  color={color}/>
            <Heading>{ text }</Heading>
            <Link href='http://localhost:3000/'><CloseIcon w={3} mt={4} ml={1} color="red"/></Link>
        </Stack>
    )
}
export default Header