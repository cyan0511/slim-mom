import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#FC842D',
        },
        secondary: {
            main: '#9B9FAA',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: '#9B9FAA',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.56px',
                    },
                },
            },
        },
    },
});

export default theme;