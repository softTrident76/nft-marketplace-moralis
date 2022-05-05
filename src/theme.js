import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors"

// create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6'
        },
        secondary:{
            main: '#19857b'
        },
        error:{
            main: red.A400
        }
    }
})

export default theme