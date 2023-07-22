import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './style.css';
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [rowData, setRowData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://data.binance.com/api/v3/ticker/24hr')
      .then(response => {
        const data = response.data;
        const convertedData = data.map(item => ({
          ...item,
          openTime: convertTimestampToDateString(item.openTime),
          closeTime: convertTimestampToDateString(item.closeTime)
        }));
        setRowData(convertedData);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'symbol', filter: true },
    { field: 'priceChange', filter: true },
    { field: 'priceChangePercent', filter: true },
    { field: 'weightedAvgPrice', filter: true },
    { field: 'prevClosePrice', filter: true },
    { field: 'lastPrice', filter: true },
    { field: 'lastQty', filter: true },
    { field: 'bidPrice', filter: true },
    { field: 'bidQty', filter: true },
    { field: 'askPrice', filter: true },
    { field: 'askQty', filter: true },
    { field: 'openPrice', filter: true },
    { field: 'highPrice', filter: true },
    { field: 'lowPrice', filter: true },
    { field: 'volume', filter: true },
    { field: 'quoteVolume', filter: true },
    { field: 'openTime', filter: true, width: 250 },
    { field: 'closeTime', filter: true, width: 250 },
    { field: 'firstId', filter: true },
    { field: 'lastId', filter: true },
    { field: 'count', filter: true },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true
  }));




  // Funkcija koja konvertuje Unix timestamp u datum
  const convertTimestampToDateString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString();
  };

  return (
    <div className='app-container'>
      {error ? (
        <div className='error-container'>Error fetching data: {error.message}</div>
      ) : (
        <div className="ag-theme-alpine grid-container">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            animateRows={true}
          />
        </div>
      )}
    </div>
  );
};

export default App;
