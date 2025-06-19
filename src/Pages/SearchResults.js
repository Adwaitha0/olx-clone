import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FirebaseContext } from '../store/Context';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const { firebase } = useContext(FirebaseContext);
  const [results, setResults] = useState([]);
  const query = useQuery().get('query')?.toLowerCase();

  useEffect(() => {
    if (query) {
      firebase.firestore().collection('products').get().then((snapshot) => {
        const matched = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(product =>
            product.name?.toLowerCase().includes(query) ||
            product.title?.toLowerCase().includes(query)
          );
        setResults(matched);
      });
    }
  }, [firebase, query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        results.map(product => (
          <div key={product.id}>
            <h3>{product.name || product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <p>No matching products found.</p>
      )}
    </div>
  );
}

export default SearchResults;
