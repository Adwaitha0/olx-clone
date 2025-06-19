

import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom'; 
import Heart from '../../assets/Heart';
import './Post.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Posts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const query = useQuery().get('search')?.toLowerCase();

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (query) {
          const filtered = allProducts.filter((product) =>
            product.name?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query)
          );
          setProducts(filtered);
        } else {
          setProducts(allProducts);
        }
      });
  }, [firebase, query]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id} 
              onClick={() => navigate(`/product-detail`, { state: { product } })}
             // onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
           >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p style={{ padding: '20px' }}>No products found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
