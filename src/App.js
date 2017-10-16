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
  
  onMoveBook = (book, shelfId) => {
	  this.setState(prevState => {
		  let books = prevState.books.filter(b => true)
		  let theBook = books.filter(b => b.id === book.id)[0]
		  if (!theBook) {
		  	theBook = book
			books = books.concat([theBook]) //add new book from search
		  }
		  theBook.shelf = shelfId
		  return { books }
	  });

	  BooksAPI.update(book, shelfId)
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
			<DisplaySearch shelves={shelves} onMoveBook={this.onMoveBook} shelfInfo={this.state.books.map(book => {return {bookId: book.id, shelfId: book.shelf}})}/>
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
