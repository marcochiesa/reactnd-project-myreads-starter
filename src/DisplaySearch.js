import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import DisplayBook from './DisplayBook'

class DisplaySearch extends Component {
    static propTypes = {
		shelves: PropTypes.array.isRequired,
		onMoveBook: PropTypes.func.isRequired
    }

    state = {
		query: '',
		books: []
    }

    updateQuery = (query) => {
		this.setState({ query: query.trim() })
		this.updateBooks(query)
    }

    clearQuery = () => {
		this.setState({ query: '' })
		this.updateBooks('')
    }

	updateBooks = (query) => {
		BooksAPI.search(query, 20).then((books) => {
			 this.setState({ books: Array.isArray(books) ? books : [] })
		})
	}

	render() {
		const { shelves, onMoveBook } = this.props;
		const { query, books } = this.state;

		return (
<div className="search-books">
  <div className="search-books-bar">
  <Link to="/" className="close-search">Close</Link>
    <div className="search-books-input-wrapper">
      {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
      <input
		  type="text"
		  placeholder="Search by title or author"
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
		  />

    </div>
  </div>
  <div className="search-books-results">
    <ol className="books-grid">
		  {books.length ? books.map((book) => (
			  <DisplayBook shelves={shelves} book={book} onMoveBook={onMoveBook} key={book.id}/>
		  )) : (<p>No results</p>)}
	</ol>
  </div>
</div>
	  );
  }
}

export default DisplaySearch