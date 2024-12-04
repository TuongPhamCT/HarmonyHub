import React from 'react';
import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import './contact.css';

const SocialMediaPage = () => {

    return (
        <div className="contactpage">
            <br />
            <br />
            <br />
            <br />
            <div className="header">
                <label className="gradient-label">OUR SOCIAL MEDIA</label>
            </div>
            <div className="content">
                <p className="paragraph">
                    <p>Stay connected and never miss a beat! Follow us on our social media platforms for updates, music news, and exclusive content:</p>
                    <li>
                        <strong>Facebook: </strong>
                        <a href="https://www.facebook.com/">www.facebook.com</a>
                    </li>
                    <li>
                        <strong>Instagram: </strong>
                        <a href="https://www.instagram.com/">www.instagram.com</a>
                    </li>
                    <li>
                        <strong>Twitter: </strong>
                        <a href="https://x.com/home">www.x.com</a>
                    </li>
                    <li>
                        <strong>Whats App: </strong>
                        <a href="https://www.whatsapp.com/">www.whatsapp.com</a>
                    </li>
                    <br />
                    <p>Join our community, share your playlists, and discover new music alongside fans from all over the world. Don’t forget to tag us and use our hashtag
                        <strong> #HarmonyHub</strong> to get featured!
                    </p>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default SocialMediaPage;
