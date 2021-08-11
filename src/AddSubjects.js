import React, {useState} from 'react'
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'

// Components
import AddDialog from './AddDialog'

// Matrial UI
import Button from '@material-ui/core/Button';

const Subjects = (props) => {
  
    if(props.data){
        let titleIcon = props.data[1].type==="lab"?Laptop:Book;
        return(
            <div className={'add-card'}>
                <div className={'subject-card'}>
                    <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
                    <div className="title-container">
                        <label className="class-title">{props.data[1].name}</label>
                    </div>
                    <h6>👨‍🏫 {props.data[1].faculty}</h6>
                    <h6>🆔 {props.data[0]}</h6>
                    <Button className={'button'} variant="contained">Meet</Button>
                </div>         
            </div>
        )
    }
    else{
        return(
            <AddDialog/>
        )
    }
}

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

const AddSubjects = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday',]
    const [day, setDay] = useState((new Date().getDay())-1)
    const today = days[day];

    return (
            <div className="add-tab">
                <Subjects/>
                {Object.entries(subjects).map(data=><Subjects data={data}/>)}                
            </div>
    )
}

export default AddSubjects
