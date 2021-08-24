import React,{useState,useContext} from 'react'
import DataContext from './DataContext';
import ThemeContext from './ThemeContext';

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
import { makeStyles } from '@material-ui/core/styles';

// Icons
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    LightTextfield:{
        color: 'black',
        backgroundColor:'white'
    },
    LightTextfieldLabel:{
        backgroundColor:'transparent'
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

const AddDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [Name, setName] = useState('')
    const [Id, setId] = useState(props.length)
    const [Faculty, setFaculty] = useState('')
    const [Link, setLink] = useState('')
    const [Type, setType] = useState('class')
    
    const data = useContext(DataContext);    
    const Theme = useContext(ThemeContext);       
    const classes = useStyles();

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const addSub = () => {
        setOpen(false);
        data.appendSubjects(Id,Name,Faculty,Link,Type);  
        data.setMessage('info','Subject Added')
    }  

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

    return (
        <div className={'add-card'}>
            <div className={'subject-card'} style={{alignItems:'center'}}>
                <IconButton onClick={handleClickOpen}>
                    <AddIcon style={{color:plus}} fontSize="large"/>
                </IconButton>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle className={theme.Dialog} onClose={handleClose}>Add Subject</DialogTitle>
                    <DialogContent dividers className={theme.Dialog}>
                        <RadioGroup row name="position" defaultValue="top" value={Type} onChange={(e)=>setType(e.target.value)}>
                            <FormControlLabel className={theme.Textfield} value="class" control={<Radio color="secondary"/>} label="Class" />
                            <FormControlLabel className={theme.Textfield} value="lab" control={<Radio color="secondary" />} label="Lab" />
                        </RadioGroup>
                        <TextField variant="filled" value={Name} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="dense" label="Subject Name" fullWidth onChange={(e)=>setName(e.target.value)} />
                        <TextField variant="filled" value={Id} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="dense" label="Subject ID" fullWidth onChange={(e)=>setId(e.target.value)}/>
                        <TextField variant="filled" value={Faculty} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="dense" label="Faculty" fullWidth onChange={(e)=>setFaculty(e.target.value)}/>
                        <TextField variant="filled" value={Link} color="secondary" InputProps={{className:theme.TextField}} InputLabelProps={{className:theme.TextFieldLabel}} margin="dense" label="Meet Link" fullWidth onChange={(e)=>setLink(e.target.value)}/>
                    </DialogContent>
                    <DialogActions className={theme.Dialog}>
                        <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                        <Button onClick={addSub} variant="contained" color="secondary">Save changes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AddDialog
