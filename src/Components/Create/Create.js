import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';

const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null);



const [sellerName, setSellerName] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');









 

  const handleSubmit = () => {

  //   if (!name || !category || !price || !sellerName || !phoneNumber || !image) {
  //   alert("Please fill all the fields and upload an image.");
  //   return;
  // }

if (!name.trim()) {
    alert("Please enter the product name.");
    return;
  }

  if (!category.trim()) {
    alert("Please enter a category.");
    return;
  }

  if (!price || isNaN(price) || Number(price) <= 0) {
    alert("Please enter a valid price.");
    return;
  }

  if (!sellerName.trim()) {
    alert("Please enter the seller name.");
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number starting with 6-9.");
    return;
  }

  if (!image) {
    alert("Please upload an image.");
    return;
  }








  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "olx_unsigned"); 
  data.append("cloud_name", "dbihwkxmf");

  fetch("https://api.cloudinary.com/v1_1/dbihwkxmf/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      const imageUrl = data.url;
      console.log("Image uploaded to Cloudinary:", imageUrl);

      firebase.firestore().collection("products").add({
        name,
        category,
        price,
        imageUrl,
        sellerName,
        phone: phoneNumber,
        createdAt: new Date().toDateString()
      }).then(() => {
        alert("Product added successfully!");
      });
    })
    .catch((err) => {
      console.log("Upload Error:", err);
    });
};












  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
        
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
        
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
            className="input"
             type="number" 
             id="price" 
             value={price}
              onChange={(e)=>setPrice(e.target.value)}
             name="Price" 
             />
            <br />


            <label htmlFor="sellerName">Seller Name</label>
<br />
<input
  className="input"
  type="text"
  id="sellerName"
  value={sellerName}
  onChange={(e) => setSellerName(e.target.value)}
  name="sellerName"
/>
<br />

<label htmlFor="phoneNumber">Phone Number</label>
<br />
<input
  className="input"
  type="text"
  id="phoneNumber"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  name="phoneNumber"
/>
<br />












          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit}  className="uploadBtn">upload and Submit</button>
          
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
