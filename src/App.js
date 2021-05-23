import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import ExamplePage from './earthnet/ExamplePage';
import Wellbore from './earthnet/Wellbore';
import Histogram from './earthnet/Histogram';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { SET_FORMATIONS, SET_LOGS, SET_WELLS } from './store/types';
import { getFormations, getLogs, getWells } from './api/requests';

function App() {
  const dispatch = useDispatch();
  const setWells = useCallback(payload => dispatch({ type: SET_WELLS, payload }), [dispatch]);
  const setLogs = useCallback(payload => dispatch({ type: SET_LOGS, payload }), [dispatch]);
  const setFormations = useCallback(payload => dispatch({ type: SET_FORMATIONS, payload }), [
    dispatch
  ]);

  useEffect(() => {
    getWells()
      .then(response => {
        setWells(response);
      })
      .catch(e => {
        console.log('There has been a problem with wells request: ' + e.message);
      });
  }, [setWells]);

  useEffect(() => {
    getLogs()
      .then(response => {
        setLogs(response);
      })
      .catch(e => {
        console.log('There has been a problem with wells request: ' + e.message);
      });
  }, [setLogs]);

  useEffect(() => {
    getFormations()
      .then(response => {
        setFormations(response);
      })
      .catch(e => {
        console.log('There has been a problem with wells request: ' + e.message);
      });
  }, [setFormations]);

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact component={ExamplePage} />
          <Route path="/wellbore/" exact component={Wellbore} />
          <Route path="/histogram/" exact component={Histogram} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
