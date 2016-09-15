import { createSelector } from 'reselect';


export function getCmmData(state) {
  return state.cmmData;
}

export function getCmmDataList(state) {
  return getCmmData(state).list;
}

export function getCmmDataFilter(state) {
  return getCmmData(state).filter;
}
export function getCmmDataEmployees(state) {
  return state.empoyees;
}

export function getCmmDataEmpoyeesList(state) {
  return getCmmDataEmployees(state).list;
}
export function getCmmDataRegex(state) {
  return getCmmData(state).regex;
}
export function getCmmDataSearchValue(state) {
  return getCmmData(state).searchvalue;
}
export function getCmmDataEmpoyeesFilter(state) {
  return getCmmDataEmployees(state).filter;
}


  // const regex = new RegExp('.*' + escapedValue, 'i');
  // cmmobj.filter(cmmobj => regex.test(cmmobj.name)

// export const getCmmDataEmpoyeeNames = createSelector(
//
//     getCmmDataEmpoyeeList,
//     getCmmDataEmpoyeeFilter,
//     (data, filter) => {
//       switch (filter) {
//         case 'names':
//           return data.filter(data.state.regex => data.names);
//
//         case 'regex':
//           return data.regexresuts;
//
//         case 'services':
//           return cmmdata.filter(cmmdata => cmmdata.services);
//
//         default:
//           return cmmdata;
//       }
//     }
// );
//

//=====================================
//  MEMOIZED SELECTORS\\\
//-------------------------------------

export const getCmmDataTypes = createSelector(
  getCmmDataList,
  getCmmDataFilter,
  (cmmdata, filter) => {
    switch (filter) {
      case 'employees':
        return cmmdata.filter(cmmdata => cmmdata.employees);

      case 'jobs':
        return cmmdata.filter(cmmdata => cmmdata.jobs);

      case 'services':
        return cmmdata.filter(cmmdata => cmmdata.services);

      default:
        return cmmdata;
    }
  }
);
