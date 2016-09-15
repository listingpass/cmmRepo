import { Cmmdata } from 'src/core/cmmdata';
import { getDeletedCmmdata } from './selectors';
import { cmmdataList } from './cmmdata-list';
import {
  LOAD_CMMDATA_EMPLOYEES_SUCCESS,
  LOAD_CMMDATA_JOBS_SUCCESS,
  LOAD_CMMDATA_SERVICES_SUCCESS,
  FILTER_CMMDATA,
  LOAD_CMMDATA_SUCCESS,
  UNLOAD_CMMDATA_SUCCESS,
  UNLOAD_CMMDATA_EMPLOYEES_SUCCESS,
  UNLOAD_CMMDATA_JOBS_SUCCESS,
  UNLOAD_CMMDATA_SERVICES_SUCCESS
} from './action-types';

export function setupCmmdataWith(employees, jobs, services, key) {
    return new Cmmdata({employees: employees, jobs: jobs, services: services, key: key})
}
export function setupNewCmmdata() {
  return new Cmmdata({employees: null, jobs: null, services: null})
}

export function filterCmmdata(filterType) {
  return {
    type: FILTER_CMMDATA,
    payload: {filterType}
  };
}

export function loadCmmdata() {
  return (dispatch, getState) => {
    const { auth } = getState();
    cmmdataList.path = `cmmdata`;
    cmmdataList.subscribe(dispatch);
  };
}
export function loadCmmdataSuccess(cmmdata) {

  return {
    type: LOAD_CMMDATA_SUCCESS,
    payload: cmmdata
  };
}

export function unloadCmmdata() {
  cmmdataList.unsubscribe();
  return {
    type: UNLOAD_CMMDATA_SUCCESS
  };
}
export function loadCmmdataJobs() {
  return (dispatch, getState) => {
    const { auth } = getState();
    cmmdataList.path = `cmmdata/jobs`;
    cmmdataList.subscribe(dispatch);
  };
}
export function loadCmmdataJobsSuccess(jobsdata) {
  return {
    type: LOAD_CMMDATA_JOBS_SUCCESS,
    payload: jobsdata
  };
}

export function unloadCmmdataJobs() {
  cmmdataList.unsubscribe();
  return {
    type: UNLOAD_CMMDATA_JOBS_SUCCESS
  };
}
export function loadCmmdataEmployees() {
  return (dispatch, getState) => {
    const { auth } = getState();
    cmmdataList.path = `cmmdata/employees`;
    cmmdataList.subscribe(dispatch);
  };
}
export function loadCmmdataEmployeesSuccess(employeeData) {
  return {
    type: LOAD_CMMDATA_EMPLOYEES_SUCCESS,
    payload: employeeData
  };
}

export function unloadCmmdataEmployees() {
  cmmdataList.unsubscribe();
  return {
    type: UNLOAD_CMMDATA_EMPLOYEES_SUCCESS
  };
}
export function loadCmmdataServices() {
  return (dispatch, getState) => {
    const { auth } = getState();
    cmmdataList.path = `cmmdata/service_item_list`;
    cmmdataList.subscribe(dispatch);
  };
}
export function loadCmmdataServicesSuccess(serviceData) {
  return {
    type: LOAD_CMMDATA_SERVICES_SUCCESS,
    payload: serviceData
  };
}

export function unloadCmmdataServices() {
  cmmdataList.unsubscribe();
  return {
    type: UNLOAD_CMMDATA_SERVICES_SUCCESS
  };
}
