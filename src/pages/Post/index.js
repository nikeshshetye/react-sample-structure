import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, TextField, Avatar, List, ListItem, ListItemText, ListItemAvatar, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';

import { postToServer } from '../../actions/actionCreators';

class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            addPostModal: false,
            img: '',
            list: [],
            switchList: false,
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
    }

    onProfileImageChange = (event) => {
        console.log('onProfileImageChange', event.target.files[0]);
        this.setState({
            img: URL.createObjectURL(event.target.files[0])
        });
    }

    render() {

        return (
            <div className='main'>
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
                <br />
                <Button variant="outlined" color="secondary"
                    onClick={() => {
                        this.setState({
                            switchList: !this.state.switchList
                        });
                    }}>
                    Change display type
                </Button>

                {
                    this.state.switchList ?
                        <List>
                            {
                                this.state.list.map((item, index) => {
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
                                this.state.list.map((item) => (
                                    <GridListTile
                                        style={{
                                            boxShadow: '1px 0.5px 1px 1px #9E9E9E',
                                            width: '20%',
                                            margin: 15
                                        }}
                                    >
                                        <ListItemAvatar>
                                            {/* <Avatar alt="Avatar" src={item.avatar} /> */}
                                            <img src={item.avatar} />
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
                            <TextField id="outlined-basic" label="Add Description to your post" variant="outlined" />
                        </form>
                        <br /><br />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                this.props.postToServer({
                                    "name": "Sujay",
                                    "avatar": "https://cdn.dribbble.com/users/458522/screenshots/4697060/ironman.jpg",
                                    "desc": "Product Description",
                                    "feed_img": {
                                        "name": "https://vignette.wikia.nocookie.net/ironman/images/8/89/Iron_man_mark_85.png/revision/latest?cb=20191020193716"
                                    }
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
    // const { cartItems } = state;
    // return{
    //     cartItems,
    // }
    return { post: state };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         postToServer: (object) => { dispatch(postToServer(object)) },
//     }
// }

export default connect(mapStateToProps, { postToServer })(Post);
