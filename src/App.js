import React from 'react';
import './App.css'
import Drawer from './Drawer'
import DataContext from './DataContext'
import SnackBar from './Snackbar';

export default class App extends React.Component {
  constructor(){
    super();
    // Clock
    var thedate = new Date(); 

    this.state={
      currentMinute : (thedate.getHours()*60)+(thedate.getMinutes()),
      day : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'],
      subjects : [],
      schedule : [
        {day:'Monday',period:[]},
        {day:'Tuesday',period:[]},
        {day:'Wednesday',period:[]},
        {day:'Thursday',period:[]},
        {day:'Friday',period:[]},
        {day:'Saturday',period:[]},
        {day:'Sunday',period:[]},
      ],
      message: {type:'',text:''},
      messageShow: false
    }

    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }
    if (Notification.permission !== 'granted')Notification.requestPermission();
  }
  
  reloadData = () => {
    let LocalData = localStorage.data;
    if(LocalData){
      LocalData = JSON.parse(LocalData)
      this.setState({
        subjects : LocalData.Subject,
        schedule : LocalData.Schedule
      })
    }
  }
  componentDidMount = () => {
    this.reloadData();
  }

  resetLocalData = () => {
    const _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday']
    const _subjects = {
        '0':{name:'Placement',faculty:'Nil'},
        '1':{name:'SCH',faculty:'Nil'},
        '2':{name:'TWM',faculty:'Dr.M.Umarani'},
        '15MSS91':{name:'Information Security', type:'class', meet:'https://meet.google.com/lookup/cgecmskjvs',faculty:'Dr.P.Aruna'},
        '15MSS92':{name:'Professional Ethics',type:'class', meet:'https://meet.google.com/rgy-ipzm-fxd',faculty:'Dr.A.Saravanan'},
        '15MSSE01':{name:'Software User Interface Design',type:'class', meet:'https://meet.google.com/lookup/f5sh5wdffb',faculty:'Ms.V.Shanthi'},
        '15MSSE38':{name:'Quantum Computing',type:'class', meet:'https://meet.google.com/lookup/buh37uk5aw',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSE27':{name:'Computer Vision',type:'class', meet:'https://meet.google.com/lookup/brgxg34cy3',faculty:'Dr.M.Umarani'},
        '15MSS93':{name:'Information Security Lab',type:'lab', meet:'https://meet.google.com/lookup/agvs77wh4n',faculty:'Dr.A.Kannamal'},
        '15MSSL15':{name:'Quantum Computing Lab',type:'lab', meet:'https://meet.google.com/cni-wfpk-dfr',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSL08':{name:'Image Processing Lab',type:'lab', meet:'https://meet.google.com/lookup/crolo2dqdw',faculty:'Ms.V.Shanthi'},
    }  
    const _schedule = [
      {day:'Monday',period:[{no:1,id:'15MSS91', time:{start:'9:00',end:'10:45'}},{no:2,id:'15MSSE27', time:{start:'11:00',end:'12:45'}},{no:3,id:'15MSS93', time:{start:'14:00',end:'16:45'}}] },
      {day:'Tuesday',period:[{no:1,id:'15MSS92', time:{start:'9:00',end:'9:50'}},{no:2,id:'15MSSL08', time:{start:'9:55',end:'12:45'}},{no:3,id:'15MSSE01', time:{start:'14:00',end:'14:50'}},{no:4,id:'15MSSE38', time:{start:'14:55',end:'15:45'}},{no:5,id:'1',time:{start:'15:55',end:'16:45'}}] },
      {day:'Wednesday',period:[{no:1,id:'15MSSE27', time:{start:'9:00',end:'9:50'}},{no:2,id:'15MSS91', time:{start:'9:55',end:'10:45'}},{no:3,id:'15MSSL08', time:{start:'11:00',end:'12:45'}}, {no:4,id:'15MSSL15', time:{start:'14:00',end:'16:45'}}] },
      {day:'Thursday',period:[{no:1,id:'15MSSE01', time:{start:'9:00',end:'10:45'}},{no:2,id:'15MSSL15', time:{start:'11:00',end:'12:45'}}, {no:3,id:'0',time:{start:'14:00',end:'16:45'}}] },
      {day:'Friday',period:[{no:1,id:'15MSSE38', time:{start:'9:00',end:'10:45'}},{no:2,id:'15MSS93', time:{start:'11:00',end:'12:45'}},{no:3,id:'15MSS92', time:{start:'14:00',end:'15:45'}},{no:4,id:'2',time:{start:'15:55',end:'16:45'}}] }, 
      {day:'Saturday',period:[]}, 
      {day:'Sunday',period:[]}, 
    
    ]
    const dataa = {Day:_days, Subject:_subjects, Schedule:_schedule}
    localStorage.data = JSON.stringify(dataa)
  }
  timer = () => {
    var now = new Date();
    // if(now.getSeconds()===0){
      this.setTime( (now.getHours()*60)+(now.getMinutes()) )
    // } 
  }

  setTime = (data) => this.setState({currentMinute:data})
  
  setSubjects = (data) => {
    this.setState({subjects:data})
  }

  setMessage = (type,text) => {
    console.log(text)
    this.setState({
      message:{
        type:type,
        text:text,
      },
      messageShow:true
    })
  }

  setMessageShow = (value) => {this.setState({messageShow:false})}  

  appendSubjects = (Id,Name,Faculty,Link,Type) => {
    console.log("Append")
    this.setState(prevState => ({
        subjects:{...prevState.subjects,[Id]:{name:Name,faculty:Faculty,meet:Link,type:Type}}
      })
    )
  }

  // setSchedule = (Day,Id,StartTime,EndTime) => {
  //   const old = JSON.parse(JSON.stringify(this.state.schedule))
  //   old[Day].period.push({id:Id,time:{start:StartTime,end:EndTime}})
  //   this.setState({schedule:old})
  // }

  setSchedule = (data) =>{
    this.setState({schedule:data})
  }

  updateSchedule = (Day,Id,StartTime,EndTime) => {
    // console.log(Day,Id,StartTime,EndTime)
    const old = JSON.parse(JSON.stringify(this.state.schedule))
    old[Day].period.push({id:Id,time:{start:StartTime,end:EndTime}})
    this.setState({schedule:old})
  }

  deletePeriod = (Day,Id,StartTime,EndTime) => {
    // console.log(Day,Id,StartTime,EndTime)
    // const old = JSON.parse(JSON.stringify(this.state.schedule))
    // old[Day].period.push({id:Id,time:{start:StartTime,end:EndTime}})
    // this.setState({schedule:old})
  }

  componentDidUpdate = (prevProps, prevState) =>{
    if(prevState.subjects !== this.state.subjects || prevState.schedule !== this.state.schedule){
      // console.log('data updated')   
      localStorage.data = JSON.stringify({Day:this.state.day,Subject:this.state.subjects,Schedule:[
        {day:'Monday',period:[]},
        {day:'Tuesday',period:[]},
        {day:'Wednesday',period:[]},
        {day:'Thursday',period:[]},
        {day:'Friday',period:[]},
        {day:'Saturday',period:[]},
        {day:'Sunday',period:[]},
      ]})
    }else{
    }
  }

  render(){
    // this.resetLocalData();
    let data = {
      Day:this.state.day, 
      Subject:this.state.subjects, 
      Schedule:this.state.schedule,
      CurrentMinute:this.state.currentMinute,
      appendSubjects:this.appendSubjects, 
      setSubjects:this.setSubjects, 
      setSchedule:this.setSchedule,
      Timer:this.timer,
      reloadData:this.reloadData,
      setMessage:this.setMessage,
    }

    return (
      <DataContext.Provider value={data}>
        <SnackBar message={this.state.message} open={this.state.messageShow} show={()=>this.setMessageShow()}/>
        <Drawer/>
      </DataContext.Provider>
    );
  }
  }

  // {"Day":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"Subject":{"0":{"name":"Placement","faculty":"Nil"},"1":{"name":"SCH","faculty":"Nil"},"2":{"name":"TWM","faculty":"Dr.M.Umarani"},"15MSS91":{"name":"Information Security","type":"class","meet":"https://meet.google.com/lookup/cgecmskjvs","faculty":"Dr.P.Aruna"},"15MSS92":{"name":"Professional Ethics","type":"class","meet":"https://meet.google.com/rgy-ipzm-fxd","faculty":"Dr.A.Saravanan"},"15MSSE01":{"name":"Software User Interface Design","type":"class","meet":"https://meet.google.com/lookup/f5sh5wdffb","faculty":"Ms.V.Shanthi"},"15MSSE38":{"name":"Quantum Computing","type":"class","meet":"https://meet.google.com/lookup/buh37uk5aw","faculty":"Dr.S.Manjula Gandhi"},"15MSSE27":{"name":"Computer Vision","type":"class","meet":"https://meet.google.com/lookup/brgxg34cy3","faculty":"Dr.M.Umarani"},"15MSS93":{"name":"Information Security Lab","type":"lab","meet":"https://meet.google.com/lookup/agvs77wh4n","faculty":"Dr.A.Kannamal"},"15MSSL15":{"name":"Quantum Computing Lab","type":"lab","meet":"https://meet.google.com/cni-wfpk-dfr","faculty":"Dr.S.Manjula Gandhi"},"15MSSL08":{"name":"Image Processing Lab","type":"lab","meet":"https://meet.google.com/lookup/crolo2dqdw","faculty":"Ms.V.Shanthi"}},"Schedule":[{"day":"Monday","period":[{"no":1,"id":"15MSS91","time":{"start":"9:00","end":"10:45"}},{"no":2,"id":"15MSSE27","time":{"start":"11:00","end":"12:45"}},{"no":3,"id":"15MSS93","time":{"start":"14:00","end":"16:45"}}]},{"day":"Tuesday","period":[{"no":1,"id":"15MSS92","time":{"start":"9:00","end":"9:50"}},{"no":2,"id":"15MSSL08","time":{"start":"9:55","end":"12:45"}},{"no":3,"id":"15MSSE01","time":{"start":"14:00","end":"14:50"}},{"no":4,"id":"15MSSE38","time":{"start":"14:55","end":"15:45"}},{"no":5,"id":"1","time":{"start":"15:55","end":"16:45"}}]},{"day":"Wednesday","period":[{"no":1,"id":"15MSSE27","time":{"start":"9:00","end":"9:50"}},{"no":2,"id":"15MSS91","time":{"start":"9:55","end":"10:45"}},{"no":3,"id":"15MSSL08","time":{"start":"11:00","end":"12:45"}},{"no":4,"id":"15MSSL15","time":{"start":"14:00","end":"16:45"}}]},{"day":"Thursday","period":[{"no":1,"id":"15MSSE01","time":{"start":"9:00","end":"10:45"}},{"no":2,"id":"15MSSL15","time":{"start":"11:00","end":"12:45"}},{"no":3,"id":"0","time":{"start":"14:00","end":"16:45"}}]},{"day":"Friday","period":[{"no":1,"id":"15MSSE38","time":{"start":"9:00","end":"10:45"}},{"no":2,"id":"15MSS93","time":{"start":"11:00","end":"12:45"}},{"no":3,"id":"15MSS92","time":{"start":"14:00","end":"15:45"}},{"no":4,"id":"2","time":{"start":"15:55","end":"16:45"}}]}]}