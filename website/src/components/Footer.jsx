import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container footer-grid">

                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-mark">Z</div>
                            <span>CareerAI</span>
                        </Link>
                        <p className="footer-desc">
                            AI-powered career prediction and personalized learning roadmap generation for IT professionals.
                        </p>
                    </div>

                    {/* Tools */}
                    <div className="footer-col">
                        <h5 className="footer-col-title">
                            <i className="fa-solid fa-toolbox"></i> Tools
                        </h5>
                        <ul className="footer-links">
                            <li>
                                <Link to="/predict">
                                    <i className="fa-solid fa-brain"></i>
                                    Career Prediction
                                </Link>
                            </li>
                            <li>
                                <Link to="/roadmap">
                                    <i className="fa-solid fa-map"></i>
                                    Roadmap Generator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Technology */}
                    <div className="footer-col">
                        <h5 className="footer-col-title">
                            <i className="fa-solid fa-microchip"></i> Technology
                        </h5>
                        <ul className="footer-links">
                            <li><span><i className="fa-solid fa-network-wired"></i> MLP Neural Network</span></li>
                            <li><span><i className="fa-solid fa-diagram-project"></i> LangGraph Agent</span></li>
                            <li><span><i className="fa-solid fa-robot"></i> Ollama / LMStudio</span></li>
                            <li><span><i className="fa-brands fa-react"></i> FastAPI + React</span></li>
                        </ul>
                    </div>

                    {/* Model Info */}
                    <div className="footer-col">
                        <h5 className="footer-col-title">
                            <i className="fa-solid fa-chart-bar"></i> Model Stats
                        </h5>
                        <ul className="footer-links">
                            <li><span><i className="fa-solid fa-sliders"></i> 38 Input Features</span></li>
                            <li><span><i className="fa-solid fa-briefcase"></i> 11 Career Categories</span></li>
                            <li><span><i className="fa-solid fa-bullseye"></i> 99.8% Train Accuracy</span></li>
                            <li><span><i className="fa-solid fa-database"></i> 20,000+ Training Samples</span></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; 2026 CareerAI. Built with Deep Learning &amp; AI Research Agents.</p>
                    <div className="footer-bottom-stack">
                        <span>MLP Classifier</span>
                        <span className="dot">·</span>
                        <span>LangGraph</span>
                        <span className="dot">·</span>
                        <span>FastAPI</span>
                        <span className="dot">·</span>
                        <span>React</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
