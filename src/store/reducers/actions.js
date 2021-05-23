import {
  SET_BAR_MODE,
  SET_FORMATIONS,
  SET_LOGS,
  SET_ORIENTATION,
  SET_PLOT_DATA,
  SET_PLOT_DATA_HIST,
  SET_SELECTED_FORMATIONS,
  SET_SELECTED_FORMATIONS_HIST,
  SET_SELECTED_LOGS,
  SET_SELECTED_LOGS_HIST,
  SET_SELECTED_WELLS,
  SET_SELECTED_WELLS_HIST,
  SET_WELLS
} from '../types';

const INITIAL_STATE = {
  wells: [],
  logs: [],
  formations: [],
  selectedWells: [],
  selectedLogs: [],
  selectedFormations: [],
  plotData: [],
  selectedWellsHist: [],
  selectedLogsHist: [],
  selectedFormationsHist: [],
  plotDataHist: [],
  barMode: 1,
  orientation: 1
};

const setWells = (state, { payload }) => ({
  ...state,
  wells: payload
});
const setLogs = (state, { payload }) => ({
  ...state,
  logs: payload.map(log => ({ ...log, name: log.log }))
});
const setFormations = (state, { payload }) => ({
  ...state,
  formations: payload
});

const setSelectedWells = (state, { payload }) => ({
  ...state,
  selectedWells: payload
});

const setSelectedLogs = (state, { payload }) => ({
  ...state,
  selectedLogs: payload
});

const setSelectedFormations = (state, { payload }) => ({
  ...state,
  selectedFormations: payload
});

const setPlotData = (state, { payload }) => ({
  ...state,
  plotData: payload
});

const setSelectedWellsHist = (state, { payload }) => ({
  ...state,
  selectedWellsHist: payload
});

const setSelectedLogsHist = (state, { payload }) => ({
  ...state,
  selectedLogsHist: payload
});

const setSelectedFormationsHist = (state, { payload }) => ({
  ...state,
  selectedFormationsHist: payload
});

const setPlotDataHist = (state, { payload }) => ({
  ...state,
  plotDataHist: payload
});

const setBarMode = (state, { payload }) => ({
  ...state,
  barMode: payload
});

const setOrientation = (state, { payload }) => ({
  ...state,
  orientation: payload
});

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WELLS:
      return setWells(state, action);
    case SET_LOGS:
      return setLogs(state, action);
    case SET_FORMATIONS:
      return setFormations(state, action);
    case SET_SELECTED_WELLS:
      return setSelectedWells(state, action);
    case SET_SELECTED_LOGS:
      return setSelectedLogs(state, action);
    case SET_SELECTED_FORMATIONS:
      return setSelectedFormations(state, action);
    case SET_PLOT_DATA:
      return setPlotData(state, action);
    case SET_SELECTED_WELLS_HIST:
      return setSelectedWellsHist(state, action);
    case SET_SELECTED_LOGS_HIST:
      return setSelectedLogsHist(state, action);
    case SET_SELECTED_FORMATIONS_HIST:
      return setSelectedFormationsHist(state, action);
    case SET_PLOT_DATA_HIST:
      return setPlotDataHist(state, action);
    case SET_BAR_MODE:
      return setBarMode(state, action);
    case SET_ORIENTATION:
      return setOrientation(state, action);
    default:
      return state;
  }
};

export default actionsReducer;
