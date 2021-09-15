import React, {useContext, useState} from 'react'
import DataContext from './DataContext'
import Book from './assets/books.png'
import Laptop from './assets/laptop.png'
import Test from './assets/test.png'

// Components
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'

// Matrial UI
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';


const getIcon = (name) => {
    switch(name){
        case 'class':return Book;
        case 'lab':return Laptop;
        case 'test':return Test;
        default: return Book;
    }
}

const Subjects = (props) => {
    const [Edit, setEdit] = useState(0);
  
    let titleIcon = getIcon(props.data[1].type);
    return(
        <div className={'add-card'} onMouseOver={()=>setEdit(1)} onMouseLeave={()=>setEdit(0)}>
            <div className={'subject-card'}>
                    <EditDialog edit={Edit} setEdit={setEdit} data={props.data}/>
                <div style={{textAlign:"center"}}><img alt={titleIcon} src={titleIcon} style={{width:'50px'}}/></div>
                <div className="title-container">
                    <label className="class-title">{props.data[1].name}</label>
                </div>
                <h6>👨‍🏫 {props.data[1].faculty}</h6>
                {/* <h6>🆔 {props.data[0]}</h6> */}
                <div className="btn-group">
                    <Button className={'button'} variant="contained">Meet</Button>
                </div>
            </div>         
        </div>
    )

}

const AddSubjects = () => {
    const data = useContext(DataContext);    
    const subjects = data.Subject;
    console.log(Object.entries(subjects).length)

    return (
            <div className="add-tab">
                <AddDialog length={Object.entries(subjects).length}/>
                {Object.entries(subjects).map(data=><Subjects key={data} data={data}/>)}                
            </div>
    )
}

export default AddSubjects
