import React, {useState, useContext} from 'react'
import DataContext from './DataContext';

// Matrial UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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
        <div style={{margin:'10px'}}>
            <div style={{display: 'flex', justifyContent:' space-evenly',backgroundColor:'#303030'}}>
                <div style={{display: 'flex',flexDirection:'column'}}>
                    <div style={{display:'flex'}}>
                        <TextField value={User} onChange={(e)=>setUser(e.target.value)} color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Set Auth User" />
                        <Button onClick={()=>addAuthUser()} variant="contained" color="secondary" style={{flexGrow:'1',margin:'10px'}}>Add</Button>
                    </div>
                    <div style={{display:'flex'}}>
                        <TextField value={Data} onChange={(e)=>setData(e.target.value)} color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Add Data" />
                        <Button onClick={()=>addData()} variant="contained" color="secondary" style={{flexGrow:'1',margin:'10px'}} >Import</Button>
                    </div>
                    <div style={{display:'flex'}}>
                        <Button onClick={()=>exportData()} variant="contained" color="secondary" style={{flexGrow:'1',margin:'10px'}} fullWidth>Export Data <FileCopyIcon fontSize="small" style={{marginLeft:'10px'}}/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
