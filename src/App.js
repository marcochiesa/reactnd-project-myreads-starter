import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplayShelf from './DisplayShelf'
import DisplaySearch from './DisplaySearch'

class BooksApp extends React.Component {
  state = {
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
        <Route path='/search' render={() => (
			<DisplaySearch shelves={shelves} onMoveBook={this.onMoveBook}/>
        )}/>
		<Route exact path='/' render={() => (
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
				<Link to="/search">Add a book</Link>
            </div>
          </div>
		)}/>
      </div>
    )
  }
}

export default BooksApp
