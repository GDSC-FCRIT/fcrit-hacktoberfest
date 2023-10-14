import { AiOutlineInstagram } from 'react-icons/ai';
import { FiCode } from 'react-icons/fi';
import { RiDiscordLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiOutlineGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer>
      <div className="footer-title">
        <img src="https://user-images.githubusercontent.com/84656423/273397050-243818bb-91eb-42b5-89ca-e5e817e663a8.png" />
        <img src="https://user-images.githubusercontent.com/84656423/273397053-fa33c0a2-b10c-4837-b375-1ff836061078.png" />
      </div>
      <div className="footer-social">
        <p className="">Stay in Touch</p>
        <div className="social-links">
          <a href="https://gdsc.community.dev/fr-conceicao-rodrigues-institute-of-technology-navi-mumbai/">
            <FiCode className="icon" />
          </a>
          <a href="https://www.instagram.com/gdscfcrit/">
            <AiOutlineInstagram className="icon" />
          </a>
          <a href="https://discord.com/invite/vxmxQNtvD9">
            <RiDiscordLine className="icon" />
          </a>
          <a href="https://twitter.com/gdscfcrit">
            <FaXTwitter className="icon" />
          </a>
          <a href="https://www.linkedin.com/company/gdsc-fcrit/">
            <AiOutlineLinkedin className="icon" />
          </a>
          <a href="https://github.com/GDSC-FCRIT">
            <AiOutlineGithub className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
