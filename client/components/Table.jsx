import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/state.js';
// import Column from './Column.jsx';

const Table = (props) => {
  const { tables, storeTables } = useContext(DataContext);

  useEffect(() => {
    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        // storeTables(stateArr);
        console.log('tables before:', tables);

        const stateArr = [];
        for (let i = 0; i < tableNames.length; i++) {
          let nestedObj = {};
          nestedObj[tableNames[i]] = data[tableNames[i]];
          stateArr.push(nestedObj);
        }

        storeTables(stateArr);
        console.log('tables after:', tables);

        // setState(stateArr);
        // console.log('state', state);
      });
  });
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
};

export default Table;

// const Table = (props) => {
  // console.log(props.tableName, ': ', props.tableContent[props.tableName]);
  // console.log('props.tableName', props.tableName);
  // console.log('props.tableContent', props.tableContent.columns);
  // console.log('props.tableContent.length', Object.keys(props.tableContent.length))
  // console.log('length', Object.keys(props.tableContent).length)
  // console.log('column: ', props.tableContent.columns)

  // const tableColumns = [];

  // for (let i = 0; i < Object.keys(props.tableContent.columns).length; i++) {
  //   // const key = Object.keys(props.tableContent)[i];
  //   // const value = props.tableContent[i];

  //   const key = Object.keys(props.tableContent.columns)[i];
  //   const value = Object.values(props.tableContent.columns)[i];

  //   // console.log('key: ', key)
  //   // console.log('value: ', value)

  //   tableColumns.push(
  //     <Column 
  //       key={`Column${i}`}
  //       columnName={key}
  //       columnValue={value}
  //     />
  //   )
  // }
  
//   // console.log('tableColumns: ', tableColumns);
  
//   return (
//     <div>
//       <h2>
//         {props.tableName}
//       </h2>
//       {tableColumns}
//     </div>
//   )
// }

// export default Table;
