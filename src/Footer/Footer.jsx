import React from "react";
import "./about.css";
import Instgramlogo from "../assets/instgramlogo";
import FacebookLogo from "../assets/facebooklogo";
import Pinterestlogo from "../assets/pinterestlogo";

export default function Footer() {
  return (
    <div className="container-fluid col_footer">
      <div className="row">
        <div className="col-md-4 col-sm-12 ">
          <div className="mainfooter ">
            <h4 className="p-2">GET IN TOUCH!</h4>
            <p>
              <i className="fas fa-home"></i> New York, NY 10012, US
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@example.com
            </p>
            <p>
              <i className="fas fa-phone"></i> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print"></i> + 01 234 567 89
            </p>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 text-center align-self-center">
          <button id="conbtn" className="btn btn-dark">
            CONTACT US
          </button>
        </div>

        <div className="col-md-4 col-sm-12 align-self-center">
          <div className="mainfooter text-center">
            <FacebookLogo />
            <Pinterestlogo />
            <Instgramlogo />
            <h5 className="mt-3">Copyright: &copy; {new Date().getFullYear()}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
