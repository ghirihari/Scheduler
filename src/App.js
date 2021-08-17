import React, {useEffect, useState, useRef} from 'react';
import './App.css'
import Drawer from './Drawer'
import DataContext from './DataContext'


export default function BasicTable() {
  // const _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday',]
  // const _subjects = {
  //     '0':{name:'Placement',faculty:'Nil'},
  //     '1':{name:'SCH',faculty:'Nil'},
  //     '2':{name:'TWM',faculty:'Dr.M.Umarani'},
  //     '15MSS91':{name:'Information Security', type:'class', meet:'https://meet.google.com/lookup/cgecmskjvs',faculty:'Dr.P.Aruna'},
  //     '15MSS92':{name:'Professional Ethics',type:'class', meet:'https://meet.google.com/rgy-ipzm-fxd',faculty:'Dr.A.Saravanan'},
  //     '15MSSE01':{name:'Software User Interface Design',type:'class', meet:'https://meet.google.com/lookup/f5sh5wdffb',faculty:'Ms.V.Shanthi'},
  //     '15MSSE38':{name:'Quantum Computing',type:'class', meet:'https://meet.google.com/lookup/buh37uk5aw',faculty:'Dr.S.Manjula Gandhi'},
  //     '15MSSE27':{name:'Computer Vision',type:'class', meet:'https://meet.google.com/lookup/brgxg34cy3',faculty:'Dr.M.Umarani'},
  //     '15MSS93':{name:'Information Security Lab',type:'lab', meet:'https://meet.google.com/lookup/agvs77wh4n',faculty:'Dr.A.Kannamal'},
  //     '15MSSL15':{name:'Quantum Computing Lab',type:'lab', meet:'https://meet.google.com/cni-wfpk-dfr',faculty:'Dr.S.Manjula Gandhi'},
  //     '15MSSL08':{name:'Image Processing Lab',type:'lab', meet:'https://meet.google.com/lookup/crolo2dqdw',faculty:'Ms.V.Shanthi'},
  // }  
  // const _schedule = [
  //   {day:'Monday',period:[{id:'15MSS91', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSE27', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS93', span:3,time:{start:'14:00',end:'16:45'}}] },
  //   {day:'Tuesday',period:[{id:'15MSS92', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSSL08', span:3,time:{start:'9:55',end:'12:45'}},{id:'15MSSE01', span:1,time:{start:'14:00',end:'14:50'}},{id:'15MSSE38', span:1,time:{start:'14:55',end:'15:45'}},{id:'1',span:1,time:{start:'15:55',end:'16:45'}}] },
  //   {day:'Wednesday',period:[{id:'15MSSE27', span:1,time:{start:'9:00',end:'9:50'}},{id:'15MSS91', span:1,time:{start:'9:55',end:'10:45'}},{id:'15MSSL08', span:2,time:{start:'11:00',end:'12:45'}}, {id:'15MSSL15', span:3,time:{start:'14:00',end:'16:45'}}] },
  //   {day:'Thursday',period:[{id:'15MSSE01', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSSL15', span:2,time:{start:'11:00',end:'12:45'}}, {id:'0',span:3,time:{start:'14:00',end:'16:45'}}] },
  //   {day:'Friday',period:[{id:'15MSSE38', span:2,time:{start:'9:00',end:'10:45'}},{id:'15MSS93', span:2,time:{start:'11:00',end:'12:45'}},{id:'15MSS92', span:2,time:{start:'14:00',end:'15:45'}},{id:'2',span:1,time:{start:'15:55',end:'16:45'}}] }, 
  // ]
  // const dataa = {Day:_days, Subject:_subjects, Schedule:_schedule}
  // const [subjects, setSubjects] = useState(dataa.Subject)
  // const [schedule, setSchedule] = useState(dataa.Schedule)
  // const data = {Day:_days, Subject:subjects, setSubjects:setSubjects, Schedule:schedule }
  // localStorage.data = JSON.stringify(dataa)

  const LocalData = JSON.parse(localStorage.data)
  const [subjects, setSubjects] = useState(LocalData.Subject)
  const [schedule, setSchedule] = useState(LocalData.Schedule)
  const data = {Day:LocalData.Day, Subject:subjects, setSubjects:setSubjects, Schedule:schedule,setSchedule:setSchedule }

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      localStorage.data = JSON.stringify(data)
      console.log('data updated')
      // do componentDidUpdate logic
    }
  });

  return (
    <DataContext.Provider value={data}>
      <Drawer/>
    </DataContext.Provider>
  );
  }
