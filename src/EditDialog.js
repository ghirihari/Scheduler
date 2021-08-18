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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const EditDialog = (props) => {
    const data = useContext(DataContext);   
 
    const [open, setOpen] = useState(false);
    const [Name, setName] = useState(props.data[1].name)
    const [Id, setId] = useState(props.data[0])
    const [Faculty, setFaculty] = useState(props.data[1].faculty)
    const [Link, setLink] = useState(props.data[1].meet)
    const [Type, setType] = useState(props.data[1].type)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        props.setEdit(0);
        setOpen(false);
    };

    const addSub = () => {
        setOpen(false);
        data.appendSubjects(Id,Name,Faculty,Link,Type);  
    }  

    const removeFromSchedule = (Id) => {
        let NewSchedule = [...data.Schedule];
        NewSchedule.forEach(day => {
            let newPeriods = [...day.period]
            let newDay = newPeriods.filter(period => period.id!==Id);  
            day.period = newDay
        });
    }

    const deleteSub = () => {
        handleClose();
        removeFromSchedule(Id)
        const subs = {...data.Subject};
        delete subs[Id]
        data.setSubjects(subs);  
    }

    return (
        <div className={'edit-btn'}>
            {props.edit===1 &&
            <IconButton onClick={handleClickOpen}>
                <EditOutlinedIcon fontSize="medium" style={{color:'white'}}/>
            </IconButton>
            }
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle className="add-dialog" onClose={handleClose}>Edit Subject</DialogTitle>
                <DialogContent dividers className={"add-dialog "}>
                    <RadioGroup row name="position" defaultValue="top" value={Type} onChange={(e)=>setType(e.target.value)}>
                        <FormControlLabel style={{color:'white'}} value="class" control={<Radio color="secondary"/>} label="Class" />
                        <FormControlLabel style={{color:'white'}} value="lab" control={<Radio color="secondary" />} label="Lab" />
                    </RadioGroup>
                    <TextField color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" value={Name} label="Subject Name" fullWidth onChange={(e)=>setName(e.target.value)} />
                    <TextField color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" value={Id} disabled label="Subject ID" fullWidth onChange={(e)=>setId(e.target.value)}/>
                    <TextField color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" value={Faculty} label="Faculty" fullWidth onChange={(e)=>setFaculty(e.target.value)}/>
                    <TextField color="secondary" variant="filled" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" value={Link} label="Meet Link" fullWidth onChange={(e)=>setLink(e.target.value)}/>
                </DialogContent>
                <DialogActions className="add-dialog">
                    <Button onClick={handleClose} style={{color:'white'}}>Cancel</Button>
                    <Button onClick={deleteSub} color="secondary">Delete</Button>
                    <Button onClick={addSub} variant="contained" color="secondary">Save changes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditDialog
