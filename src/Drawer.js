import React from 'react';
import ThemeContext from './ThemeContext'

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
  list: {
    width: 250,  
    height: '100vh'
  },
  fullList: {width: 'auto'},
  light:{
    backgroundColor: '#dfdfdf',
    color: '#202020',
  },
  dark:{
    backgroundColor: "#202020",
    color: 'white',

  }
});

export default function Drawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});
  const [menu, setMenu] = React.useState('Home');
  const [theme,setTheme] = React.useState((localStorage.theme)?localStorage.theme:'🌑')
  const [themeClass,setThemeClass] = React.useState((theme==='🌕')?'theme-light':'theme-dark')
  localStorage.theme = theme;

  const toggleTheme = () => {
    if(theme==='🌑'){
      setThemeClass('theme-light');
      setTheme('🌕');
    }
    else{
      setThemeClass('theme-dark');
      setTheme('🌑');
    }
  }
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
  let listClass = (theme==='🌕')?classes.light:classes.dark;
  let icon = (theme==='🌕')?'🌑':'🌕';
  const list = (anchor) => (
      <div className='list' role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List className={classes.list+" "+listClass}>
        {menus.map((item) => (
          <ListItem className="list-item" onClick={()=> setMenu(item.name)}button key={item.name}>
            <ListItemIcon className="sidebar-icons">{getIcons(item.name)}</ListItemIcon>
            <ListItemText primary={<label className="sidebar-text">{item.name}</label>} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeContext.Provider value={theme}>
      <div className={themeClass+' themeContainer'}>
          <React.Fragment key={'left'}>
            <AppBar position="fixed" className="title-bar">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                  <MenuIcon />
                </IconButton>
                <div className="title">⚡Ghost Of Uchiha⚡</div>
                <IconButton style={{color:'white'}} onClick={toggleTheme}>{icon}</IconButton>
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
    </ThemeContext.Provider>
  );
}
