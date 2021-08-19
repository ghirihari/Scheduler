import React,{useState, useContext} from 'react'
import DataContext from './DataContext';
import DayNavigator from './DayNavigator';
import PeriodCard from './PeriodCard';
import AddPeriodDialog from './AddPeriodDialog';

const Schedule = () => {
    const data = useContext(DataContext);    
    const days = data.Day;
    const schedule = data.Schedule;
    const [day, setDay] = useState((new Date().getDay())-1)
    const selectedDay = days[day];

    return (
        <div className="now-container">
            <div className="day-container">
                <DayNavigator today={selectedDay} setDay={setDay} currDay={day}/>
            </div>
            <div className="now-tab">
                <AddPeriodDialog day={day}/>
                {schedule.map(item=>{
                    if(item.day===selectedDay){
                        return item.period.map(item=>{
                            return <PeriodCard item={item} day={day} key={item.id}/>
                        })
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Schedule
