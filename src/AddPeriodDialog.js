import React,{useState,useContext} from 'react'
import DataContext from './DataContext';

// Matrial UI
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {MuiPickersUtilsProvider,KeyboardTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Icons
import AddIcon from '@material-ui/icons/Add';

const AddPeriodDialog = (props) => {
    const date = new Date();
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState('')
    const [StartTime, setStartTime] = useState(date)
    const [EndTime, setEndTime] = useState(date)
        
    const data = useContext(DataContext);    
    const subjects = data.Subject;
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const addPeriod = () => {
        var start = new Date(StartTime);
        var end = new Date(EndTime);

        var startStr = start.getHours()+':'+start.getMinutes();
        var endStr = end.getHours()+':'+end.getMinutes();
        data.setSchedule(props.day,Id,startStr,endStr)
        setOpen(false);
    }

    return (
        <div className={'card-period'} key={'Add'}>
            <div className="title-container">
                <IconButton onClick={handleClickOpen}>
                    <AddIcon style={{color:'white'}} fontSize="large"/>
                </IconButton>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle className="add-dialog" onClose={handleClose}>Add Period</DialogTitle>
                    <DialogContent dividers className="add-dialog">
                    <Autocomplete options={Object.entries(subjects)} getOptionLabel={(item) => item[1].name} fullWidth renderInput={(params) => <TextField {...params} color="secondary" label="Subject" InputProps={{...params.InputProps, style:{ color: '#fff'}}} InputLabelProps={{style: { color: '#fff' }}}/>}/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker value={StartTime} onChange={(time)=>setStartTime(time)} color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="normal" fullWidth  label="Start Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                          <KeyboardTimePicker value={EndTime} onChange={(time)=>setEndTime(time)} color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="normal" fullWidth  label="End Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions className="add-dialog">
                        <Button onClick={handleClose} style={{color:'white'}}>Cancel</Button>
                        <Button onClick={addPeriod} variant="contained" color="secondary">Save changes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AddPeriodDialog
