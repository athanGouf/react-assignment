import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from 'react-redux';
import { getPlots } from '../api/requests';
import EsaLogo from '../EsaLogo';
import { EsaButton, EsaList, EsaPaper, EsaSelect } from '../layouts/components';
import Dashboard from '../layouts/Dashboard/Dashboard';
import {
  SET_BAR_MODE,
  SET_ORIENTATION,
  SET_PLOT_DATA_HIST,
  SET_SELECTED_FORMATIONS_HIST,
  SET_SELECTED_LOGS_HIST,
  SET_SELECTED_WELLS_HIST
} from '../store/types';

const styles = theme => ({
  fullHeight: { height: '100%' },
  paper: {
    padding: theme.spacing(3)
  },
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
  button: { marginTop: theme.spacing(3), width: '100%' },
  plot: { width: '100%', height: '100%' }
});

const useStyles = makeStyles(styles);

export default function Histogram() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const barMode = useSelector(state => state.state.barMode);
  const orientation = useSelector(state => state.state.orientation);
  const wellList = useSelector(state => state.state.wells);
  const logsList = useSelector(state => state.state.logs);
  const formationList = useSelector(state => state.state.formations);
  const selectedWells = useSelector(state => state.state.selectedWellsHist);
  const selectedLogs = useSelector(state => state.state.selectedLogsHist);
  const selectedFormations = useSelector(state => state.state.selectedFormationsHist);
  const plotData = useSelector(state => state.state.plotDataHist);
  const [localData, setLocalData] = useState([]);

  const setBarMode = payload => dispatch({ type: SET_BAR_MODE, payload });

  const setOrientation = payload => dispatch({ type: SET_ORIENTATION, payload });

  const setSelectedWells = payload => dispatch({ type: SET_SELECTED_WELLS_HIST, payload });

  const setSelectedLogs = payload => dispatch({ type: SET_SELECTED_LOGS_HIST, payload });

  const setSelectedFormations = payload =>
    dispatch({ type: SET_SELECTED_FORMATIONS_HIST, payload });

  const setPlotData = useCallback(payload => dispatch({ type: SET_PLOT_DATA_HIST, payload }), [
    dispatch
  ]);

  const isDisabled = () =>
    selectedWells.length === 0 || selectedLogs.length === 0 || selectedFormations.length === 0;

  const createTraceArray = useCallback(
    data =>
      data.map(trace => ({
        ...trace,
        type: 'histogram',
        mode: 'lines',
        name: 'well ' + trace.wellId,
        orientation: orientation === 1 ? 'v' : 'h'
      })),
    [orientation]
  );

  useEffect(() => {
    if (localData.length === 0) return;
    setPlotData(createTraceArray(localData));
  }, [localData, setPlotData, createTraceArray]);

  const showPlot = () => {
    getPlots(selectedWells)
      .then(response => {
        setLocalData(response);
      })
      .catch(e => {
        console.log('There has been a problem with wells request: ' + e.message);
      });
  };

  const showLogo = useMemo(() => plotData.length === 0, [plotData]);

  const layout = () => ({ title: 'Wells Plot', barmode: barMode === 1 ? 'stack' : 'group' });

  return (
    <Dashboard>
      <Grid item xs={12} container className={classes.fullHeight}>
        <Grid item xs={6} container>
          <Grid item xs={12}>
            <Typography variant="body1">* Usage of Paper</Typography>
            <EsaPaper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <EsaSelect
                    label="Bar Mode"
                    value={barMode}
                    options={[
                      { key: 'one', value: 1, text: 'stack' },
                      { key: 'two', value: 2, text: 'group' }
                    ]}
                    onChange={value => setBarMode(value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EsaSelect
                    label="Orientation"
                    value={orientation}
                    options={[
                      { key: 'one', value: 1, text: 'vertical' },
                      { key: 'two', value: 2, text: 'horizontal' }
                    ]}
                    onChange={value => setOrientation(value)}
                  />
                </Grid>
              </Grid>
            </EsaPaper>
          </Grid>
          <Grid item xs={4} container>
            <EsaList
              list={wellList}
              selectedOptions={selectedWells}
              setSelect={setSelectedWells}
              title={'Wells'}
            />
          </Grid>
          <Grid item xs={4} container justify="center">
            <EsaList
              list={logsList}
              selectedOptions={selectedLogs}
              setSelect={setSelectedLogs}
              title={'Logs'}
            />
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <EsaList
              alignItems="flex-end"
              list={formationList}
              selectedOptions={selectedFormations}
              setSelect={setSelectedFormations}
              title={'Formations'}
            />
            <Grid item xs={11}>
              <EsaButton disabled={isDisabled()} className={classes.button} onClick={showPlot}>
                SHOW PLOT
              </EsaButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ paddingLeft: '1rem' }}>
          {showLogo ? (
            <div className={classes.logoContainer}>
              <EsaLogo />
            </div>
          ) : (
            <Plot data={plotData} layout={layout()} className={classes.plot} />
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
}
