import React from "react";
import "./about.css";
import Instgramlogo from "../assets/instgramlogo";

import FacebookLogo from "../assets/facebooklogo";
import Pinterestlogo from "../assets/pinterestlogo";

export default function footer() {
  return (
    <>
      <div className="col_footer">
        <div className="mangerfooter">
          <div className="mainfooter">
            <h4 className="p-2">GET IN TOUCH!</h4>
              <p>
              <i className="fas fa-home "></i> New York, NY 10012, US
            </p>
            <p>
              <i className="fas fa-envelope "></i>
              info@example.com
            </p>
            <p>
              <i className="fas fa-phone "></i> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print "></i> + 01 234 567 89
            </p>
          </div>
          <button id="conbtn" className="btn btn-dark">
            CONTACT US
          </button>
          <div className="mainfooter">
            <FacebookLogo />
            <Pinterestlogo />
            <Instgramlogo />
            <h5>Copyright: &copy; {new Date().getFullYear()}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
