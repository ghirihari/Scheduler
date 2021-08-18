import React,{useContext, useState} from 'react';
import DataContext from './DataContext';

import EditPeriod from './EditPeriod';

export default function PeriodCard(props) {
    const data = useContext(DataContext);    
    const subjects = data.Subject;

    let titleIcon = subjects[props.item.id].type==="lab"?'💻':'📚';
    let start = parseInt(props.item.time.start.substring(0, props.item.time.start.indexOf(':')))%12+props.item.time.start.substring(props.item.time.start.indexOf(':'),props.item.time.start.length)
    let end = parseInt(props.item.time.end.substring(0, props.item.time.end.indexOf(':')))%12+props.item.time.end.substring(props.item.time.end.indexOf(':'),props.item.time.end.length)
       
    const [edit, setEdit] = useState(false)

    return(
        <div className={'card-period'} style={{position:'relative'}} key={props.item.id} onMouseOver={()=>setEdit(true)} onMouseLeave={()=>setEdit(false)}>
            <EditPeriod edit={edit} setEdit={setEdit} item={props.item}/>
            <div className="title-container">
                <label className="period-title">{titleIcon} {subjects[props.item.id].name}</label>
            </div>
            <h6 style={{textAlign:'center'}}>{start} - {end}</h6>
        </div>                             
    )
}
