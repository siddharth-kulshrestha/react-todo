import React, { PureComponent } from 'react';
import ItemList from '../ItemList/ItemList';
import ItemInput from '../ItemInput/ItemInput';
import { connect } from 'react-redux'
import { createItem, addMultipleItems, updateRating } from '../../actions'

function getData() {
    console.log("Function to get data called!!");
    return [
        {
            content: "XYZ",
            rating: 6,
        },
        {
            content: "ABC",
            rating: 7,
        },
        {
            content: "PWQ",
            rating: 8,
        },
        {
            content: "MBQ",
            rating: 9,
        },
        {
            content: "CQLAZ",
            rating: 10,
        }
    ];
};

export class TodoBody extends PureComponent {
    state = {
        data: [],
    }

    componentDidMount() {
        const externalData = getData();
        // this.setState({data: externalData.slice()});
        this.props.dispatch(addMultipleItems(externalData))
    }

    onInputItem(item) {
        console.log(item);
        this.props.dispatch(createItem(item));
    }

    onItemRatingChange(id, newRating) {
        this.props.dispatch(updateRating(id, newRating))
    }

    render() {
        console.log('Props:');
        console.log(this.props);
        return (
            <div className="todo-body-container">
                <ItemInput onInput={this.onInputItem.bind(this)} />
                {this.props.data ? <ItemList data={this.props.data} onRatingChange={this.onItemRatingChange.bind(this)} /> : null}
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    console.log('Servicedetails mapStatetoprops =',store );
    return {
        data: store.items,
    };
};

export default connect(mapStateToProps)(TodoBody)
