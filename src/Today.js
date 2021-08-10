import React from 'react'
import Button from '@material-ui/core/Button';
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'
import LinearProgress from '@material-ui/core/LinearProgress';

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
        <div className="bar">
            <LinearProgress variant="determinate" color="secondary" value={progress} />
        </div>
    )
}
const currentPeriod = (schedule, today) => {
    var thedate = new Date(); 
    var hour = (thedate.getHours())*60; 
    var minute = thedate.getMinutes();
    var currentMinute = hour+minute;

    var current,progress;

    schedule.forEach(item=>
    {
        if(item.day===today){
            item.period.every((item,index)=> {
                let start = {hour: parseInt(item.time.start.substring(0, item.time.start.indexOf(':'))), minute: parseInt(item.time.start.substring(item.time.start.indexOf(':')+1,item.time.length))};
                let end = {hour: parseInt(item.time.end.substring(0, item.time.end.indexOf(':'))), minute: parseInt(item.time.end.substring(item.time.end.indexOf(':')+1,item.time.length))};
                let startMinute = start.hour*60 + start.minute;
                let endMinute = end.hour*60 + end.minute;
                progress = ((currentMinute-startMinute)*(100/(endMinute-startMinute)))
                if(currentMinute<=endMinute){
                    current = item;
                    return false;
                }
                return true;
            })
        }
    })
    return [current,progress];
}

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

const Now = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    const schedule = [
        {day:'Monday',period:[{id:'15MSS91', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSE27', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS93', span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Tuesday',period:[{id:'15MSS92', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSSL08', span:3,time:{start:'9:55',end:'12:45'}},{id:'15MSSE01', span:1,time:{start:'14:00',end:'14:50'}},{id:'15MSSE38', span:1,time:{start:'14:55',end:'15:45'}},{id:'1',span:1,time:{start:'15:55',end:'16:45'}}] },
        {day:'Wednesday',period:[{id:'15MSSE27', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSS91', span:1,time:{start:'9:55',end:'10:45'}},{id:'15MSSL08', span:2,time:{start:'11:00',end:'12:45'}}, {id:'15MSSL15', span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Thursday',period:[{id:'15MSSE01', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSL15', span:2,time:{start:'11:00',end:'12:45'}}, {id:'0',span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Friday',period:[{id:'15MSSE38', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSS93', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS92', span:2,time:{start:'14:00',end:'15:45'}},{id:'2',span:1,time:{start:'15:55',end:'16:45'}}] }, 
    ]

    const subjects = {
        '0':{name:'Placement',faculty:'Nil'},
        '1':{name:'SCH',faculty:'Nil'},
        '2':{name:'TWM',faculty:'Dr.M.Umarani'},
        '15MSS91':{name:'Information Security', type:'class', meet:'https://meet.google.com/lookup/cgecmskjvs?authuser=4',faculty:'Dr.P.Aruna'},
        '15MSS92':{name:'Professional Ethics',type:'class', meet:'https://meet.google.com/rgy-ipzm-fxd?authuser=4',faculty:'Dr.A.Saravanan'},
        '15MSSE01':{name:'Software User Interface Design',type:'class', meet:'https://meet.google.com/lookup/f5sh5wdffb?authuser=4',faculty:'Ms.V.Shanthi'},
        '15MSSE38':{name:'Quantum Computing',type:'class', meet:'https://meet.google.com/lookup/buh37uk5aw?authuser=4',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSE27':{name:'Computer Vision',type:'class', meet:'https://meet.google.com/lookup/brgxg34cy3?authuser=4',faculty:'Dr.M.Umarani'},
        '15MSS93':{name:'Information Security Lab',type:'lab', meet:'https://meet.google.com/lookup/agvs77wh4n?authuser=4',faculty:'Dr.A.Kannamal'},
        '15MSSL15':{name:'Quantum Computing Lab',type:'lab', meet:'https://meet.google.com/lookup/denvb3rq3g?authuser=4',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSL08':{name:'Image Processing Lab',type:'lab', meet:'https://meet.google.com/lookup/crolo2dqdw?authuser=4',faculty:'Ms.V.Shanthi'},
      }

    const today = days[(new Date().getDay())-1];
    let currArr = currentPeriod(schedule,today)

    let current = currArr[0];
    let progress = Math.floor(currArr[1]);
    
    return (
        <div className="now-tab">
            {schedule.map(item=>{
                if(item.day===today){
                    return item.period.map(item=>{
                        let titleIcon = subjects[item.id].type==="lab"?Laptop:Book;
                        let start = parseInt(item.time.start.substring(0, item.time.start.indexOf(':')))%12+item.time.start.substring(item.time.start.indexOf(':'),item.time.start.length)
                        let end = parseInt(item.time.end.substring(0, item.time.end.indexOf(':')))%12+item.time.end.substring(item.time.end.indexOf(':'),item.time.end.length)
                        
                        return(
                            <div className="card-1" key={item.id}>
                                <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
                                <div className="title-container">
                                    <label className="class-title">{subjects[item.id].name}</label>
                                </div>
                                <ProgressBar time={item.time}/>
                                <h6>⏰ {today}, {start} - {end}</h6>
                                <h6>👨‍🏫 {subjects[item.id].faculty}</h6>
                                <Button className={item===current?'button-current':'button'} onClick={()=>openInNewTab(subjects[item.id].meet)} variant="contained">Join</Button>
                            </div>                             
                        )
                    })
                }
            })}
            {/* <div className="card-1">
                <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon}/></div>
                <label className="class-title">{subjects[current.id].name}</label>
                <div className="bar">
                    <LinearProgress variant="determinate" color="secondary" value={progress} />
                </div>
                <h6>⏰ {today}, {start} - {end}</h6>
                <h6>👨‍🏫 {subjects[current.id].faculty}</h6>
                <Button className="button" onClick={()=>openInNewTab(subjects[current.id].meet)} variant="contained" color="primary">Join</Button>
            </div> */}
        </div>
    )
}

export default Now
