import React,{useState,useContext} from 'react'
import DataContext from './DataContext';
import ThemeContext from './ThemeContext';

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
import { makeStyles } from '@material-ui/core/styles';

// Icons
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    LightTextfield:{
        color: 'black',
        // backgroundColor:'white'
    },
    LightTextfieldLabel:{
        backgroundColor:'transparent',
    },
    LightDialog: {
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
    },
    DarkTextfield:{
        color: 'white',
        // backgroundColor:'black'
    },
    DarkTextfieldLabel:{
        color:'white',
        // backgroundColor:'black'
    },
    DarkDialog: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#303030',
    }    
});

const AddPeriodDialog = (props) => {
    const date = new Date();
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState('')
    const [StartTime, setStartTime] = useState(date)
    const [EndTime, setEndTime] = useState(date)

    const data = useContext(DataContext);    
    const Theme = useContext(ThemeContext);
    const classes = useStyles();

    const subjects = data.Subject;
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    let theme,plus;
    if(Theme==='🌕'){
        plus = "black";
        theme = {
            Dialog:classes.LightDialog,
            TextField:classes.LightTextfield,
            TextFieldLabel:classes.LightTextfieldLabel
        }
    }else{
        plus="white";
        theme = {
            Dialog:classes.DarkDialog,
            TextField:classes.DarkTextfield,
            TextFieldLabel:classes.DarkTextfieldLabel
        }
    }

    const addPeriod = () => {
        var start = new Date(StartTime);
        var end = new Date(EndTime);

        var startStr = start.getHours()+':'+start.getMinutes();
        var endStr = end.getHours()+':'+end.getMinutes();

        const old = JSON.parse(JSON.stringify(data.Schedule))
        old[props.day].period.push({no:old[props.day].period.length+1, id:Id,time:{start:startStr,end:endStr}})
        data.setSchedule(old)
        setOpen(false);
        data.setMessage('info','Period Added')
    }

    return (
        <div>
            <div className={'card-period'} key={'Add'} onClick={handleClickOpen}>
                <div className="title-container">
                    <IconButton>
                        <AddIcon style={{color:plus}} fontSize="large"/>
                    </IconButton>
                </div>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle className={theme.Dialog} onClose={handleClose}>Add Period</DialogTitle>
                <DialogContent dividers className={theme.Dialog}>
                <Autocomplete 
                    onChange={(e,v)=> setId(v[0])} 
                    options={Object.entries(subjects)} 
                    getOptionSelected={(option, value) => option[0] === value[0]}
                    getOptionLabel={(item) => item[1].name} fullWidth 
                    renderInput={(params) => <TextField {...params} color="secondary" label="Subject" InputProps={{...params.InputProps, className:theme.TextField}} InputLabelProps={{...params.InputProps,className:theme.TextFieldLabel}}/>}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker value={StartTime} onChange={(time)=>setStartTime(time)} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="normal" fullWidth  label="Start Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                        <KeyboardTimePicker value={EndTime} onChange={(time)=>setEndTime(time)} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="normal" fullWidth  label="End Time" KeyboardButtonProps={{'aria-label': 'change time'}}/>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions className={theme.Dialog}>
                    <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                    <Button onClick={addPeriod} variant="contained" color="secondary">Save changes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddPeriodDialog
