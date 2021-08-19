import React,{useContext, useState} from 'react';
import DataContext from './DataContext';

import EditPeriod from './EditPeriod';

export default function PeriodCard(props) {
    const data = useContext(DataContext);    
    const subjects = data.Subject;

    let titleIcon = subjects[props.item.id].type==="lab"?'💻':'📚';
    let start = {
        hour:parseInt(props.item.time.start.substring(0, props.item.time.start.indexOf(':')))%12,
        minute:props.item.time.start.substring(props.item.time.start.indexOf(':')+1,props.item.time.start.length)
    }
    let end = {
        hour:parseInt(props.item.time.end.substring(0, props.item.time.end.indexOf(':')))%12,
        minute:props.item.time.end.substring(props.item.time.end.indexOf(':')+1,props.item.time.end.length)
    }
    start.minute = (start.minute.length===1)?'0'+start.minute:start.minute 
    end.minute = (end.minute.length===1)?'0'+end.minute:end.minute 
       
    const [edit, setEdit] = useState(false)

    return(
        <div className={'card-period'} style={{position:'relative'}} key={props.item.id} onMouseOver={()=>setEdit(true)} onMouseLeave={()=>setEdit(false)}>
            <EditPeriod edit={edit} setEdit={setEdit} item={props.item} day={props.day}/>
            <div className="title-container">
                <label className="period-title">{titleIcon} {subjects[props.item.id].name}</label>
            </div>
            <h6 style={{textAlign:'center'}}>{start.hour}:{start.minute} - {end.hour}:{end.minute}</h6>
        </div>                             
    )
}
