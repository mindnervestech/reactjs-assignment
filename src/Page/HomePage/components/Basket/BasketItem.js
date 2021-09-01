
import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import {getOffer} from '../../../../data';
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 0,
        }
    }

    componentDidMount() {
        let { item } = this.props;
        this.setState({
            qty: item.qty
        });
    }
    updateQty = (item, operation) => {
        let newQty = operation === "plus" ? this.state.qty + 1 : operation === "minus" ? this.state.qty - 1 : 1;

        this.props.updateQty({
            ...item, qty: newQty
        });
        this.setState({
            qty: newQty
        });
        this.props.forceRender();
    }

    render() {

        let { item, cart } = this.props;
        let Offer = getOffer(item, cart)

        return (
            <Grid>
                <Grid className="item" alignContent="center" alignItems="center" container>
                    <Grid item md={3} className="item-name basket-name">
                        {item.name}
                    </Grid>
                    <Grid item md={2} className="item-description">
                        <Grid className="item-price">
                            <span className="currency">£ </span>{parseFloat(item.price).toFixed(2)}
                        </Grid>
                    </Grid>
                    <Grid item md={7} className="item-description">
                        <Grid className="item-price">
                            <Button onClick={() => this.updateQty(item, "plus")} className="basket-button-plus">+</Button>
                            <span className="item-qty">{this.state.qty}</span>
                            <Button disabled={this.state.qty <= 0} onClick={() => this.updateQty(item, "minus")} className="basket-button-minus">-</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="item-subtotal">
                    Item Price <span className="currency">£ </span>{parseFloat(item.price).toFixed(2)} * {item.qty} = <span className="currency">£ </span>{parseFloat(item.price * item.qty).toFixed(2)}
                </Grid>
                <Grid className="border-bottom" />
                {Offer && <Grid>
                    <Grid className="item-saving">
                       Savings {Offer}
                    </Grid>
                    <Grid className="border-bottom" />
                </Grid>}
                <Grid className="item-total">
                    Item Cost<span className="currency">£ </span>{Offer ? parseFloat((item.price * item.qty) - Offer).toFixed(2) :parseFloat(item.price * item.qty).toFixed(2)}
                </Grid>
                <Grid className="border-bottom" />
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateQty: (payload) => dispatch(actions.updateQty(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);
