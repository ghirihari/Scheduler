import React from 'react'

// Components
import Now from './Today'
import AddSubjects from './AddSubjects'
import Settings from './Settings';

const Menu =(props) => {
    switch(props.menu){
      case 'Home':
        return <Now/>
      case 'Subjects':
        return <AddSubjects/>
      case 'Settings':
        return <Settings/>
      default:
        return <Now/>
    }
}

export default Menu
