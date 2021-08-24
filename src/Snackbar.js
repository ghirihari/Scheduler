import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function SnackBar(props) {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    if(props.message.text){
        return (
            <div key={props.message}>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={props.open} autoHideDuration={3000} onClose={()=>props.show(false)}>
                    <Alert onClose={()=>props.show(false)} severity={props.message.type}>
                        {props.message.text}
                    </Alert>
                </Snackbar>
            </div>
        );       
    }
    else{
        return <></>
    }
}
