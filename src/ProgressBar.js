import React,{useContext,useEffect} from 'react'
import DataContext from './DataContext';
import LinearProgress from '@material-ui/core/LinearProgress';
// import StartSpeech from './assets/StartSpeech.mp3';

const MinuteToHours = (minutes) => {
    var h = Math.floor(minutes / 60);          
    var m = minutes % 60;
    if(h>0)return h+' hours '+m+' minutes';
    else return m+' minutes';
}
const ProgressBar = (props) => {
    const data = useContext(DataContext);    
    const currentMinute = data.CurrentMinute;
    const timer = data.Timer

    let start = {hour: parseInt(props.time.start.substring(0, props.time.start.indexOf(':'))), minute: parseInt(props.time.start.substring(props.time.start.indexOf(':')+1,props.time.length))};
    let end = {hour: parseInt(props.time.end.substring(0, props.time.end.indexOf(':'))), minute: parseInt(props.time.end.substring(props.time.end.indexOf(':')+1,props.time.length))};
    let startMinute = start.hour*60 + start.minute;
    let endMinute = end.hour*60 + end.minute;
    var progress;
    // const speech = {start:new Audio(StartSpeech)}

    useEffect(() => {
        const clock = setInterval(timer, 1000);
        return () => clearInterval(clock)
    })

    if(currentMinute>endMinute){
        return <div><h6>💯 Completed</h6></div>;
    }else if(currentMinute<startMinute){
        // if(startMinute-currentMinute===1){
        //     speech.start.play();
        //     console.log('Siund')
        // }
        return <div><h6>⏳ Starts in {MinuteToHours(startMinute-currentMinute)}</h6></div>
    }
    else{
        progress = ((currentMinute-startMinute)*(100/(endMinute-startMinute)))
        return(
            <div className="bar" style={{textAlign:'left'}}>
                <LinearProgress variant="determinate" color="secondary" value={progress} style={{height:'10px', borderRadius:'10px'}} />
            </div>
        )
    } 
}

export default ProgressBar