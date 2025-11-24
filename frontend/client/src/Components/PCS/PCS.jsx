import { useState } from "react";
import "./PCS.css";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
function PCS() {
  const pcsInfo = {
    motto: "WELLNESS STARTS WITH UNDERSTANDING TRUSTWORTHY PROFESSIONAL",
    description:
      "It's okay to look for help. Things don't have to be okay all the time, and that's completely fine. Rather than letting things spiral out of your control, reach out to our counsellors. Don't let depression and anxiety become a disability. Be mentally fit to rise above any challenges that life throws your way. At UTP, we believe that, with a sense of meaning and purpose, we can work together to help everyone thrive.",
    workingHours: {
      days: "Monday to Friday",
      time: "8:00 AM – 5:00 PM",
      note: "We accept walk-ins, appointments, and referred cases.",
    },
    confidentiality: {
      statement:
        "As a client, all information you share about yourself will be kept confidential. Only with your written permission will information be released to anyone outside of the Psychological & Counselling Services (PCS), except as required by law.",
      exceptions: [
        "Clear and imminent danger to you or someone else",
        "If there is a reasonable expectation that you will engage in dangerous conduct as defined by Universiti Teknologi PETRONAS Rules & Regulations",
        "Reasonable suspicion that the client is currently being abused",
        "A court order",
      ],
      recordsNote:
        "PCS records do not become part of student educational or medical records. While PCS staff members may consult with a supervisor or with one another, all staff members are ethically and legally bound to treat all information confidentially.",
    },
    links: {
      booking:
        "https://apps.powerapps.com/play/e/cb9a5f19-5979-e480-b742-e25ee619359d/a/786aa980-00f4-405f-833b-a9bdcfdbdf96?tenantId=84187be3-037e-41ec-889c-a150fe476432&hint=bba06589-c049-42db-9d0e-1d16f184db0a&sourcetime=1736151338643&pa_isFromQRCode=true",
      hotline:
        "https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A2212bdee-ccc4-3565-bfa7-1060f7d89f93",
      app: "https://get-qr.com/LVgoTh",
    },
  };

  return (
    <>
   
<nav>
  <ul>
    <li className="logo">
      <img
        src={logo}
        alt="CampusCare Logo"
      />
    </li>

    <li>
      <Link to="/main">
        <i className="fa fa-user-md" style={{ marginRight: '10px' }}></i>
        ChatBot
      </Link>
    </li>

    <li>
      <Link to="/PCS">
        <i className="fa fa-university"></i> UTP PCS
      </Link>
    </li>

    <li>
      <Link to="/mentalhealth">
        <i className="fa fa-heartbeat"></i> Mental Health Info
      </Link>
    </li>

    <li className="logout">
      <Link to="/">
        <i className="fa fa-sign-out"></i> Logout
      </Link>
    </li>
  </ul>
</nav>




      <div className="bubbles">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

  
      <div className="mental-health-container">
        <div className="mh-header">
          <h1>Psychological & Counselling Services</h1>
          <p>Your wellbeing is our priority</p>
        </div>


        <div className="tab-content">
          <div className="overview-section">
            <div className="info-card full-width">
              <div className="card-icon">🎓</div>
              <h3>{pcsInfo.motto}</h3>
              <p className="desc">{pcsInfo.description}</p>
            </div>

            <div className="info-card">
              <div className="card-icon">📅</div>
              <h3>Working Hours</h3>
              <p className="wh-days">{pcsInfo.workingHours.days}</p>
              <p className="wh-time">{pcsInfo.workingHours.time}</p>
              <p className="wh-note">{pcsInfo.workingHours.note}</p>
            </div>

            <div className="info-card">
              <div className="card-icon">🔗</div>
              <h3>Quick Access</h3>
              <div className="quick-links">
                <a href={pcsInfo.links.booking} target="_blank" rel="noreferrer" className="visit-btn">
                  <i className="fa fa-calendar"></i> Book Your Slot
                </a>
                <a href={pcsInfo.links.hotline} target="_blank" rel="noreferrer" className="visit-btn">
                  <i className="fa fa-phone"></i> Psychosocial Support Hotline
                </a>
                <a href={pcsInfo.links.app} target="_blank" rel="noreferrer" className="visit-btn">
                  <i className="fa fa-mobile"></i> Mental Wellness Check App
                </a>
              </div>
            </div>

            <div className="info-card full-width">
              <div className="card-icon">🔒</div>
              <h3>Notice of Confidentiality</h3>

              <p className="conf-text">{pcsInfo.confidentiality.statement}</p>

              <div className="conf-box">
                <h4>Legal Exceptions Include:</h4>
                <ul>
                  {pcsInfo.confidentiality.exceptions.map((exception, i) => (
                    <li key={i}>{exception}</li>
                  ))}
                </ul>
              </div>

              <p className="records-note">{pcsInfo.confidentiality.recordsNote}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PCS;
