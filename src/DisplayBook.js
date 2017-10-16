import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayBook extends Component {
  static propTypes = {
	  shelves: PropTypes.array.isRequired,
	  book: PropTypes.object.isRequired,
	  onMoveBook: PropTypes.func.isRequired
  }

  render() {
	  const { shelves, book, onMoveBook } = this.props;

	  return (
<li key={book.id}>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
      <div className="book-shelf-changer">
        <select defaultValue={book.shelf} onChange={event => onMoveBook(book.id, event.target.value)}>
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
  );
  }
}

export default DisplayBook