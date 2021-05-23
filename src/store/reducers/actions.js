import * as types from '../types';
import { SET_FORMATIONS, SET_LOGS, SET_PLOT_DATA, SET_SELECTED_FORMATIONS, SET_SELECTED_LOGS, SET_SELECTED_WELLS, SET_WELLS } from '../types';

const INITIAL_STATE = {
  wells:[],
  logs: [],
  formations: [],
  selectedWells: [],
  selectedLogs: [],
  selectedFormations: [], 
  plotData: []
};

const setWells = (state, {payload}) => ({
  ...state,
  wells: payload
});
const setLogs = (state, {payload}) => ({
  ...state,
  logs: payload.map(log => ({...log, name: log.log}))
});
const setFormations = (state, {payload}) => ({
  ...state,
  formations: payload
});

const setSelectedWells = (state, {payload}) => ({
  ...state,
  selectedWells: payload
});

const setSelectedLogs = (state, {payload}) => ({
  ...state,
  selectedLogs: payload
});

const setSelectedFormations = (state, {payload}) => ({
  ...state,
  selectedFormations: payload
});
const setPlotData = (state, {payload}) => ({
  ...state,
  plotData: payload
});


const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WELLS:
      return setWells(state, action)
    case SET_LOGS:
      return setLogs(state, action)
    case SET_FORMATIONS:
      return setFormations(state, action)
    case SET_SELECTED_WELLS: 
      return setSelectedWells(state, action)
    case SET_SELECTED_LOGS: 
      return setSelectedLogs(state, action)
    case SET_SELECTED_FORMATIONS: 
      return setSelectedFormations(state, action)
    case SET_PLOT_DATA: 
      return setPlotData(state, action)
    default:
      return state;
  }
};

export default actionsReducer;
