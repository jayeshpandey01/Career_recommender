import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function FaqItem({ item }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`faq-item ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
            <div className="faq-question">
                <span>{item.q}</span>
                <div className="faq-toggle">
                    <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'}`}></i>
                </div>
            </div>
            {open && <div className="faq-answer">{item.a}</div>}
        </div>
    )
}

const stats = [
    { num: '99.8%', label: 'Train Accuracy' },
    { num: '38', label: 'Input Features' },
    { num: '11', label: 'Career Categories' },
    { num: '20K+', label: 'Training Samples' },
]

const features = [
    {
        icon: 'fa-solid fa-brain',
        colorClass: 'feat-accent',
        title: 'AI Career Prediction',
        desc: 'Our MLP neural network analyzes 38 personal attributes — academic scores, coding skills, personality traits — to match you with the ideal IT career. Get confidence scores across all 11 career categories.',
        link: '/predict',
        linkLabel: 'Start Prediction',
    },
    {
        icon: 'fa-solid fa-map',
        colorClass: 'feat-green',
        title: 'Smart Roadmap Generator',
        desc: 'LangGraph-powered AI research agent performs iterative web searches to build a personalized, structured learning path with phases, milestones, and visual Mermaid flowcharts.',
        link: '/roadmap',
        linkLabel: 'Generate Roadmap',
    },
    {
        icon: 'fa-solid fa-chart-bar',
        colorClass: 'feat-purple',
        title: 'Confidence Scoring',
        desc: 'Visual confidence bars across all career categories help you understand your strongest matches and explore alternative career paths.',
    },
    {
        icon: 'fa-solid fa-diagram-project',
        colorClass: 'feat-orange',
        title: 'Visual Flow Diagrams',
        desc: 'Interactive Mermaid flowchart diagrams generated from your roadmap make it easy to see the big picture and plan your learning journey.',
    },
    {
        icon: 'fa-solid fa-globe',
        colorClass: 'feat-teal',
        title: 'Deep Web Research',
        desc: 'Real-time iterative research using DuckDuckGo, Tavily, and more — automatically identifies knowledge gaps and fills them in.',
    },
    {
        icon: 'fa-solid fa-lock',
        colorClass: 'feat-orange',
        title: 'Fully Local & Private',
        desc: 'Run the entire AI stack locally with Ollama or LMStudio. Your data stays on your machine — no cloud required.',
    },
]

const steps = [
    {
        num: '01',
        icon: 'fa-solid fa-crosshairs',
        title: 'Fill Your Profile',
        desc: 'Input academic scores (9 CS subjects), skill ratings, certifications, personality traits, and career preferences via our guided form.',
    },
    {
        num: '02',
        icon: 'fa-solid fa-brain',
        title: 'AI Predicts Your Path',
        desc: 'Our MLP neural network processes your 38-feature profile through 3 hidden layers to generate career predictions with confidence percentages.',
    },
    {
        num: '03',
        icon: 'fa-solid fa-map',
        title: 'Generate Your Roadmap',
        desc: 'Enter your predicted career into the Roadmap generator — the LangGraph agent performs iterative research to build your personalized learning path.',
    },
    {
        num: '04',
        icon: 'fa-solid fa-circle-check',
        title: 'Visualize & Execute',
        desc: 'Get a structured plan with phases, milestones, and an interactive Mermaid flowchart. Follow your path to career success.',
    },
]

const categories = [
    { icon: 'fa-solid fa-code', label: 'SE / SDE', sub: 'Software Engineer / Developer' },
    { icon: 'fa-solid fa-users', label: 'CRM / Managerial', sub: 'Project Manager, IT Manager' },
    { icon: 'fa-solid fa-chart-column', label: 'Analyst', sub: 'BI, Systems, E-Commerce' },
    { icon: 'fa-solid fa-mobile-screen', label: 'Mobile / Web Dev', sub: 'Apps Developer, Web Dev' },
    { icon: 'fa-solid fa-shield-halved', label: 'Networks / Security', sub: 'Network Engineer, Sec Admin' },
    { icon: 'fa-solid fa-database', label: 'Databases', sub: 'Database Dev, Admin, Manager' },
    { icon: 'fa-solid fa-pen-ruler', label: 'UX / Design', sub: 'UX Designer, Design & UX' },
    { icon: 'fa-solid fa-terminal', label: 'Programming / Analyst', sub: 'Programmer, Systems Analyst' },
    { icon: 'fa-solid fa-vial-circle-check', label: 'QA / Testing', sub: 'QA Engineer, QA Associate' },
    { icon: 'fa-solid fa-headset', label: 'Technical Support', sub: 'Help Desk, Tech Support' },
    { icon: 'fa-solid fa-star', label: 'Others', sub: 'Architect, IT Auditor' },
]

