import React from 'react';
import '../../components/Global.css';
import Footer from '../MainPage/Footer';
import './contact.css';

const PolicyPage = () => {

    return (
        <div className="contactpage">
            <br />
            <br />
            <br />
            <br />
            <div className="header">
                <label className="gradient-label">PRIVATE & POLICY</label>
            </div>
            <div className="content">
                <p className="paragraph">
                    <p>At HARMONY HUB, your privacy and trust are our top priorities.</p>
                    <br />
                    <h2>Key Highlights of Our Policy:</h2>
                    <li>
                        <strong>Data Protection:  </strong>
                        We securely handle and store your personal information.
                    </li>
                    <li>
                        <strong>Transparency: </strong>
                        We clearly outline how your data is collected and used.
                    </li>
                    <li>
                        <strong>User Rights: </strong>
                        You have full control over your data and can request access or deletion at any time.
                    </li>
                    <li>
                        <strong>Cookies: </strong>
                        We use cookies to enhance your experience, but you can adjust your preferences.
                    </li>
                    <br />
                    <p>For detailed information, please refer to our Privacy Policy. If you have any questions, feel free to contact us at 21522775@gm.uit.edu.vn.</p>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PolicyPage;
