import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './style.css';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [rowData, setRowData] = useState();

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

  useEffect(() => {
    fetch('https://data.binance.com/api/v3/ticker/24hr')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const convertedData = data.map(item => ({
          ...item,
          openTime: timestampToDateString(item.openTime),
          closeTime: timestampToDateString(item.closeTime)
        }));
        setRowData(convertedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

      });
  }, []);

  // Funkcija koja konvertuje Unix timestamp u datum
  const timestampToDateString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString();
  };

  return (
    <div className='app-container'>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default App;
