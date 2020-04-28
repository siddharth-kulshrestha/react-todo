import React, { PureComponent } from 'react';
import './item.css';
import { Button } from '../Button/Button';

class RateItem extends PureComponent {

    state = {
        rating: 0,
    };

    componentDidMount() {
        if (this.props.rating !== undefined) {
            this.setState({rating: this.props.rating});
        }
    }

    onDecreaseRating() {
        this.setState((prevState) => ({rating: prevState.rating - 1}), this.onRatingChange);
    }

    onIncreaseRating() {
        this.setState((prevState) => ({rating: prevState.rating + 1}), this.onRatingChange);
    }

    onRatingChange() {
        if (this.props.onRatingChange) {
            this.props.onRatingChange(this.state.rating);
        }
    }

    render() {
        return (
            <div className="rating-container">
                <Button onClick={this.onDecreaseRating.bind(this)} text="-"/> {this.state.rating} <Button onClick={this.onIncreaseRating.bind(this)} text="+"/>
            </div>
        );
    }
}

export default class Item extends PureComponent {
    render() {
        console.log("Item-ID: "+this.props.data.id);
        console.log(this.props);
        return (
            <div className="item-container">
                <div className="item-content"><h3>{this.props.data.item.content}</h3></div> 
                <div className="item-rate-handler"><RateItem onRatingChange={(val) => {this.props.onRatingChange(this.props.data.item.id, val)}} rating={this.props.data.item.rating}/></div>
            </div>
        );
    }
}

