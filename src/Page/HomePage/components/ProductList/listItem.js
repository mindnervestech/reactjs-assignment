
import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
class Item extends Component {

    render() {

        let { item, cart } = this.props;
        let inCart = cart && cart.find( ({ id }) => id === item.id );

        return (
            <Grid className="item">
                <Grid className="item-name">
                    {item.name}
                </Grid>
                <Grid className="item-description">
                    <Grid className="item-price">
                        <span className="currency">£ </span>{parseFloat(item.price).toFixed(2)}
                        <Button disabled={inCart !== undefined} onClick={() => this.props.addToCart(item)} className="add-button">Add</Button>
                    </Grid>
                </Grid>
                <Grid className="border-bottom" />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart : state.appReducer.cart,
        count : state.appReducer.cartCount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (payload) => dispatch(actions.addToCart(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);
