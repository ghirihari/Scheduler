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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const EditPeriod = (props) => {
    const data = useContext(DataContext);   
    const subjects = data.Subject

    const start = {
        hours:parseInt(props.item.time.start.slice(0,props.item.time.start.indexOf(':'))),
        minutes:parseInt(props.item.time.start.slice(props.item.time.start.indexOf(':')+1,props.item.time.start.length))
    }
    const end = {
        hours:parseInt(props.item.time.end.slice(0,props.item.time.end.indexOf(':'))),
        minutes:parseInt(props.item.time.end.slice(props.item.time.end.indexOf(':')+1,props.item.time.end.length))
    }

    const [Id, setId] = useState(props.item.id)
    const Number = props.item.no;
    const [StartTime, setStartTime] = useState(new Date(2020,1,1,start.hours,start.minutes,0))
    const [EndTime, setEndTime] = useState(new Date(2020,1,1,end.hours,end.minutes,0))

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        props.setEdit(false);
        setOpen(false);
    };

    const editPeriod = () => {
        let start = StartTime.getHours()+":"+StartTime.getMinutes();
        let end = EndTime.getHours()+":"+EndTime.getMinutes();

        const old = JSON.parse(JSON.stringify(data.Schedule))
        old[props.day].period = old[props.day].period.filter(item=>item.no!==Number)
        old[props.day].period.push({no:old[props.day].period.length+1,id:Id,time:{start:start,end:end}})
        data.setSchedule(old)
        handleClose();
    }

    const deletePeriod = () => {
        const old = JSON.parse(JSON.stringify(data.Schedule))
        old[props.day].period = old[props.day].period.filter(item=>item.no!==Number)
        data.setSchedule(old)
        handleClose();

    }
    return (
        <div className={'edit-period-btn'}>
            {props.edit===true &&
                <IconButton onClick={handleClickOpen} style={{padding:'3px'}}>
                    <EditOutlinedIcon fontSize="medium" style={{color:'white'}}/>
                </IconButton>
            }
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle className="add-dialog" onClose={handleClose}>Edit Subject</DialogTitle>
                <DialogContent dividers className="add-dialog">
                <Autocomplete
                    onChange={(e,v)=> setId(v[0])} 
                    value={[Id,subjects[Id]]} 
                    options={Object.entries(subjects)} 
                    getOptionSelected={(option, value) => option[0] === value[0]}
                    getOptionLabel={(item) => item[1].name} 
                    renderInput={(params) => <TextField {...params} color="secondary" label="Subject" InputProps={{...params.InputProps, style:{ color: '#fff'}}} InputLabelProps={{style: { color: '#fff' }}}
                    fullWidth/>}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker value={StartTime} onChange={(time)=>setStartTime(time)} color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="normal" fullWidth  label="Start Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        <KeyboardTimePicker value={EndTime} onChange={(time)=>setEndTime(time)} color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="normal" fullWidth  label="End Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions className="add-dialog">
                    <Button onClick={handleClose} style={{color:'white'}}>Cancel</Button>
                    <Button onClick={deletePeriod} color="secondary">Delete</Button>
                    <Button onClick={editPeriod} variant="contained" color="secondary" >Save changes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditPeriod