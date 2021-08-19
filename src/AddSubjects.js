import React, {useContext, useState} from 'react'
import DataContext from './DataContext'
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'

// Components
import AddDialog from './AddDialog'

// Matrial UI
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// Icons
import EditDialog from './EditDialog'

const Subjects = (props) => {
    const [Edit, setEdit] = useState(0);
  
    if(props.data){
        let titleIcon = props.data[1].type==="lab"?Laptop:Book;
        return(
            <div className={'add-card'} onMouseOver={()=>setEdit(1)} onMouseLeave={()=>setEdit(0)}>
                <div className={'subject-card'}>
                        <EditDialog edit={Edit} setEdit={setEdit} data={props.data}/>
                    <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
                    <div className="title-container">
                        <label className="class-title">{props.data[1].name}</label>
                    </div>
                    <h6>👨‍🏫 {props.data[1].faculty}</h6>
                    <h6>🆔 {props.data[0]}</h6>
                    <div className="btn-group">
                        <Button className={'button'} variant="contained">Meet</Button>
                    </div>
                </div>         
            </div>
        )
    }
    else{
        return(
            <AddDialog length={props.length}/>
        )
    }
}

const AddSubjects = () => {
    const data = useContext(DataContext);    
    const subjects = data.Subject;
  
    return (
            <div className="add-tab">
                <Subjects length={Object.entries(subjects).length}/>
                {Object.entries(subjects).map(data=><Subjects key={data} data={data}/>)}                
            </div>
    )
}

export default AddSubjects
