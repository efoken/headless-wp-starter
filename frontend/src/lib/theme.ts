import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#c5ac20',
    },
    background: {
      default: '#000',
    },
  },
  typography: {
    fontFamily: 'Lato, Helvetica, Arial, sans-serif',
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
  },
});
