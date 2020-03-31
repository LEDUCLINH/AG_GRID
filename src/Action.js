import React, { useState } from 'react';

const Click = (props) => {
    const [values, setValue] = useState({make: '', model: '', price: ''})
    const [check, setcheck] = useState(false)
    const [ok, setOk] = useState(false)
    const handleChage = e => {
        const {name, value} = e.target
        setValue(preValue => ({
            ...preValue,
            [name]: value
        }))
    }
    
    const add = input => {
        if (!values.make || !values.model || !values.price) return 
        const { api } = props.grip
        api.updateRowData({add: [input] })
        setValue({make: '', model: '', price: ''})
      }
 
    const view = () => {
        setValue(props.select[0].data)
        setcheck(true)
        setOk(true)
    }  
    const oke = () => {
        setcheck(false)
        setValue({make: '', model: '', price: ''})
        setOk(false)
    }
    return (
         <div>
             <button onClick={() => add(values)}>Add</button>
          { props.select.length>0 && 
             <button onClick={() => props.onDelete()}>Delete</button>
            }
          { props.select.length===1 && 
             <button onClick={view}>View</button>
            }
            {
                props.select.length===1 && ok && 
             <button onClick={oke}>Oke</button>
            }
              <form>
                 <input name="make" 
                onChange={handleChage}
                value={values.make}
                disabled={check}
            />
            <input name="model" 
                onChange={handleChage}
                value={values.model}
                disabled={check}
            />
            <input name="price" 
                onChange={handleChage}
                value={values.price}
                disabled={check}
            />
        </form>
       
         <style jsx="true">{`
         input[disabled]{
             cursor: not-allowed
         }
         `}</style>
        </div>
    );
}

export default Click;
