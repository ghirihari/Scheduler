import React, {useState} from 'react'
import SubjectCard from './SubjectCard';
import DayNavigator from './DayNavigator';


// const openInNewTab = (url) => {
//     const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
//     if (newWindow) newWindow.opener = null
// }

const Now = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday',]

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
        '15MSS91':{name:'Information Security', type:'class', meet:'https://meet.google.com/lookup/cgecmskjvs',faculty:'Dr.P.Aruna'},
        '15MSS92':{name:'Professional Ethics',type:'class', meet:'https://meet.google.com/rgy-ipzm-fxd',faculty:'Dr.A.Saravanan'},
        '15MSSE01':{name:'Software User Interface Design',type:'class', meet:'https://meet.google.com/lookup/f5sh5wdffb',faculty:'Ms.V.Shanthi'},
        '15MSSE38':{name:'Quantum Computing',type:'class', meet:'https://meet.google.com/lookup/buh37uk5aw',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSE27':{name:'Computer Vision',type:'class', meet:'https://meet.google.com/lookup/brgxg34cy3',faculty:'Dr.M.Umarani'},
        '15MSS93':{name:'Information Security Lab',type:'lab', meet:'https://meet.google.com/lookup/agvs77wh4n',faculty:'Dr.A.Kannamal'},
        '15MSSL15':{name:'Quantum Computing Lab',type:'lab', meet:'https://meet.google.com/cni-wfpk-dfr',faculty:'Dr.S.Manjula Gandhi'},
        '15MSSL08':{name:'Image Processing Lab',type:'lab', meet:'https://meet.google.com/lookup/crolo2dqdw',faculty:'Ms.V.Shanthi'},
    }
    const [day, setDay] = useState((new Date().getDay())-1)
    const today = days[day];
    return (
        <div className="now-container">
            <div className="day-container">
                <DayNavigator today={today} setDay={setDay}/>
            </div>
            <div className="now-tab">
                {schedule.map(item=>{
                    if(item.day===today){
                        return item.period.map(item=>{
                            return <SubjectCard item={item} subjects={subjects} days={days} schedule={schedule}/>
                        })
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Now
