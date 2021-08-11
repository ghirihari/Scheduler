import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const DayNavigator = (props) => {
    return(
        <>
            <div className="next-buttons-container">
                <IconButton size="small" className="next-buttons" onClick={()=>props.setDay(day=>(day-1)%5)}>
                    <ChevronLeftIcon style={{color:'white'}}/>
                </IconButton>
            </div>
            <div>
                <label className="day-label">{props.today}</label>
            </div>
            <div className="next-buttons-container">
                <IconButton size="small" className="next-buttons" onClick={()=>props.setDay(day=>(day+1)%5)}>
                    <ChevronRightIcon style={{color:'white'}}/>
                </IconButton>
            </div>
        </>
    )
}

export default DayNavigator
