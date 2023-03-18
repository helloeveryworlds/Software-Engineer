import React from "react";
import { Link } from "react-router-dom";

import { Github } from "react-bootstrap-icons";

import ButtonMailto from "../button-mailto/button-mailto";

import "./footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-body">
          <div className="row">
            <div className="footer-col">
              <p>Shop</p>
              <ul>
                <li>
                  <Link to="/Shopping" className="footer-link">
                    Shopping page
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p>Students</p>
              <ul>
                <li>
                  <ButtonMailto
                    label="Ratan J Naik"
                    mailto="mailto:ratanjn@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Fuhao Ruan"
                    mailto="mailto:fuhao105@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Chibundom Ejimuda"
                    mailto="mailto:cejimuda@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Zijie Wang"
                    mailto="mailto:wangzj@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Zheng Zhang"
                    mailto="mailto:zhzheng@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Bauyrzhan Kussayev"
                    mailto="mailto:kussayev@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Qiwei Li"
                    mailto="mailto:Qiweili@bu.edu"
                  />
                </li>
                <li>
                  <ButtonMailto
                    label="Shweta Mishra"
                    mailto="mailto:mshweta@bu.edu"
                  />
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p>BossMode</p>
              <div className="footer-social-links">
                <a
                  href="https://github.com/helloeveryworlds/Software-Engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <Github size="40px" />
                </a>
              </div>
            </div>
            <div className="footer-col"></div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
