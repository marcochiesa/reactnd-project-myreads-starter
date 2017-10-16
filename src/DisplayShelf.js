import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import DisplayBook from './DisplayBook'

class DisplayShelf extends Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        shelves: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { shelfTitle, shelves, books, onMoveBook} = this.props;
        books.sort(sortBy('title'));

        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => (
                  <DisplayBook shelves={shelves} book={book} onMoveBook={onMoveBook} key={book.id}/>
                ))}
              </ol>
            </div>
          </div>
        );
    }
}

export default DisplayShelf
