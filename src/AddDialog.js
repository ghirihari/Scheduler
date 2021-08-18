import React,{useState,useContext} from 'react'
import DataContext from './DataContext';

// Matrial UI
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Icons
import AddIcon from '@material-ui/icons/Add';

const AddDialog = () => {
    const [open, setOpen] = useState(false);
    const [Name, setName] = useState('')
    const [Id, setId] = useState('')
    const [Faculty, setFaculty] = useState('')
    const [Link, setLink] = useState('')
    const [Type, setType] = useState('class')
    
    const data = useContext(DataContext);    

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const addSub = () => {
        setOpen(false);
        data.appendSubjects(Id,Name,Faculty,Link,Type);  
    }  

    return (
        <div className={'add-card'}>
            <div className={'subject-card'} style={{alignItems:'center'}}>
                <IconButton onClick={handleClickOpen}>
                    <AddIcon style={{color:'white'}} fontSize="large"/>
                </IconButton>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle className="add-dialog" onClose={handleClose}>Add Subject</DialogTitle>
                    <DialogContent dividers className="add-dialog">
                        <RadioGroup row name="position" defaultValue="top" value={Type} onChange={(e)=>setType(e.target.value)}>
                            <FormControlLabel style={{color:'white'}} value="class" control={<Radio color="secondary"/>} label="Class" />
                            <FormControlLabel style={{color:'white'}} value="lab" control={<Radio color="secondary" />} label="Lab" />
                        </RadioGroup>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Subject Name" fullWidth onChange={(e)=>setName(e.target.value)} />
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Subject ID" fullWidth onChange={(e)=>setId(e.target.value)}/>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Faculty" fullWidth onChange={(e)=>setFaculty(e.target.value)}/>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" label="Meet Link" fullWidth onChange={(e)=>setLink(e.target.value)}/>
                    </DialogContent>
                    <DialogActions className="add-dialog">
                        <Button onClick={handleClose} style={{color:'white'}}>Cancel</Button>
                        <Button onClick={addSub} variant="contained" color="secondary">Save changes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AddDialog
