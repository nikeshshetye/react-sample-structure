import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import FullscreenLoader from 'fullscreenLoader';
import Post from './Post';
import Home from './Home';
import About from './About';
import { requestAppData } from '../actions/actionCreators';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <Fragment>
                {/* <div>
                  <div><Link to="/">Home</Link></div>
                  <div><Link to="/Post">Post</Link></div>
               </div> */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Post" component={Post} />
                    <Route path="/about" component={About} />
                </Switch>
                {/* 
                    // Toast Documentation
                    // https://github.com/fkhadra/react-toastify#toastcontainer
                    // import { toast } from 'react-toastify';
                    // toast.success('Wow so easy !');
                    // toast.success("Hello", options) // add type: 'success' to options
                    // toast.info("World", options) // add type: 'info' to options
                    // toast.warn(<Img />, options) // add type: 'warning' to options
                    // toast.error(<Img />, options) // add type: 'error' to options
                    // toast.dismiss() // Remove all toasts ! 
                */}
                <ToastContainer
                    hideProgressBar
                    closeButton={true}
                    newestOnTop
                    autoClose={5000}
                />
                {/* {this.state.showLoader ? (
                    <FullscreenLoader hasTransparentBg />
                ) : null} */}
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
