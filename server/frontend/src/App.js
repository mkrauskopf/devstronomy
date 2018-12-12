import React from 'react';

import Planets from './components/Planets';
import Datasets from './components/Datasets';
import Links from './links';

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

const Content = (prop) => {
  if (prop.contentKey === 'planets') {
    return (
      <div>
        <div className='content'>
          This is an interactive version of <a href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/'>Planetary Fact
          Sheet</a> and  <a href='https://ssd.jpl.nasa.gov/?sat_phys_par'>Planetary Satellite Physical Parameters</a>
          &nbsp;datasets from {Links.jpl}. See datasets section for more details.
          <p>
            <span className='highlight'>Select the planet below</span> to see only its satellites.
          </p>
        </div>

        <hr/>

        <div className='planets'>
          <Planets/>
        </div>
      </div>
    );
  } else if (prop.contentKey === 'datasets') {
    return (
      <div className='datasets'>
        <Datasets/>
      </div>
    );
  }
}

class App extends React.Component {

  state = {
    contentKey: 'planets'
  }

  switchContent(contentKey) {
    this.setState({
      contentKey: contentKey
    })
  }

  render() {
    const classes = this.props.classes;
    return (
      <MuiThemeProvider theme={theme}>
        <div>

          <div className={classes.root}>
            <AppBar position='static'>
              <Toolbar variant='dense'>

                <Button variant='text' className={classes.button} onClick={() => this.switchContent('planets')} >
                  Interactive Demo
                </Button>
                <Button variant='text' className={classes.button} onClick={() => this.switchContent('datasets')} >
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
            <Content contentKey={this.state.contentKey} />
          </div>

        </div>
      </MuiThemeProvider>);
  }

}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

