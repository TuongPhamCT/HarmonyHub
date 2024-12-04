import './Footer.css'; // Import the CSS file for styling
import footer_background from '../../assets/img/footer_background.png';
import logo from '../../assets/img/logo.png';
import icon_facebook from '../../assets/img/footer_icon_facebook.png';
import icon_instagram from '../../assets/img/footer_icon_instagram.png';
import icon_x from '../../assets/img/footer_icon_x.png';
import icon_phone from '../../assets/img/footer_icon_phone.png';

export default function Footer() {
  return (
    <div className="footer_container">
      <img src={footer_background} alt="" width="100%"></img>
      <table border="0" cellPadding="10" cellSpacing="10" id="footer_table">
        <tbody>
          <tr>
            <td width="35%">
              <p>
                <span className="header">About</span><br />
                Melodies is a website that has been created for over <span className="pink">5 year’s </span>
                now and it is one of the most famous music player website’s in the world. in this website you can
                listen and download songs for free. also of you want no limitation you can buy our
                <span className="blue"> premium pass’s.</span>
              </p>
            </td>
            <td width="12%" className="footer_table_top">
              <h2>Melodies</h2>
              <hr></hr>
              <ul>
                <li>Songs</li>
                <li>Radio</li>
                <li>Podcast</li>
              </ul>
            </td>
            <td width="12%" className="footer_table_top">
              <h2>Access</h2>
              <hr></hr>
              <ul>
                <li>Explore</li>
                <li>Artists</li>
                <li>Playlists</li>
                <li>Albums</li>
                <li>Trending</li>
              </ul>
            </td>
            <td width="12%" className="footer_table_top">
              <h2>Contact</h2>
              <hr></hr>
              <ul>
                <li>About</li>
                <li>Policy</li>
                <li>Social Media</li>
                <li>Support</li>
              </ul>
            </td>
            <td>
              <div className="footer_centered_div">
                <img src={logo} id="footer_logo" alt="Logo" style={{ marginBottom: '4vh' }} />
                <div className="footer_icon_list">
                  <img src={icon_facebook} alt="" className="footer_icon_img"></img>
                  <img src={icon_instagram} alt="" className="footer_icon_img"></img>
                  <img src={icon_x} alt="" className="footer_icon_img"></img>
                  <img src={icon_phone} alt="" className="footer_icon_img"></img>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
