import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar position={'fixed'}>
                    <Toolbar>
                        <Typography>
                            About
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default About;
