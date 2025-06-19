
import React from 'react';
import './View.css';
import { useLocation } from 'react-router-dom';
import Heart from '../../assets/Heart';
import Footer from '../Footer/Footer';
import Arrow from '../../assets/Arrow'

function View() {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <p style={{ padding: '20px' }}>No product data found.</p>;
  }

  

  return (
    <>
      





      <div className="viewParentDiv">

       


        <div className="imageShowDiv" style={{width:'800px' , height: '400px',  margin: '0 auto', backgroundColor:'black', display:'flex', justifyContent:'center',alignItems:'center' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '50%', height: '80%',borderRadius:'4px'}}
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <div className="price-heart" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&#x20B9; {product.price}</p>
              <Heart />
            </div>
           

            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>{product.name}</span>
            <p>{product.category}</p>
            <span>{product.createdAt}</span>
          </div>

          <div className="contactDetails">
            <p style={{ fontWeight: 'bold' }}>Seller details</p>
            <p>{product.sellerName || 'No name provided'}</p>
            <p>{product.phone || 'No phone number'}</p>
          </div>

         
        </div>
         </div>

         <div className="disclaimerBox" style={{ marginTop: '50px', backgroundColor: '#f9f9f9',marginBottom:'50px'}}>
            <p style={{ fontSize: '0.9rem', color: '#555', paddingLeft:'8%' , paddingRight:'8%' }}>
            <strong>Disclaimer:</strong> Please note that OLX serves as online marketplace and intermediary and merely providing the platform to the listers to list their businesses. The products listed on our platform are provided by third party i.e listers with the pricing marked at their discretion. We do not verify the authenticity or quality of these products, and we make no representations or warranties regarding their genuineness. By using our platform, you acknowledge that any purchase made is at your own risk, and we are not liable for any issues related to product authenticity, quality, or performance. We encourage users to exercise caution and discretion before making any payments to the listers.
            </p>
          </div>


     

      <Footer />
    </>
  );
}

export default View;
