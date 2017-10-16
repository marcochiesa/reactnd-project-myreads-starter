import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplayShelf from './DisplayShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
	  books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  onMoveBook = (bookId, shelfId) => {
	  this.setState(prevState => {
		  const theBook = prevState.books.filter(book => book.id === bookId)[0];
		  theBook.shelf = shelfId;
		  return {
			  books: prevState.books.filter(book => book.id !== bookId).concat([theBook])
		  }
	  });

	  const theBook = this.state.books.filter(book => book.id ===bookId)[0].id;
	  BooksAPI.update(theBook, shelfId)
  }

  render() {
	  const shelves = [
		  {id: "currentlyReading", title: "Currently Reading"},
		  {id: "wantToRead", title: "Want to Read"},
		  {id: "read", title: "Read"}
	  ];
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
				{shelves.map((shelf) => (
					<DisplayShelf shelfTitle={shelf.title} books={this.state.books.filter(book => shelf.id === book.shelf)} shelves={shelves} onMoveBook={this.onMoveBook} key={shelf.id}/>
				))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
