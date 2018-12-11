import React from 'react';
import Planets from './components/Planets';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import amber from '@material-ui/core/colors/amber';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LaunchIcon from '@material-ui/icons/Launch';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: grey[900] },
    secondary: { main: amber[500] },
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  launchIcon: {
    width: 13,
    height: 13,
    color: '#66a',
  },
});

function App(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div>

        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar variant='dense'>

              <Button variant='text' className={classes.button}>
                Interactive Demo
              </Button>
              <Button variant='text' className={classes.button}>
                Datasets
              </Button>

              <div className={classes.grow} />

              <Button variant='text'
                      className={classes.button}
                      target='_blank'
                      href='https://github.com/mkrauskopf/devstronomy/'>
                GitHub&nbsp;<LaunchIcon className={classes.launchIcon} />
              </Button>

            </Toolbar>
          </AppBar>
        </div>

        <div>
          <div className='content'>
            This is an interactive demo of Devstronomy datasets. See <a href='/#datasets'>datasets</a> section for more
            details.
            <p>
              Click the planet to see only its satellites.
            </p>
          </div>

          <hr/>

          <div className='planets'>
            <Planets/>
          </div>
        </div>

      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

