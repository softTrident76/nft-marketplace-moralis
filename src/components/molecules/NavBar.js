import { useContext } from "react"
import { AppBar, Toolbar, Typography, Container} from "@mui/material"
import { Web3Context } from "../providers/Web3Provider"
import NavItem from "../atoms/NavItem"
import ConnectedAccountAddress from "../atoms/ConnectedAccountAddress"
import ConnectButton from '../atoms/ConnectButton'
import { Box } from "@mui/system"

const pages = [
    {
        title:  'Market',
        href:   '/'
    },
    {
        title:  'My NFTs',
        href:   '/my-nfts'
    }
]

const NavBar = () => {
    const {account} = useContext(Web3Context)
    const logo = '🖼️'
    return (
        <AppBar position="static">
            <Container maxWidth="100%">
                <Toolbar disableGutters>
                    <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{p: '10px', flexGrow: {xs: 1, md: 0}, display: 'flex'}}
                    >
                        {logo}
                    </Typography>
                    <Box sx={{flexGrow: 1, display: 'flex'}}>
                        {pages.map(({title, href}) => <NavItem title={title} href={href} key={title} />)}
                    </Box>
                        {account ? <ConnectedAccountAddress account={account} /> : <ConnectButton/> }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar