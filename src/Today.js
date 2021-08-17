import React, {useState,useContext, useEffect} from 'react'
import SubjectCard from './SubjectCard';
import DayNavigator from './DayNavigator';
import DataContext from './DataContext'

// Icons
// import Book from './assets/books.png'
// import Laptop from './assets/laptop.png'

const currentPeriod = (schedule, today, subject) => {
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

const Now = () => {
    // Context Data
    const data = useContext(DataContext);    
    const days = data.Day;
    const subject = data.Subject;
    const schedule = data.Schedule;

    const [day, setDay] = useState((new Date().getDay())-1)
    const selectedDay = days[day];

    const today = days[(new Date().getDay())-1];
    let current = currentPeriod(schedule,today,subject)
  
    useEffect(() => {
        if(current){
            // const notification = new Notification(subject[current.id].name, {
            //     body: subject[current.id].faculty,
            //     icon: {Book}
            // });
    
            // notification.addEventListener('click', () => {
            //     window.open(subject[current.id].meet, '_blank');
            // });
        }
    }, [current,subject])
    return (
        <div className="now-container">
            <div className="day-container">
                <DayNavigator today={selectedDay} setDay={setDay}/>
            </div>
            <div className="now-tab">
                {schedule.map(item=>{
                    if(item.day===selectedDay){
                        return item.period.map(item=>{
                            return <SubjectCard item={item} day={selectedDay} current={current} key={item.id}/>
                        })
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Now
