import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import SubjectCard from './SubjectCard';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor:'#202020',
    color:'white',
    width:'auto',
    height:'100vh'
  },
  header: {
    color:'#1fb79f',
    fontSize:'20px',
    textAlign:'center',
  }
});

const currentPeriod = (schedule, today) => {
    var thedate = new Date(); 
    var hour = (thedate.getHours())*60; 
    var minute = thedate.getMinutes();
    var currentMinute = hour+minute;

    var current;
    schedule.forEach(item=>
    {
        if(item.day===today){
            item.period.every(item=> {
                let start = {hour: parseInt(item.time.start.substring(0, item.time.start.indexOf(':'))), minute: parseInt(item.time.start.substring(item.time.start.indexOf(':')+1,item.time.length))};
                let end = {hour: parseInt(item.time.end.substring(0, item.time.end.indexOf(':'))), minute: parseInt(item.time.end.substring(item.time.end.indexOf(':')+1,item.time.length))};
                let startMinute = start.hour*60 + start.minute;
                let endMinute = end.hour*60 + end.minute;
                //Current hour is between start and end hours
                // current Hour is less than end hour
                console.log(currentMinute,startMinute,endMinute)                    
                if(currentMinute>=startMinute && currentMinute<=endMinute){
                    current = item;
                    return false;
                }
                return true;
            })
        }
    })
    return current;
}

const WeeklyTable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const today = days[(new Date().getDay())-1];
    console.log(today)
    const classes = useStyles();
    const time = [
      {start:'9:00',end:'9:50'},
      {start:'9:55',end:'10:45'},
      {start:'11:00',end:'11:50'},
      {start:'11:55',end:'12:45'},
      {start:'2:00',end:'2:50'},
      {start:'2:55',end:'3:45'},
      {start:'3:55',end:'4:45'},
    ]
  
    const schedule = [
        {day:'Monday',period:[{id:'15MSS91', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSE27', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS93', span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Tuesday',period:[{id:'15MSS92', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSSL08', span:3,time:{start:'9:55',end:'12:45'}},{id:'15MSSE01', span:1,time:{start:'14:00',end:'14:50'}},{id:'15MSSE38', span:1,time:{start:'14:55',end:'15:45'}},{id:'1',span:1,time:{start:'15:55',end:'16:45'}}] },
        {day:'Wednesday',period:[{id:'15MSSE27', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSS91', span:1,time:{start:'9:55',end:'10:45'}},{id:'15MSSL08', span:2,time:{start:'11:00',end:'12:45'}}, {id:'15MSSL15', span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Thursday',period:[{id:'15MSSE01', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSL15', span:2,time:{start:'11:00',end:'12:45'}}, {id:'0',span:3,time:{start:'14:00',end:'16:45'}}] },
        {day:'Friday',period:[{id:'15MSSE38', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSS93', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS92', span:2,time:{start:'14:00',end:'15:45'}},{id:'2',span:1,time:{start:'15:55',end:'16:45'}}] }, 
    ]

    const subjects = {
      '0':{name:'Placement'},
      '1':{name:'SCH'},
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

    let current = currentPeriod(schedule,today);
  
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" style={{tableLayout: 'fixed'}}>
          <TableHead>
            <TableRow>
                <TableCell>
                  {/* <Button variant="contained" color="secondary" style={{width:'100%', height:'100%'}}>Dark</Button> */}
                </TableCell>
                {time.map(item=>{
                    return <TableCell className={classes.header}>{item.start}-{item.end}</TableCell>
                })}
                </TableRow>
            </TableHead>
          <TableBody>
              {schedule.map(item=>{
                let today_style = (item.day===today) ? 'today' : ''  
                return(
                  <TableRow className={today_style}>
                    <TableCell component="th" scope="row" className={classes.header}>{item.day[0]}</TableCell>
                    {item.period.map(item=>{
                        let now = (item===current) ? true : false;  
                        return(
                            <TableCell colSpan={item.span} align={'center'}>
                                <SubjectCard subject={subjects[item.id]} now={now}/>
                            </TableCell>
                        ) 
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default WeeklyTable
