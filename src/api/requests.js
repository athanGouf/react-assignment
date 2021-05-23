const URL_BASE = 'http://localhost:8000/';
const WELLS = 'wells';
const LOGS = 'logs';
const FORMATIONS = 'formations';
const PLOTS = 'plots';

async function get(endPoint) {
  const response = await fetch(URL_BASE + endPoint);
  if (response.status != 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const getWells = () => get(WELLS);
export const getLogs = () => get(LOGS);
export const getFormations = () => get(FORMATIONS);
export const getPlots = wells => {
  let queryString = wells
    .map(well => well.id)
    .reduce((string, id, i) => {
      if (i === 0) return string + id;
      return string + '&wellId=' + id;
    }, '?wellId=');
  return get(PLOTS + queryString);
};
