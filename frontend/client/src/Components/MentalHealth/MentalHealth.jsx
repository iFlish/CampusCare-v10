import { useState } from "react";
import "./MentalHealth.css";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
function MentalHealth() {
  const [activeTab, setActiveTab] = useState("overview");

  const faqData = [
    {
      question: "What is mental health?",
      answer: "We all have mental health which is made up of our beliefs, thoughts, feelings and behaviours."
    },
    {
      question: "What do I do if the support doesn't help?",
      answer: "It can be difficult to find the things that will help you, as different things help different people. It's important to be open to a range of approaches and to be committed to finding the right help and to continue to be hopeful, even when some things don't work out."
    },
    {
      question: "Can you prevent mental health problems?",
      answer: "We can all suffer from mental health challenges, but developing our wellbeing, resilience, and seeking help early can help prevent challenges becoming serious."
    },
    {
      question: "Are there cures for mental health problems?",
      answer: "It is often more realistic and helpful to find out what helps with the issues you face. Talking, counselling, medication, friendships, exercise, good sleep and nutrition, and meaningful occupation can all help."
    },
    {
      question: "What causes mental health problems?",
      answer: "Challenges or problems with your mental health can arise from psychological, biological, and social, issues, as well as life events."
    },
    {
      question: "What do I do if I'm worried about my mental health?",
      answer: "The most important thing is to talk to someone you trust. This might be a friend, colleague, family member, or GP. In addition to talking to someone, it may be useful to find out more information about what you are experiencing. These things may help to get some perspective on what you are experiencing, and be the start of getting help."
    },
    {
      question: "How do I know if I'm unwell?",
      answer: "If your beliefs, thoughts, feelings or behaviours have a significant impact on your ability to function in what might be considered a normal or ordinary way, it would be important to seek help."
    },
    {
      question: "What should I do if I'm worried about a friend or relative?",
      answer: "This may depend on your relationship with them. Gently encouraging someone to seek appropriate support would be helpful to start with."
    },
    {
      question: "How do I deal with someone telling me what to do?",
      answer: "Some people may advise you on good evidence of what works with the best of intentions, but it's important to find out what works best for you."
    }
  ];

  const mentalHealthTopics = {
    anxiety: {
      title: "Understanding Anxiety",
      symptoms: [
        "Excessive worry or fear",
        "Restlessness or feeling on edge",
        "Difficulty concentrating",
        "Sleep disturbances",
        "Physical symptoms (racing heart, sweating)"
      ],
      tips: [
        "Practice deep breathing exercises",
        "Maintain a regular sleep schedule",
        "Limit caffeine intake",
        "Exercise regularly",
        "Talk to someone you trust"
      ]
    },
    depression: {
      title: "Recognizing Depression",
      symptoms: [
        "Persistent sad or empty mood",
        "Loss of interest in activities",
        "Changes in appetite or weight",
        "Fatigue or loss of energy",
        "Feelings of worthlessness or guilt"
      ],
      tips: [
        "Stay connected with friends and family",
        "Set realistic goals",
        "Engage in physical activity",
        "Avoid isolation",
        "Seek professional help when needed"
      ]
    },
    stress: {
      title: "Managing Stress",
      symptoms: [
        "Feeling overwhelmed",
        "Irritability or anger",
        "Muscle tension or headaches",
        "Difficulty relaxing",
        "Changes in eating habits"
      ],
      tips: [
        "Practice time management",
        "Take regular breaks",
        "Use relaxation techniques",
        "Prioritize self-care",
        "Learn to say no when needed"
      ]
    }
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
          <h1>Mental Health Resources</h1>
          <p>Understanding and managing your mental wellbeing</p>
        </div>

    
        <div className="tab-navigation">
          <button
            className={activeTab === "overview" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("overview")}
          >
            <i className="fa fa-home"></i> Overview
          </button>
          <button
            className={activeTab === "faq" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("faq")}
          >
            <i className="fa fa-question-circle"></i> FAQ
          </button>
          <button
            className={activeTab === "topics" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("topics")}
          >
            <i className="fa fa-book"></i> Topics
          </button>
          <button
            className={activeTab === "emergency" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("emergency")}
          >
            <i className="fa fa-phone"></i> Emergency
          </button>
        </div>

      
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-section">
              <div className="info-card">
                <div className="card-icon">💚</div>
                <h3>Why Mental Health Matters</h3>
                <p>
                  Mental health is just as important as physical health. It affects how we think,
                  feel, and act. Taking care of your mental health is essential for overall
                  wellbeing, especially during your university years.
                </p>
              </div>

              <div className="info-card">
                <div className="card-icon">🎯</div>
                <h3>Common Challenges</h3>
                <p>
                  University students often face unique stressors including academic pressure,
                  social adjustment, financial concerns, and future career uncertainties. It's
                  normal to struggle sometimes, and seeking help is a sign of strength.
                </p>
              </div>

              <div className="info-card">
                <div className="card-icon">🌟</div>
                <h3>Taking Action</h3>
                <p>
                  Small steps can make a big difference. Regular exercise, good sleep habits,
                  social connections, and reaching out for support when needed are all important
                  ways to maintain good mental health.
                </p>
              </div>

              <div className="info-card full-width">
                <h3>🧘‍♀️ Self-Care Tips for Students</h3>
                <div className="tips-grid">
                  <div className="tip-item">
                    <strong>Sleep Well</strong>
                    <p>Aim for 7-9 hours per night</p>
                  </div>
                  <div className="tip-item">
                    <strong>Stay Active</strong>
                    <p>Exercise 30 minutes daily</p>
                  </div>
                  <div className="tip-item">
                    <strong>Eat Healthy</strong>
                    <p>Balanced meals fuel your mind</p>
                  </div>
                  <div className="tip-item">
                    <strong>Connect</strong>
                    <p>Maintain social relationships</p>
                  </div>
                  <div className="tip-item">
                    <strong>Relax</strong>
                    <p>Take breaks and unwind</p>
                  </div>
                  <div className="tip-item">
                    <strong>Seek Help</strong>
                    <p>Talk to someone you trust</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="faq-section">
              <div className="faq-intro">
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to common questions about mental health and wellbeing</p>
              </div>

              <div className="faq-list">
                {faqData.map((item, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question">
                      <span className="question-icon">Q.</span>
                      <h3>{item.question}</h3>
                    </div>
                    <div className="faq-answer">
                      <span className="answer-icon">A.</span>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-card">
                <h3>💬 Still Have Questions?</h3>
                <p>
                  If you have more questions or need personalized support, please don't hesitate
                  to reach out to UTP's Psychological Counseling Services or use our chatbot for
                  immediate guidance.
                </p>
              </div>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="topics-section">
              {Object.entries(mentalHealthTopics).map(([key, topic]) => (
                <div key={key} className="topic-card">
                  <h3>{topic.title}</h3>
                  
                  <div className="topic-content">
                    <div className="symptoms-section">
                      <h4>⚠️ Common Signs</h4>
                      <ul>
                        {topic.symptoms.map((symptom, i) => (
                          <li key={i}>{symptom}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="tips-section">
                      <h4>💡 Helpful Strategies</h4>
                      <ul>
                        {topic.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="info-card">
                <h3>🏥 When to Seek Professional Help</h3>
                <p>
                  If you're experiencing persistent symptoms that interfere with daily life,
                  thoughts of self-harm, or overwhelming emotions, please reach out to a mental
                  health professional. UTP's Psychological Counseling Services (PCS) is here to
                  support you.
                </p>
              </div>
            </div>
          )}

          {activeTab === "emergency" && (
            <div className="emergency-section">
              <div className="emergency-card urgent">
                <div className="emergency-icon">🚨</div>
                <h3>Emergency Contacts</h3>
                <p className="emergency-subtitle">If you're in immediate danger, call emergency services</p>
                
                <div className="contact-list">
                  <div className="contact-item">
                    <strong>Malaysia Emergency Services</strong>
                    <span className="phone-number">999</span>
                  </div>
                  <div className="contact-item">
                    <strong>Befrienders KL (24/7 Helpline)</strong>
                    <span className="phone-number">03-7627 2929</span>
                  </div>
                  <div className="contact-item">
                    <strong>Talian Kasih (24/7)</strong>
                    <span className="phone-number">15999</span>
                  </div>
                </div>
              </div>

              <div className="emergency-card">
                <div className="emergency-icon">🏥</div>
                <h3>UTP Resources</h3>
                
                <div className="contact-list">
                  <div className="contact-item">
                    <strong>UTP Psychological Counseling Services - Puan Azlina Mohd Lazim</strong>
                    <span className="phone-number">+605-3688610</span>
                    <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                  </div>
                  <div className="contact-item">
                    <strong>UTP Health Centre</strong>
                    <span className="phone-number">+605-3687201</span>
                    <p>Available during campus hours</p>
                  </div>
                </div>

                <a
                  href="https://www.utp.edu.my/Pages/Students/Student%20Development%20and%20Services/Psychological-and-Counselling-Services.aspx"
                  target="_blank"
                  rel="noreferrer"
                  className="visit-btn"
                >
                  <i className="fa fa-external-link"></i> Visit UTP PCS Website
                </a>
              </div>

              <div className="info-card">
                <h3>⏰ Crisis Support</h3>
                <p>
                  If you're experiencing a mental health crisis outside of business hours, please
                  contact the 24/7 helplines listed above. Your wellbeing is important, and help
                  is always available.
                </p>
                <p style={{ marginTop: '15px', fontWeight: '500' }}>
                  Remember: Reaching out for help is a sign of strength, not weakness. You don't
                  have to face difficulties alone.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MentalHealth;