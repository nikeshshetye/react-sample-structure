import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// import FullscreenLoader from 'fullscreenLoader';
import Post from './Post';
import Home from './Home';
import About from './About';
import { requestAppData } from '../actions/actionCreators';

// toast.configure();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Post" component={Post} />
                    <Route path="/about" component={About} />
                </Switch>
                
                <button type="button" onClick={() => {
                    toast('Wow so easy !');
                    toast.success('Wow so easy !');
                    toast.success("Hello", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    toast.info("World", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    })
                    toast.warn(<img />)
                    toast.error(<img />)
                    // toast.dismiss() // Remove all toasts 
                }}>Toasts</button>
                <ToastContainer /> {/* required */}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ app }) => {
    const { userDate } = app;
    return {
        userDate
    };
};

export default connect(
    mapStateToProps,
    {
        requestAppData
    },
)(App);
