import React, {useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import Click from './Action'
  function App() {
    const [select, setSelect] = useState([])
    const [grip, setGrip] = useState({})
   
  var gridOptions = {  
    columnDefs: [
    { headerName: 'Make', field: 'make',  checkboxSelection: true},
    { headerName: 'Model', field: 'model'},
    { headerName: 'Price', field: 'price'},
  ],
  rowData: [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 35000}
  ],
  onCellValueChanged: (params) => {
    console.log(params.value)
  },
  onRowSelected: (params) => {
    setSelect(params.api.getSelectedNodes())
  },
  onDataChanged: (params) => {
    console.log(params)
  },
}
    const onGridReady = (params) => {
      setGrip(params)
    }
   
    const remove = () => {
    const { api } = grip
    const data = select.map(rownode => {
        return rownode.data
      })
      // data[0].model = 'Linh'
      api.updateRowData({remove: data })
      // api.updateRowData({update: [data[0]] } )
      console.log(gridOptions.rowData)
    }

      return (
        <>
        <Click onDelete={remove} grip={grip} select={select}/>
        <div className="ag-theme-balham"
             style={{
               width: 1000,
               height: 600
             }} 
        >
         <AgGridReact 
            gridOptions={gridOptions}
            onGridReady={onGridReady}
            rowDataChangeDetectionStrategy='IdentityCheck'
            defaultColDef={{
              sortable: true,
              filter: true,
              headerComponentParams: {
                  menuIcon: 'fa-bars'
              },
              editable: true,
           
              
           }}
           pagination="true"
           paginationPageSize='10'
           rowSelection="multiple"
         />
    
        </div>
        </>
      )
    }
  
  
export default App;

