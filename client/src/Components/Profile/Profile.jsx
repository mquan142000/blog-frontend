import { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import { useLocation, Link } from 'react-router-dom';
import "../Profile/profile.css";

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedEmail = localStorage.getItem('email');

    setFirstName(searchParams.get('firstName') || storedFirstName || '');
    setLastName(searchParams.get('lastName') || storedLastName || '');
    setEmail(searchParams.get('email') || storedEmail || '');
  }, [location]);

  return (
    <>
      <SideBar />
      <section>
        <section className="profile-container">
          <section className="profile-details">
            <h1>Your Profile</h1>
            <p className="profile-loc">First Name: {firstName}</p>
            <p className="profile-loc">Last Name: {lastName}</p>
            <p className="profile-loc">Email: {email}</p>
            <Link to="/settings"><button className="animated-btn mt-6">Update profile</button></Link>
          </section>
        </section>
      </section>
    </>
  );
};

export default Profile;
