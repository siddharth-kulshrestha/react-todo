import React, { PureComponent } from 'react';
import './itemlist.css';
import Item from '../Item/Item';

export default class ItemList extends PureComponent {

    render() {
        const { data } = this.props; 
        return (
            <div className="item-list-container">
                {data.map((item) => (
                    <Item data={item} onRatingChange={this.props.onRatingChange} />
                ))}
            </div>
        )
    }
}
