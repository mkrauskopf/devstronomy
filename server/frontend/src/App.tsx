import React from 'react';
import {HashRouter as Router, Link, LinkProps, Route} from 'react-router-dom';

import {Planets} from './components/Planets';
import Datasets from './components/Datasets';
import Links from './links';

import PropTypes from 'prop-types';
import Button, {ButtonProps} from '@material-ui/core/Button';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import amber from '@material-ui/core/colors/amber';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LaunchIcon from '@material-ui/icons/Launch';
import {LocationDescriptor} from "history";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: grey[900] },
    secondary: { main: amber[500] },
  }
});

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  launchIcon: {
    width: 13,
    height: 13,
    color: 'white',
  },
});

const PlanetsContent = () => {
  return (
    <div>
      <div className='contentCenter'>
        This is an interactive version of <a href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/'>Planetary Fact
        Sheet</a> and <a href='https://ssd.jpl.nasa.gov/?sat_phys_par'>Planetary Satellite Physical Parameters</a>
        &nbsp;datasets from {Links.jpl}. See <Link to='/datasets'>datasets section</Link> for more details.
        <p>
          Tips: <span className='highlight'>Select the planet below</span> to see only its satellites
          or <span className='highlight'>click on the column</span> to sort.
        </p>
      </div>

      <hr/>
      <div className='content'>
        <span className='warning'>Note:</span> the following is not migrated from original satellite dataset yet:
        <ul>
          <li>For <em>Magnitude</em> column in satellites dataset V<sub>0</sub> or R are not distinguished.</li>
          <li>
            <em>Uncertainties</em> for some values. For example, for original value <code>13.70±0.04</code> in JPL
            dataset we have just <code>13.70</code> without <code>0.04</code> uncertainty.
          </li>
        </ul>
      </div>

      <hr/>
      <div className='planets'>
        <Planets/>
      </div>
    </div>
  );
};

const DatasetsContent = () => {
  return (
    <div className='datasets'>
      <Datasets/>
    </div>
  );
};

// TODO: I did not come up with a solution using `FunctionComponent`.
/** `MenuButton` button with React Router link. */
class RouteMenuButton<ButtonProps extends { route: LocationDescriptor }>
  extends React.Component<ButtonProps> {

  render() {
    return (
      // see https://github.com/mui-org/material-ui/issues/850#issuecomment-334118855 for 'Link' explanation.
      <MenuButton component={(linkProps: LinkProps) => <Link {...linkProps} to={this.props.route} />}
                  {...this.props}>
        {this.props.children}
      </MenuButton>)
  }

}

/** Menu button customised for Devstronomy. */
const MenuButton: React.FunctionComponent<ButtonProps> = (props) => {
  return <Button style={{color: 'white'}} variant='text' {...props}>{props.children}</Button>
};

const App = (props: { classes: any; }) => {

  const {classes} = props;

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div>
          <div className={classes.root}>
            <AppBar position='static'>
              <Toolbar variant='dense'>

                <RouteMenuButton className={classes.button} route='/planets'>Planets &amp; Satellites</RouteMenuButton>
                <RouteMenuButton className={classes.button} route='/datasets'>Datasets</RouteMenuButton>

                <div className={classes.grow} />

                <MenuButton className={classes.button}
                            target='_blank'
                            href='https://github.com/mkrauskopf/devstronomy/'>
                  GitHub&nbsp;<LaunchIcon className={classes.launchIcon} />
                </MenuButton>

              </Toolbar>
            </AppBar>
          </div>

          <Route path='/' exact component={PlanetsContent} />
          <Route path='/planets/' component={PlanetsContent} />
          <Route path='/datasets/' component={DatasetsContent} />

        </div>
      </MuiThemeProvider>
    </Router>
  );

};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
