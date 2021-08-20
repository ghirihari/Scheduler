import React, {useState, useContext} from 'react'
import DataContext from './DataContext';

// Matrial UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Settings = () => {
    const data = useContext(DataContext);   
    const [User, setUser] = useState(localStorage.user)
    const [Data, setData] = useState("");
    
    const addAuthUser = () => {
        localStorage.user = User;
    }

    const addData = () => {
        localStorage.data = Data;
        data.reloadData()
    }

    const exportData = () => {
        navigator.clipboard.writeText(localStorage.data).then(function() {
            console.log("clipboard successfully set")
          }, function() {
            console.log("clipboard write failed")
          });
    }

    return (
        <div className="settings-tab">
            <div className='settings-card'>
                <div style={{display: 'flex',flexDirection:'column'}}>
                    <div style={{display:'flex'}}>
                        <TextField value={User} onChange={(e)=>setUser(e.target.value)} color="secondary" variant="filled" InputProps={{className:'textfield'}} InputLabelProps={{className:'textfield'}} margin="dense" label="Set Auth User" />
                        <Button className='button-style' onClick={()=>addAuthUser()} variant="contained" style={{flexGrow:'1',margin:'10px'}}>Add</Button>
                    </div>
                    <div style={{display:'flex'}}>
                        <TextField value={Data} onChange={(e)=>setData(e.target.value)} color="secondary" variant="filled" InputProps={{className:'textfield'}} InputLabelProps={{className:'textfield'}} margin="dense" label="Add Data" />
                        <Button className='button-style' onClick={()=>addData()} variant="contained"  style={{flexGrow:'1',margin:'10px'}} >Import</Button>
                    </div>
                    <div style={{display:'flex'}}>
                        <Button className='button-style'  onClick={()=>exportData()} variant="contained" fullWidth>Export Data 📋</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
