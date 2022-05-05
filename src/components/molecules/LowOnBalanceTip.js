import { Paper, Typography } from "@mui/material"
export default function LowOnBalanceTip() {
    return (
        <Paper 
            elevation={3}
            square
            sx={{
                p: '5px 5px'
            }}
        >
            <Typography>
                Low on Matic? Use this <a href="https://faucet.polygon.technology/" target="_blank">faucet</a> to get free test tokens!
            </Typography>
        </Paper>
    )
}