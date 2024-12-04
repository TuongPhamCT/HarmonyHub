import React from 'react';
import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import './contact.css';

const SupportPage = () => {

    return (
        <div className="contactpage">
            <br />
            <br />
            <br />
            <br />
            <div className="header">
                <label className="gradient-label">SUPPORT CENTER</label>
            </div>
            <div className="content">
                <p className="paragraph">
                    <p>Need help? We're here for you!</p>
                    <br />
                    <h2>How Can We Help You?</h2>
                    <li>
                        <strong>FAQs: </strong>
                        Find answers to common questions in our FAQ Section.
                    </li>
                    <li>
                        <strong>Technical Support: </strong>
                        Facing issues with the platform? Contact us directly.
                    </li>
                    <li>
                        <strong>Feedback & Suggestions: </strong>
                        We value your input. Let us know how we can improve your experience.
                    </li>
                    <br />
                    <h2>Contact Us:</h2>
                    <li>
                        <strong>Email: </strong>
                        21522775@gm.uit.edu.vn
                    </li>
                    <li>
                        <strong>Phone: </strong>
                        0123456789
                    </li>
                    <li>
                        <strong>Live Chat: </strong>
                        Available 24/7 via the "Support" button on our website.
                    </li>
                    <br />
                    <p>We aim to respond to all inquiries within 24 hours. Thank you for choosing <strong>Harmony Hub</strong>!</p>
                </p>
            </div>
            <Footer/>
        </div>
    );
};

export default SupportPage;
