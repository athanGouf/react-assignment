import { Grid, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from 'react-redux';
import { getPlots } from '../api/requests';
import EsaLogo from '../EsaLogo';
import { EsaButton, EsaList } from '../layouts/components';
import Dashboard from '../layouts/Dashboard/Dashboard';
import {
  SET_PLOT_DATA,
  SET_SELECTED_FORMATIONS,
  SET_SELECTED_LOGS,
  SET_SELECTED_WELLS
} from '../store/types';

const styles = theme => ({
  fullHeight: { height: '100%' },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
  button: { marginTop: theme.spacing(3), width: '100%' }
});
const useStyles = makeStyles(styles);

export default function Wellbore() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wellList = useSelector(state => state.state.wells);
  const logsList = useSelector(state => state.state.logs);
  const formationList = useSelector(state => state.state.formations);
  const selectedWells = useSelector(state => state.state.selectedWells);
  const selectedLogs = useSelector(state => state.state.selectedLogs);
  const selectedFormations = useSelector(state => state.state.selectedFormations);
  const plotData = useSelector(state => state.state.plotData);

  const setSelectedWells = payload => dispatch({ type: SET_SELECTED_WELLS, payload });
  const setSelectedLogs = payload => dispatch({ type: SET_SELECTED_LOGS, payload });
  const setSelectedFormations = payload => dispatch({ type: SET_SELECTED_FORMATIONS, payload });
  const setPlotData = payload => dispatch({ type: SET_PLOT_DATA, payload });

  const isDisabled = () =>
    selectedWells.length === 0 || selectedLogs.length === 0 || selectedFormations.length === 0;

  const showPlot = () => {
    getPlots(selectedWells)
      .then(response => {
        let data = response.map(trace => ({
          ...trace,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'well ' + trace.wellId
        }));

        setPlotData(data);
      })
      .catch(e => {
        console.log('There has been a problem with wells request: ' + e.message);
      });
  };

  const showLogo = useMemo(() => plotData.length === 0, [plotData]);

  return (
    <Dashboard>
      <Grid item xs={12} container className={classes.fullHeight}>
        <Grid item xs={6} container>
          <Grid item xs={4}>
            <EsaList
              list={wellList}
              selectedOptions={selectedWells}
              setSelect={setSelectedWells}
              title={'Wells'}
            />
          </Grid>
          <Grid item xs={4}>
            <EsaList
              list={logsList}
              selectedOptions={selectedLogs}
              setSelect={setSelectedLogs}
              title={'Logs'}
            />
          </Grid>
          <Grid item xs={4}>
            <EsaList
              list={formationList}
              selectedOptions={selectedFormations}
              setSelect={setSelectedFormations}
              title={'Formations'}
            />
            <Grid item xs={10}>
              <EsaButton disabled={isDisabled()} className={classes.button} onClick={showPlot}>
                SHOW PLOT
              </EsaButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {showLogo ? (
            <div className={classes.logoContainer}>
              <EsaLogo />
            </div>
          ) : (
            <Plot data={plotData} layout={{ height: '100%', width: '100%', title: 'Wells Plot' }} />
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
}
