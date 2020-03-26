import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Button, Modal, TextField, Avatar, List, ListItem, ListItemText, ListItemAvatar, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';

import { postToServer, getFromServer } from '../../actions/actionCreators';
import { POST_DATA, GET_DATA } from '../../actions/actionsTypes';
import Home from '../Home';

class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            addPostModal: false,
            img: '',
            list: [],
            switchList: false,
            allData: [],
            postDesc: '',
            addedList: [],
            toHome: false,
        }
    }

    componentDidMount() {
        const list = [];
        for (let i = 0; i <= 5; i++) {
            list.push({
                id: 1,
                createdAt: '2020-03-24T04:03:13.853Z',
                name: 'name 1',
                avatar: 'https://thumbs.dreamstime.com/z/love-palm-13888257.jpg',
                desc: 'desc 1',
                feed_img: {}
            });
        }
        this.setState({
            list
        });

        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                //   this.loadMoreItems();
                console.log('scroll end');
            }
        });
    }

    onProfileImageChange = (event) => {
        console.log('onProfileImageChange', event.target.files[0]);
        this.setState({
            img: URL.createObjectURL(event.target.files[0])
        });
    }

    onDescriptionChange = (event) => {
        console.log('onDescriptionChange', event.target.value);
        this.setState({
            postDesc: event.target.value
        });
    }

    static getDerivedStateFromProps(props, prevState) {
        console.log('getDerivedStateFromProps', props, prevState);
        console.log('getDerivedStateFromProps alldata', props.post);
        if (props.post.success) {
            console.log('success alldata', props.post);
            if (props.post.type === POST_DATA) {

            } else if (props.post.type === GET_DATA) {
                console.log('GET_DATA alldata', props.post);
                return {
                    allData: props.post.data,
                }
            }
        }
        return null;
    }

    render() {
        console.log('state in render', this.state.allData);
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div className='main' ref="iScroll">
                {/* <Button variant="contained">Post</Button>
            <Button variant="contained" color="primary">Post</Button> */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        this.setState({
                            addPostModal: true,
                        })
                    }}
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        localStorage.setItem('loggedIn', false);
                        localStorage.removeItem('fname');
                        localStorage.removeItem('lname');
                        localStorage.removeItem('birthdayDate');
                        localStorage.removeItem('gender');
                        localStorage.removeItem('img');

                        this.setState({
                            toHome: true
                        })
                    }}
                >
                    Log Out
                </Button>
                <br />
                <br />
                <br />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        this.props.getFromServer();
                    }}
                >
                    Display Posts
                </Button>

                <Button variant="outlined" color="secondary"
                    onClick={() => {
                        this.setState({
                            switchList: !this.state.switchList
                        });
                    }}>
                    Change display type
                </Button>
                {/* <CircularProgress color="secondary" /> */}
                {
                    this.state.switchList ?
                        <List>
                            {
                                this.state.allData.map((item, index) => {
                                    return (
                                        <ListItem
                                            button
                                            key={item.id}
                                            onPress={() => { console.log('list item click') }}
                                            style={{
                                                flexDirection: 'column',
                                                boxShadow: '1px 0.5px 1px 1px #9E9E9E',
                                                width: '20%',
                                                margin: 15
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar alt="Avatar" src={item.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name} />
                                            <ListItemText primary={item.desc} />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                        :
                        <GridList cellHeight={200}>
                            <GridListTile cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">Posts</ListSubheader>
                            </GridListTile>
                            {
                                this.state.addedList.map((item) => (
                                    <GridListTile
                                        style={{
                                            boxShadow: '1px 0.5px 1px 1px #9E9E9E',
                                            width: '20%',
                                            margin: 15
                                        }}
                                    >
                                        <ListItemAvatar>
                                            {/* <Avatar alt="Avatar" src={item.avatar} /> */}
                                            <img src={item.feed_img} />
                                        </ListItemAvatar>
                                        <GridListTileBar
                                            title={item.desc}
                                            subtitle={<span>by: {item.name}</span>}
                                        />
                                    </GridListTile>
                                ))
                            }
                        </GridList>
                }
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addPostModal}
                    onClose={() => {
                        this.setState({
                            addPostModal: false,
                        });
                    }}
                >
                    <div style={{ backgroundColor: 'white', width: '80%', justifyContent: 'center', padding: 10, alignSelf: 'center', margin: 20 }}>
                        <h2 id="simple-modal-title">Post to your App</h2>
                        <form /* className={classes.root} */ noValidate autoComplete="off">
                            {/* <TextField id="standard-basic" label="Standard" />
                            <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                            {/* {content()} */}
                            <label>
                                Choose profile pic:
                            </label>
                            <br />
                            <TextField
                                type="file"
                                name='myImage'
                                variant="outlined"
                                onChange={this.onProfileImageChange}
                            />
                            {
                                this.state.img.length > 0 ?
                                    <img src={this.state.img} style={{ width: 200, height: 200 }}></img>
                                    :
                                    null
                            }
                            <br /><br />
                            <TextField
                                id="outlined-basic"
                                label="Add Description to your post"
                                variant="outlined"
                                value={this.state.postDesc}
                                onChange={this.onDescriptionChange}
                            />
                        </form>
                        <br /><br />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                this.props.postToServer({
                                    "name": localStorage.getItem('fname') || '',
                                    "avatar": "https://cdn.dribbble.com/users/458522/screenshots/4697060/ironman.jpg",
                                    "desc": this.state.postDesc,
                                    "feed_img": this.state.img
                                });
                                const addedList = this.state.addedList;
                                addedList.push({
                                    name: localStorage.getItem('fname') || '',
                                    avatar: "https://cdn.dribbble.com/users/458522/screenshots/4697060/ironman.jpg",
                                    desc: this.state.postDesc,
                                    feed_img: this.state.img
                                });
                                this.setState({
                                    postDesc: '',
                                    img: '',
                                    addedList
                                })
                            }}
                        >
                            Post
                </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ marginLeft: 15 }}
                            onClick={() => {
                                this.setState({
                                    addPostModal: false,
                                })
                            }}
                        >
                            close
                </Button>
                    </div>
                </Modal>
                {/* <Button variant="contained" disabled>Post</Button>
            <Button variant="contained" color="primary" href="#contained-buttons">Post</Button> */}
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state in mapsstate to props', state);
    const { postReducer } = state;
    // return{
    //     cartItems,
    // }
    return { post: postReducer };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         postToServer: (object) => { dispatch(postToServer(object)) },
//     }
// }

export default connect(mapStateToProps, { postToServer, getFromServer })(Post);
