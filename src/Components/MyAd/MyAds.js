import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import './MyAd.css'; 

function MyAds() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);  
  const navigate = useNavigate();
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMyAds = async () => {
      try {
        const snapshot = await firebase.firestore()
          .collection('products')
          .where('userId', '==', user.uid)  
          .get();

        const ads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMyAds(ads);
      } catch (error) {
        console.error('Error fetching user ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [firebase, user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmDelete) return;

    try {
      await firebase.firestore().collection('products').doc(id).delete();
      setMyAds(myAds.filter(ad => ad.id !== id));
      alert('Ad deleted successfully');
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Failed to delete the ad');
    }
  };

  const handleEdit = (ad) => {
    navigate(`/edit/${ad.id}`, { state: { product: ad } });
  };

  if (loading) return <p>Loading your ads...</p>;

  if (!user) return <p>Please login to see your ads.</p>;

  return (
    <div className="myAdsParentDiv">
      <h2>My Ads</h2>
      {myAds.length === 0 ? (
        <p>You have no ads posted yet.</p>
      ) : (
        <div className="adsContainer">
          {myAds.map(ad => (
            <div key={ad.id} className="adCard">
              <img src={ad.imageUrl} alt={ad.name} className="adImage" />
              <div className="adDetails">
                <h3>{ad.name}</h3>
                <p>Category: {ad.category}</p>
                <p>Price: &#x20B9; {ad.price}</p>
                <p>Posted on: {ad.createdAt}</p>
              </div>
              <div className="adActions">
                <button onClick={() => handleEdit(ad)}>Edit</button>
                <button onClick={() => handleDelete(ad.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAds;
