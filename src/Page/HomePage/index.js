
import React, { Component } from "react";
import List from './components/ProductList';
import Basket from './components/Basket';
import {Grid} from '@material-ui/core';

class HomePage extends Component {

    render() {
        return (
            <div className="homepage">
                <Grid container className="page-container">
                    <Grid item md={4} xs={12} className="list-container">
                        <List />
                    </Grid>
                    <Grid item md={7} xs={12} className="list-container">
                        <Basket />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default HomePage;
