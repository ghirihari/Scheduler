import React from 'react';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export default function SubjectCard(props) {
    // console.log(props.subject)
    let nowClass = (props.now===true) ? 'now' : '';  
    let type = props.subject.type==="lab"?'💻':'📚';
    return (
    <div className={"card "+nowClass} onClick={()=>openInNewTab(props.subject.meet)} >
        <div style={{fontSize:'20px'}}>{type}</div>
        <label className="subject-name" >{props.subject.name}</label>  
    </div>
  );
}
