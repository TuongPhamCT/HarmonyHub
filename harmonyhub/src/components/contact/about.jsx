import React from 'react';
import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import './contact.css';

const AboutPage = () => {

    return (
        <div className="contactpage">
            <br />
            <br />
            <br />
            <br />
            <div className="header">
                <label className="gradient-label">ABOUT US</label>
            </div>
            <div className="content">
                <p className="paragraph">
                    <p>Welcome to HARMONY HUB - the ultimate platform for music lovers!
                    We are built with the mission to provide the best music streaming experience for everyone. With a diverse library of songs from around the globe, 
                    we are not only a place to find your favorite tracks but also a hub to explore new music trends.</p>
                    <br />
                    <h2>What makes us special:</h2>
                    <li>
                        <strong>Extensive music library: </strong>
                        From Pop, Rock, Jazz to timeless classical compositions.
                    </li>
                    <li>
                        <strong>Personalized experience: </strong>
                        Music recommendations tailored to your taste.
                    </li>
                    <li>
                        <strong>Seamless listening: </strong>
                        High-quality streaming anytime, anywhere.
                    </li>
                    <li>
                        <strong>Community-driven: </strong>
                        Connect with artists and fellow music enthusiasts.
                    </li>
                    <br />
                    <h2>Developer Team:</h2>
                    <li> <strong>Pham Thanh Tuong</strong></li>
                    <li> <strong>Huynh Danh Quang</strong></li>
                    <li> <strong>Tat Huy Thanh</strong></li>
                    <li> <strong>Pham Tan Dat</strong></li>
                    <li> <strong>Nguyen Hoang Bach</strong></li>
                    <br />
                    <p>Thank you for choosing HARMONY HUB as your go-to music destination. Let's embark on this musical journey together!</p>
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
