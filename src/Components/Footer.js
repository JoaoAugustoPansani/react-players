import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
    return <Box sx={{
        width: '100%',
        height: '60px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '40px auto 20px auto'
    }}>
        <Box sx={{
            width: '100px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="body2"
                component="a"
                target="_blank"
                href="https://github.com/JoaoAugustoPansani"
                sx={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: 'white'
                }}>
                GitHub
            </Typography>
            <Typography variant="body1" sx={{ margin: 'auto 20px' }}>
                |
            </Typography>
            <Typography variant="body2" 
            component="a"
            target="_blank"
            href="https://www.jpansani.com"
            sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'white'
            }}>
                Portifolio
            </Typography>
        </Box>
    </Box>
};

export default Footer;