import { createTheme } from '@mui/material/styles';

export const dashboardTheme = createTheme({
  components: {
    MuiButton: {
      // Name of the component
      styleOverrides: {
        contained: {
          // Name of the slot
          //fontSize: '0.875rem', // Some CSS
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#2F8F9D',
    },
    secondary: {
      main: '#3BACB6',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
