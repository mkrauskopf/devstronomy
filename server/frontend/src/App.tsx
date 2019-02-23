import React from 'react';
import {HashRouter as Router, Link, LinkProps, Route} from 'react-router-dom';

import HomeContent from "./components/pages/HomeContent";
import PlanetsContent from "./components/pages/PlanetsContent";
import DatasetsContent from './components/pages/DatasetsContent';

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

  const routeMenuButton = (route: LocationDescriptor, title: React.ReactNode) =>
    <RouteMenuButton className={classes.button} route={route}>{title}</RouteMenuButton>;

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div>
          <div className={classes.root}>
            <AppBar position='static'>
              <Toolbar variant='dense'>

                {routeMenuButton('/', 'Home')}
                {routeMenuButton('/planets', 'Planets & Satellites')}
                {routeMenuButton('/datasets', 'Datasets')}

                <div className={classes.grow} />

                <MenuButton className={classes.button}
                            target='_blank'
                            href='https://github.com/mkrauskopf/devstronomy/'>
                  GitHub&nbsp;<LaunchIcon className={classes.launchIcon} />
                </MenuButton>

              </Toolbar>
            </AppBar>
          </div>

          <Route path='/' exact component={HomeContent} />
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
