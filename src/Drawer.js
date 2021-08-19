import React from 'react';

//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Components
import Menu from './Menu';

const useStyles = makeStyles({
  list: {width: 250},
  fullList: {width: 'auto'},
});

export default function Drawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});
  const [menu, setMenu] = React.useState('Home');
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const getIcons = (name) => {
    switch(name){
      case "Home":
        return(<label>🏠</label>)
      case "Subjects":
        return(<label>📚</label>)
      case "Schedule":
          return(<label>📅</label>)  
      case "Settings":
        return(<label>⚙️</label>)
    
          default:
        return(<></>)
    }
  }
  const menus = [
    {name:"Home"},
    {name:"Subjects"},
    {name:"Schedule"},
    {name:"Settings"},
    
  ]
  const list = (anchor) => (
      <div className='list' role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List className={classes.list}>
        {menus.map((item) => (
          <ListItem onClick={()=> setMenu(item.name)}button key={item.name}>
            <ListItemIcon className="sidebar-icons">{getIcons(item.name)}</ListItemIcon>
            <ListItemText primary={<label className="sidebar-text">{item.name}</label>} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div style={{display:'flex', flexDirection:'column',height:'100vh', backgroundColor:'#171717'}}>
        <React.Fragment key={'left'}>
          <AppBar position="fixed" style={{backgroundColor:"#252525"}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                <MenuIcon />
              </IconButton>
              <div className="title">⚡Ghost Of Uchiha⚡</div>
            </Toolbar>
          </AppBar>
          <Toolbar></Toolbar>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          <Menu menu={menu}/>
        </React.Fragment>
    </div>
  );
}
