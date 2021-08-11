import React from 'react';
import Button from '@material-ui/core/Button';
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'
import LinearProgress from '@material-ui/core/LinearProgress';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

const currentPeriod = (schedule, today) => {
    var thedate = new Date(); 
    var hour = (thedate.getHours())*60; 
    var minute = thedate.getMinutes();
    var currentMinute = hour+minute;
    var current;

    schedule.forEach(item=>
    {
        if(item.day===today){
            item.period.every((item,index)=> {
                // let start = {hour: parseInt(item.time.start.substring(0, item.time.start.indexOf(':'))), minute: parseInt(item.time.start.substring(item.time.start.indexOf(':')+1,item.time.length))};
                let end = {hour: parseInt(item.time.end.substring(0, item.time.end.indexOf(':'))), minute: parseInt(item.time.end.substring(item.time.end.indexOf(':')+1,item.time.length))};
                // let startMinute = start.hour*60 + start.minute;
                let endMinute = end.hour*60 + end.minute;
                if(currentMinute<=endMinute){
                    current = item;
                    return false;
                }
                return true;
            })
        }
    })
    return current;
}

const ProgressBar = (props) => {
    var thedate = new Date(); 
    var hour = (thedate.getHours())*60; 
    var minute = thedate.getMinutes();
    var currentMinute = hour+minute;

    let start = {hour: parseInt(props.time.start.substring(0, props.time.start.indexOf(':'))), minute: parseInt(props.time.start.substring(props.time.start.indexOf(':')+1,props.time.length))};
    let end = {hour: parseInt(props.time.end.substring(0, props.time.end.indexOf(':'))), minute: parseInt(props.time.end.substring(props.time.end.indexOf(':')+1,props.time.length))};
    let startMinute = start.hour*60 + start.minute;
    let endMinute = end.hour*60 + end.minute;
    var progress;
    if(currentMinute>endMinute)progress=100;
    else progress = ((currentMinute-startMinute)*(100/(endMinute-startMinute)))

    return(
        <div className="bar" style={{textAlign:'center'}}>
            <LinearProgress variant="determinate" color="secondary" value={progress} />
        </div>
    )
}

export default function SubjectCard(props) {
    let titleIcon = props.subjects[props.item.id].type==="lab"?Laptop:Book;
    let start = parseInt(props.item.time.start.substring(0, props.item.time.start.indexOf(':')))%12+props.item.time.start.substring(props.item.time.start.indexOf(':'),props.item.time.start.length)
    let end = parseInt(props.item.time.end.substring(0, props.item.time.end.indexOf(':')))%12+props.item.time.end.substring(props.item.time.end.indexOf(':'),props.item.time.end.length)
    
    const today = props.days[(new Date().getDay())-1];
    let current = currentPeriod(props.schedule,today)
    return(
        <div className={props.item===current?'card-1 nowCard':'card-1'} key={props.item.id}>
            <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
            <div className="title-container">
                <label className="class-title">{props.subjects[props.item.id].name}</label>
            </div>
            <ProgressBar time={props.item.time}/>
            <h6>⏰ {today}, {start} - {end}</h6>
            <h6>👨‍🏫 {props.subjects[props.item.id].faculty}</h6>
            <Button className={props.item===current?'button-current':'button'} onClick={()=>openInNewTab(props.subjects[props.item.id].meet)} variant="contained">Join</Button>
        </div>                             
    )
}
