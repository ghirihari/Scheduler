import React from 'react'

// Matrial UI
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from "@material-ui/core";

// Icons
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';


const AddDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div className={'add-card'}>
            <div className={'subject-card'} style={{alignItems:'center'}}>
                <IconButton onClick={handleClickOpen}>
                    <AddIcon style={{color:'white'}} fontSize="large"/>
                </IconButton>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle className="add-dialog" onClose={handleClose}>Add Subject</DialogTitle>
                    <DialogContent dividers className="add-dialog">
                        <RadioGroup row name="position" defaultValue="top">
                            <FormControlLabel style={{color:'white'}} value="class" control={<Radio color="secondary"/>} label="Class" />
                            <FormControlLabel style={{color:'white'}} value="lab" control={<Radio color="secondary" />} label="Lab" />
                        </RadioGroup>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" id="name" label="Subject Name" type="email" fullWidth />
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" id="name" label="Subject ID" type="email" fullWidth/>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" id="name" label="Faculty" type="email" fullWidth/>
                        <TextField color="secondary" InputProps={{style: { color: '#fff' }}} InputLabelProps={{style: { color: '#fff' }}} margin="dense" id="name" label="Meet Link" type="email" fullWidth/>
                    </DialogContent>
                    <DialogActions className="add-dialog">
                        <Button onClick={handleClose} style={{color:'white'}}>Cancel</Button>
                        <Button onClick={handleClose} variant="contained" color="secondary">Save changes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AddDialog
