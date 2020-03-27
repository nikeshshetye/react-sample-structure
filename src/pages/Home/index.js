import React from 'react';

import { Redirect } from "react-router-dom";
import {
   AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
   Typography, TextField
} from '@material-ui/core';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { InboxIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon } from '@material-ui/icons';
// import clsx from 'clsx';
import Post from '../Post';

const navDrawerList = [{ id: 1, name: 'Home', link: '/' }, { id: 2, name: 'About', link: '/about' },
{ id: 3, name: 'Shopping', link: '/shopping' }, { id: 4, name: 'Posts', link: '/Post' }];

const currentRedirect = '/';

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         fname: '',
         lname: '',
         birthdayDate: '',
         gender: '',
         img: '',
         isDrawerOpen: false,
         redirectTo: currentRedirect,
         errors: {
            fname: '',
            email: '',
            lname: '',
         }
      }

      const data = localStorage.getItem('loggedIn');
      if (data !== undefined && data !== null) {
         console.log('local:', data);
      }
   }

   componentDidMount() {
      console.log('m here in home', localStorage.getItem('loggedIn'));
      const loggedIn = localStorage.getItem('loggedIn') || false;
      if (localStorage.getItem('loggedIn') === true) {
         console.log('i entered home');
         this.setState({
            redirectTo: '/Post',
         })
      }
   }

   onTextChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;

      switch (name) {
         case 'fname':
            errors.fname =
               value.length < 3
                  ? 'First Name must be 3 characters long!'
                  : '';
            break;
         /* case 'email':
            errors.email =
               validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
            break; */
         case 'lname':
            errors.lname =
               value.length < 3
                  ? 'Last Name must be 3 characters long!'
                  : '';
            break;
         default:
            break;
      }

      this.setState({ errors, [name]: value }, () => {
         console.log(errors)
      })
   }

   onBirthDateChange = (event) => {
      this.setState({ birthdayDate: event.target.value });
   }

   onGenderChange = (event) => {
      this.setState({ gender: event.target.value });
   }

   validateForm(errors) {
      let valid = true;
      Object.values(errors).forEach(
         // if we have an error string set valid to false
         (val) => val.length > 0 && (valid = false)
      );
      return valid;
   }

   onSubmitClick = (event) => {
      event.preventDefault();
      if (this.validateForm(this.state.errors)) {
         console.info('Valid Form')
      } else {
         console.error('Invalid Form')
         return;
      }

      console.log('Form submitted, Data: ');
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('fname', this.state.fname);
      localStorage.setItem('lname', this.state.lname);
      localStorage.setItem('birthdayDate', this.state.birthdayDate);
      localStorage.setItem('gender', this.state.gender);
      localStorage.setItem('img', this.state.img);
      this.setState({
         redirectTo: '/Post'
      })
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
      if (this.state.redirectTo !== currentRedirect) {
         return <Redirect to={this.state.redirectTo} />
      }
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
                     <div style={{ width: 50, height: 50, backgroundColor: 'red' }} />
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
                     navDrawerList.map((item, index) => {
                        return (
                           <ListItem button key={item.id} onClick={() => {
                              console.log('history', item.link, this.props.history);
                              // this.props.history.push(item.link);
                              this.setState({
                                 redirectTo: item.link,
                              });
                           }}>
                              {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
                              <ListItemText primary={item.name} />
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
                           <TextField id="outlined-basic" label="First name" variant="outlined"
                              style={styles.inputStyle}
                              type="text"
                              id="fname"
                              name="fname"
                              value={this.state.fname}
                              onChange={this.onTextChange}
                              error={this.state.errors.fname.length > 0}
                              helperText={this.state.errors.fname}
                           />
                        </label>
                     </div>
                     <br />
                     <br />
                     <div style={styles.inputDivStyle}>
                        <label >Last name:</label>
                        <TextField id="outlined-basic" label="Last name" variant="outlined"
                           style={styles.inputStyle}
                           type="text"
                           id="lname"
                           name="lname"
                           value={this.state.lname}
                           onChange={this.onTextChange}
                           error={this.state.errors.lname.length > 0}
                           helperText={this.state.errors.lname}
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