import React,{useState,useContext,useEffect} from 'react'
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
    const subject = data.Subject[props.item.id];
    const [NotifyTime, setNotifyTime] = useState(null);

    let start = {hour: parseInt(props.item.time.start.substring(0, props.item.time.start.indexOf(':'))), minute: parseInt(props.item.time.start.substring(props.item.time.start.indexOf(':')+1,props.item.time.length))};
    let end = {hour: parseInt(props.item.time.end.substring(0, props.item.time.end.indexOf(':'))), minute: parseInt(props.item.time.end.substring(props.item.time.end.indexOf(':')+1,props.item.time.length))};
    let startMinute = start.hour*60 + start.minute;
    let endMinute = end.hour*60 + end.minute;
    var progress;
    // const speech = {start:new Audio(StartSpeech)}

    useEffect(() => {
        const clock = setInterval(timer, 1000);
        return () => clearInterval(clock)
    })

    function notify() {
        if (Notification.permission !== 'granted')
         Notification.requestPermission();
        else {
         var notification = new Notification(subject.name, {
        //   icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: subject.faculty,
         });
         notification.onclick = function() {
          window.open(subject.meet);
         };
        }
    }

    if(currentMinute>endMinute){
        return <div><h6>💯 Completed</h6></div>;
    }else if(currentMinute<startMinute){
        // console.log(startMinute-currentMinute)
        if(startMinute-currentMinute===1 && currentMinute !== NotifyTime){
            setNotifyTime(currentMinute);
            notify()
        }
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
