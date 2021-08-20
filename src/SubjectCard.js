import React,{useContext} from 'react';
import DataContext from './DataContext';
import Button from '@material-ui/core/Button';
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'
import ProgressBar from './ProgressBar';

const openInNewTab = (url) => {
    const newWindow = window.open(url+'?authuser='+localStorage.user, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export default function SubjectCard(props) {
    const data = useContext(DataContext);    
    const days = data.Day;
    const subjects = data.Subject;

    let titleIcon = subjects[props.item.id].type==="lab"?Laptop:Book;
    let start = parseInt(props.item.time.start.substring(0, props.item.time.start.indexOf(':')))%12+props.item.time.start.substring(props.item.time.start.indexOf(':'),props.item.time.start.length)
    let end = parseInt(props.item.time.end.substring(0, props.item.time.end.indexOf(':')))%12+props.item.time.end.substring(props.item.time.end.indexOf(':'),props.item.time.end.length)
    
    const today = days[(new Date().getDay())-1];
   
    return(
        <div className={props.item===props.current?'card-1 nowCard':'card-1'} key={props.item.id}>
            <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
            <div className="title-container">
                <label className="class-title">{subjects[props.item.id].name}</label>
            </div>
            {props.day===today && <ProgressBar item={props.item}/>}
            <h6>⏰ {start} - {end}</h6>
            <h6>👨‍🏫 {subjects[props.item.id].faculty}</h6>
            <Button className={props.item===props.current?'button-current':'button'} onClick={()=>openInNewTab(subjects[props.item.id].meet)} variant="contained">Join</Button>
        </div>                             
    )
}
