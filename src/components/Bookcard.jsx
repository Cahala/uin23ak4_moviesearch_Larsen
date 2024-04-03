import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookCard(/*{book}*/) {
  //const [info, setInfo] = useState()

  const [bookDetails, setBookDetails] = useState(null)
  const { bookKey } = useParams()

  const amazonSearchUrl = `https://www.amazon.com/s?k=${book.isbn ? book.isbn[0] : book.title.replace(/\s+/g, '+')}`;


  useEffect(() => {
    // Make sure the API endpoint is correct and allows retrieving data using the 'key'
    fetch(`https://openlibrary.org/search.json?title=${bookKey}.json`)
        .then(response => response.json())
        .then(data => {
            // Make sure to adapt this depending on the data structure
            setBookDetails(data);
        })
        .catch(error => {
            console.error(error);
            setBookDetails({});
        })
}, [bookKey])

if (!bookDetails) {
    return <p>Laster inn...</p>
}


  //const getCoverImageUrl = (isbn) => isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg` : ''
  //https://covers.openlibrary.org/a/olid/OL23919A-s.jpg -- SKRIVE OM ANNEN 
  // Hjelpefunksjon for å hente bilde URL basert på ISBN
  
  /*const getInformation = async() => {
    fetch(`https://openlibrary.org/search.json?&title=${(bookTitle)}`)
    .then(response => response.json())
    .then (data => setInfo(data))
    .catch(error => console.error(error))
  }

  useEffect(()=>{
    getInformation ()
  },[bookTitle])*/


    return (
      <article className="bookCard">
        <h3>{book.title}</h3>
        {book.isbn && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`} alt={`Cover of ${book.title}`} />}
        <p>Author: {book.author_name?.join(", ")}</p>
        <p>First published year: {book.first_publish_year}</p>
        <p>Average Rating: {book.ratings_average || 'Ingen vurdering'}</p>
        <a href={amazonSearchUrl} target="_blank" rel="noopener noreferrer">Read more on Amazon</a>
      </article>
    )
  }