import React, { PureComponent } from 'react';
import './iteminput.css';

export default class ItemInput extends PureComponent {
    state = {
        content: "",
        rating: 0,
    }

    handleContentChange(event) {
        this.setState({content: event.target.value});
    }

    handleRatingChange(event) {
        this.setState({rating: event.target.value});
    }

    handleOnSubmit(event) {
        event.preventDefault();
        this.props.onInput({content: this.state.content, rating: this.state.rating});
    }

    render() {
        return (
            <form className="form-container" onSubmit={this.handleOnSubmit.bind(this)}>
                <input 
                type="text"
                placeholder="Item Content"
                value={this.state.content}
                onChange={this.handleContentChange.bind(this)}
                />
                <input 
                type="number"
                placeholder="Rating"
                value={this.state.rating}
                onChange={this.handleRatingChange.bind(this)}
                />
                <input
                type="submit"
                value="Add"
                />
            </form>
        );
    }
}
