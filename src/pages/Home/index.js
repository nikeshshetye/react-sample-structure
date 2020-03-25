import React from 'react';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { InboxIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         fname: '',
         lname: '',
         birthdayDate: '',
         gender: '',
         img: '',
         isDrawerOpen: false
      }

      const data = localStorage.getItem('loggedIn');
      if (data !== undefined && data !== null) {
         console.log('local:', data);
      }
   }

   onFirstNameChange = (event) => {
      this.setState({ fname: event.target.value });
   }

   onLastNameChange = (event) => {
      this.setState({ lname: event.target.value });
   }

   onBirthDateChange = (event) => {
      this.setState({ birthdayDate: event.target.value });
   }

   onGenderChange = (event) => {
      this.setState({ gender: event.target.value });
   }

   onSubmitClick = () => {
      console.log('Form submitted, Data: ', this.state);
      localStorage.setItem('loggedIn', true);
   }

   onProfileImageChange = (event) => {
      // event.preventDefault();
      console.log('onProfileImageChange', event.target.files[0]);
      this.setState({
         img: URL.createObjectURL(event.target.files[0])
      });
   }

   handleDrawerOpen = () => {
      this.setState({
         isDrawerOpen: true
      });
   };

   handleDrawerClose = () => {
      this.setState({
         isDrawerOpen: false
      });
   }

   render() {
      // const classes = useStyles();
      // const theme = useTheme();
      // const [open, setOpen] = React.useState(false);
      return (
         <div className="main" style={styles.containerStyle}>
            <AppBar
               position="fixed"
            >
               <Toolbar>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     onClick={this.handleDrawerOpen}
                     edge="start"
                  >
                     {/* <MenuIcon /> */}
                     <view style={{ width: 50, height: 50, backgroundColor: 'red' }} />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                     Register
                  </Typography>
               </Toolbar>
            </AppBar>

            <Drawer
               variant="persistent"
               anchor="left"
               open={this.state.isDrawerOpen}
            >
               <div>
                  <IconButton onClick={this.handleDrawerClose}>
                     {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
                     <view style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
                  </IconButton>
               </div>
               <List>
                  {
                     ['Home', 'About', 'Shoping', 'Posts'].map((item, index) => {
                        return (
                           <ListItem button key={item}>
                              {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
                              <ListItemText primary={item} />
                           </ListItem>
                        );
                     })
                  }
               </List>
            </Drawer>

            <main style={{
               width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 100
            }}>
               <form
                  style={styles.formStyle}
                  noValidate
                  autoComplete="off"
               // onSubmit={this.onSubmitClick}
               >
                  <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                     <div style={styles.inputDivStyle}>
                        <label >First name:
                       <input
                              style={styles.inputStyle}
                              type="text"
                              id="fname"
                              name="fname"
                              placeholder={'First name'}
                              value={this.state.fname}
                              onChange={this.onFirstNameChange}
                           />
                        </label>
                     </div>
                     <br />
                     <br />
                     <div style={styles.inputDivStyle}>
                        <label >Last name:</label>
                        <input
                           style={styles.inputStyle}
                           type="text"
                           id="lname"
                           name="lname"
                           placeholder={'Last name'}
                           value={this.state.lname}
                           onChange={this.onLastNameChange}
                        />
                     </div>
                     <br />
                     <br />
                     <div style={styles.inputDivStyle}>
                        <label>Birthday:</label>
                        <input
                           style={styles.inputStyle}
                           type="date"
                           id="birthday"
                           name="birthday"
                           value={this.state.birthdayDate}
                           onChange={this.onBirthDateChange}
                        />
                     </div>
                     <br />
                     <br />
                     <div style={styles.inputDivStyle}>
                        <label>Select Gender:</label>
                        <select style={styles.inputStyle} id="gender" value={this.state.gender} onChange={this.onGenderChange}>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                           <option value="others">Others</option>
                        </select>
                     </div>
                     <br />
                     <br />
                     <div style={styles.inputDivStyle}>
                        <input type="checkbox" id="gender1" name="gender1" value="Male" />
                        <label> Male</label>
                        <input type="checkbox" id="gender2" name="gender2" value="Female" />
                        <label> Female</label>
                        <input type="checkbox" id="gender3" name="gender3" value="Others" />
                        <label> Others</label>
                     </div>
                     <div style={styles.inputDivStyle}>
                        <label>
                           Choose profile pic:
                      <input type="file" name='myImage' onChange={this.onProfileImageChange} />
                        </label>
                        {
                           this.state.img.length > 0 ?
                              <img src={this.state.img} style={{ width: 200, height: 200 }}></img>
                              :
                              null
                        }
                     </div>
                     <button
                        onClick={this.onSubmitClick}
                        name="click"
                        type="button"
                        style={styles.btnStyle}
                     >
                        Register
                   </button>
                  </div>
               </form>
            </main>
         </div >
      );
   }
}

const styles = {
   containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   inputDivStyle: {
      width: '100%',
      textAlign: 'center'
   },
   formStyle: {
      /* textAlign: 'center', */
      boxShadow: '1px 0.5px 1px 1px #9E9E9E',
      width: '50%',
      padding: '30px 20px 30px'
   },
   inputStyle: {
      width: '50%',
      padding: 10,
      marginLeft: 20,
   },
   btnStyle: {
      backgroundColor: "blue",
      color: "white",
      fontSize: 22,
      fontWeight: 10000,
      display: "block",
      textAlign: "center",
      padding: '10px 80px 10px',
      marginTop: 16
   }
};

export default Home;