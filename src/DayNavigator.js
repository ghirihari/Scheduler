import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const DayNavigator = (props) => {
    const navigate = (direction) => {
        if(direction==='backward'){
            props.setDay(day=>{
                if(day===0)return 6
                else return (day-1)%7
            })
        }
        else{
            props.setDay(day=>(day+1)%7)
        }
    }
    return(
        <>
            <div className="next-buttons-container">
                <IconButton size="small" className="next-buttons" onClick={()=>navigate('backward')}>
                    <ChevronLeftIcon style={{color:'white'}}/>
                </IconButton>
            </div>
            <div>
                <label className="day-label title">{props.today}</label>
            </div>
            <div className="next-buttons-container">
                <IconButton size="small" className="next-buttons" onClick={navigate}>
                    <ChevronRightIcon style={{color:'white'}}/>
                </IconButton>
            </div>
        </>
    )
}

export default DayNavigator
