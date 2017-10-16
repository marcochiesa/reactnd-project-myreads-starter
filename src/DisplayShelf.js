import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class DisplayShelf extends Component {
  static propTypes = {
	  shelfTitle: PropTypes.string.isRequired,
	  shelves: PropTypes.array.isRequired,
      books: PropTypes.array.isRequired
  }

  render() {
	  const { shelfTitle, shelves, books } = this.props;
	  books.sort(sortBy('title'));
	  
	  return (
<div className="bookshelf">
  <h2 className="bookshelf-title">{shelfTitle}</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
		  {books.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
              <div className="book-shelf-changer">
                <select defaultValue={book.shelf}>
                  <option value="none" disabled>Move to...</option>
			  {shelves.map((shelf) => (
				  <option value={shelf.id} key={shelf.id}>{shelf.title}</option>
			  ))}
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
          </div>
        </li>
		  ))}
    </ol>
  </div>
</div>
	  );
  }
}

export default DisplayShelf
