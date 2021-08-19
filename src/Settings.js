import React, {useState} from 'react'

// Matrial UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Settings = () => {
    const [User, setUser] = useState(localStorage.user)
    const [Data, setData] = useState(null);
    
    const addAuthUser = () => {
        localStorage.user = User;
    }

    const addData = () => {
        localStorage.Data = Data;
    }

    return (
        <div style={{margin:'10px'}}>
            <div style={{display: 'flex', justifyContent:' space-evenly',backgroundColor:'#303030'}}>
                <div style={{display: 'flex',flexDirection:'column'}}>
                    <div>
                        <TextField value={User} onChange={(e)=>setUser(e.target.value)} color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Set Auth User" />
                        <Button onClick={()=>addAuthUser()} variant="contained" color="secondary" style={{margin:'10px'}}>Add</Button>
                    </div>
                    <div>
                        <TextField value={Data} onChange={(e)=>setData(e.target.value)} color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Set Auth User" />
                        <Button onClick={()=>addData()} variant="contained" color="secondary" style={{margin:'10px'}}>Add</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