export default function Home() {
    return (
        <div className="home">

            {/* ── Hero V2 (ZenCrypto style) ── */}
            <section className="hero-v2">
                <div className="container hero-v2-grid">
                    {/* Left Card: Info */}
                    <div className="hero-card hero-card-info">
                        <div className="hero-card-content">
                            <h1 className="hero-v2-title">
                                Predict & Build<br />
                                Your Ideal <span className="text-secondary">IT Career</span>
                            </h1>
                            <p className="hero-v2-sub">
                                Data-driven career mapping powered by our MLP Neural Network
                                and interactive AI Research Agents.
                            </p>
                            <Link to="/predict" className="btn-lime-pill">
                                Get Started <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>

                            <div className="hero-app-links">
                                <div className="app-btn"><i className="fa-brands fa-apple"></i> App Store</div>
                                <div className="app-btn"><i className="fa-brands fa-google-play"></i> Google Play</div>
                            </div>
                        </div>

                        {/* Floating Scroll Badge */}
                        <div className="scroll-badge">
                            <div className="scroll-text">Learn more • Learn more • </div>
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                    </div>

                    {/* Right Card: Visual */}
                    <div className="hero-card hero-card-visual">
                        <div className="stat-float">
                            <div className="stat-label">System Accuracy</div>
                            <div className="stat-value">99.8%</div>
                        </div>
                        <div className="hero-phone-wrap">
                            <div className="hero-phone-inner">
                                <div className="phone-screen">
                                    <div className="screen-header">Current Match</div>
                                    <div className="match-score">86% MATCH</div>
                                    <div className="match-career">Software Engineer</div>
                                </div>
                            </div>
                        </div>
                        <div className="visual-caption">BUILD YOUR FUTURE WITH EASE</div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="page-section features-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">
                            <i className="fa-solid fa-star"></i> Features
                        </div>
                        <h2>Everything you need to navigate your IT career</h2>
                        <p>A complete platform powered by deep learning and AI research agents</p>
                    </div>

                    <div className="features-grid">
                        {features.map(f => (
                            <div className={`feat-card ${f.colorClass}`} key={f.title}>
                                <div className="feat-icon">
                                    <i className={f.icon}></i>
                                </div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                                {f.link && (
                                    <Link to={f.link} className="feat-link">
                                        {f.linkLabel}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="page-section faq-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">FAQs</div>
                        <h2 className="faq-title">Frequently<br />asked questions</h2>
                        <p>We have given answers to the most popular questions below</p>
                    </div>

                    <div className="faq-list">
                        {[
                            { q: 'How accurate is the career prediction?', a: 'Our MLP model achieves 99.8% train accuracy by processing 38 distinct features. We use a deep neural network with 3 hidden layers to ensure precise matching.' },
                            { q: 'Can I use this for free?', a: 'Yes! CareerAI is an open-source platform. You can even run the entire stack locally using Ollama to ensure complete data privacy.' },
                            { q: 'How does the roadmap generator work?', a: 'It uses a LangGraph research agent. When you request a roadmap, the AI performs real-time iterative web research to identify current industry standards and prerequisites.' },
                            { q: 'Which career categories are covered?', a: 'We currently support 11 major IT categories including Software Engineering, CRM/Managerial roles, Data Science, Security, and UX Design.' }
                        ].map((item, idx) => (
                            <FaqItem key={idx} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="page-section cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="section-tag">
                            Ready to get started?
                        </div>
                        <h2>Start your career<br />journey today</h2>
                        <p>Predict your ideal IT career path, then generate a step-by-step AI roadmap to achieve it.</p>
                        <div className="cta-buttons">
                            <Link to="/predict" className="btn-lime-pill">
                                Predict My Career
                            </Link>
                            <Link to="/roadmap" className="btn btn-outline btn-lg">
                                Generate Roadmap
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
