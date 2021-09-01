
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import {Products} from '../../../../data';
import Item from './listItem';

class List extends Component {

    render() {
        return (
            <Grid className="list">
                <h2>Products</h2>
                <Grid className="border-bottom" />
                {
                    Products && Products.map((product, index) => {
                        return(
                            <Grid key={`${product.id}-${index}`} className="product">
                                <Item item={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }
}

export default List;
