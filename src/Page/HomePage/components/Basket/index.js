
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Item from './BasketItem';
import { connect } from "react-redux";

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            forceRender : 0
        };
    }

    forceRender  = () => {
        this.setState({forceRender: this.state.forceRender + 1});
    }
    render() {
        let { cart, count } = this.props;
        let subtotal = 0;
        let total = 0;
        let saving = 0;
        cart.forEach((item) => {
            subtotal = subtotal + parseFloat(item.price * item.qty);
            total = total + parseFloat(item.cost);
            saving = item.saving ? saving + parseFloat(item.saving) : saving;
        })
        return (
            <Grid className="list">
                <h2>Basket</h2>
                <Grid className="border-bottom" />
                {cart && count > 0 ? <Grid className="basket-item-container">
                    {
                        cart && cart.map((product, index) => {
                            return (
                                <Grid key={`${product.id}-${index}`} className="product">
                                    <Item item={product} forceRender={this.forceRender} />
                                </Grid>
                            )
                        })
                    }
                    <Grid className="item">
                        <Grid className="basket-parameter">
                            <Grid className="item-name  basket-name">
                                Sub Total
                            </Grid>
                            <Grid className="item-description  basket-name">
                                <span className="currency">£ </span>{parseFloat(subtotal).toFixed(2)}
                            </Grid>
                        </Grid>
                        <Grid className="basket-parameter">
                            <Grid className="item-name  basket-name">
                                Saving
                            </Grid>
                            <Grid className="item-description  basket-name">
                                <span className="currency">£ </span>{parseFloat(saving).toFixed(2)}
                            </Grid>
                        </Grid>
                        <Grid className="basket-parameter">
                            <Grid className="item-name  basket-name">
                                Total
                            </Grid>
                            <Grid className="item-description  basket-name">
                                <span className="currency">£ </span>{parseFloat(total).toFixed(2)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> :
                    <Grid>
                        <h3>
                            No Items in Your Basket.
                        </h3>
                    </Grid>}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.appReducer.cart,
        count: state.appReducer.cartCount
    }
};

export default connect(
    mapStateToProps,
    null
)(List);
