import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { marked } from 'marked'
import './Roadmap.css'

const LOADING_MSGS = [
    'Analyzing your career goal...',
    'Searching the web for current trends...',
    'Identifying knowledge gaps...',
    'Building structured learning phases...',
    'Generating Mermaid visualization...',
    'Finalizing your personalized roadmap...',
]

const EXAMPLE_QUERIES = [
    'Become a Full Stack Developer in 2025',
    'Software Engineer career roadmap',
    'Machine Learning Engineer path',
    'DevOps Engineer in 12 months',
    'Cybersecurity Analyst roadmap',
    'Data Scientist learning path',
]

const DEMO_ROADMAP = `## Phase 1: Foundation (Months 1–3)

### Core Skills to Learn
- **Programming Fundamentals**: Python, JavaScript basics
- **Data Structures & Algorithms**: Arrays, linked lists, trees, sorting
- **Version Control**: Git, GitHub workflow
- **Basic Linux/CLI**: Command-line navigation, file management

### Resources
- FreeCodeCamp, The Odin Project, LeetCode (Easy problems)
- *"Clean Code"* by Robert Martin
- CS50 from Harvard (free on EDX)

---

## Phase 2: Specialization (Months 4–6)

### Frontend Development
- **React.js**: Components, Hooks, State management
- **CSS Frameworks**: TailwindCSS, responsive design
- **REST APIs**: Fetch, Axios, JSON

### Backend Development
- **Node.js + Express**: REST API creation
- **Databases**: PostgreSQL, MongoDB basics
- **Authentication**: JWT, OAuth

---

## Phase 3: Projects & Portfolio (Months 7–9)

### Build 3 Portfolio Projects
1. **Full Stack CRUD App**: Blog, Todo, E-commerce store
2. **Real-time App**: Chat app with WebSockets
3. **API Integration Project**: Weather app, Movie database

### Deploy Everything
- **Platforms**: Vercel, Railway, Render (free tier)
- **CI/CD**: GitHub Actions basics

---

## Phase 4: Job Preparation (Months 10–12)

### Interview Prep
- **DSA Practice**: 100+ LeetCode problems
- **System Design**: Basics of scalable architectures
- **Behavioral Interviews**: STAR method

### Job Search
- LinkedIn optimization, GitHub polishing
- Apply to 5–10 jobs/week
- Network on tech Discord communities`

const DEMO_MERMAID = `graph TD
    A[Start: Beginner] --> B[CS Fundamentals]
    B --> C{Choose Path}
    C -->|Frontend| D[HTML/CSS/JS]
    C -->|Backend| E[Python/Node.js]
    D --> F[React.js]
    E --> G[REST APIs + DB]
    F --> H[Full Stack Projects]
    G --> H
    H --> I[Portfolio Building]
    I --> J[Interview Prep]
    J --> K[Job Applications]
    K --> L[Software Engineer Role]`

export default function Roadmap() {
    const [searchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('career') || '')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [loadingMsg, setLoadingMsg] = useState('')
    const [activeTab, setActiveTab] = useState('roadmap')
    const diagramRef = useRef(null)
    const loadingInterval = useRef(null)

    useEffect(() => {
        const c = searchParams.get('career')
        if (c) setQuery(c)
    }, [searchParams])

    function startLoadingMessages() {
        let i = 0
        setLoadingMsg(LOADING_MSGS[0])
        loadingInterval.current = setInterval(() => {
            i = (i + 1) % LOADING_MSGS.length
            setLoadingMsg(LOADING_MSGS[i])
        }, 3200)
    }

    function stopLoadingMessages() {
        clearInterval(loadingInterval.current)
    }

    async function renderMermaid(code) {
        try {
            const mermaid = await import('mermaid')
            mermaid.default.initialize({
                startOnLoad: false, theme: 'dark',
                themeVariables: {
                    primaryColor: '#6366f1', primaryTextColor: '#f1f5f9',
                    primaryBorderColor: '#4f46e5', lineColor: '#64748b',
                    secondaryColor: '#1a2332', tertiaryColor: '#111827',
                    background: '#111827', mainBkg: '#1a2332',
                }
            })
            if (diagramRef.current) {
                diagramRef.current.innerHTML = `<div class="mermaid">${code}</div>`
                await mermaid.default.run({ nodes: diagramRef.current.querySelectorAll('.mermaid') })
            }
        } catch {
            if (diagramRef.current) {
                diagramRef.current.innerHTML = `<pre class="rm-mermaid-raw">${code}</pre>`
            }
        }
    }

    async function handleSubmit(e) {
        e?.preventDefault()
        if (!query.trim()) return
        setLoading(true)
        setResult(null)
        setActiveTab('roadmap')
        startLoadingMessages()

        try {
            const res = await fetch('http://127.0.0.1:8000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query.trim() }),
            })
            if (!res.ok) throw new Error()
            const data = await res.json()
            stopLoadingMessages()
            setResult(data)
            if (data.mermaid_diagram) {
                const clean = data.mermaid_diagram.replace(/```mermaid\n?|\n?```/g, '').trim()
                setTimeout(() => renderMermaid(clean), 200)
            }
        } catch {
            stopLoadingMessages()
            const demo = { demo: true, roadmap: DEMO_ROADMAP, summary: `**${query}** is a high-demand career path. This roadmap outlines 12 months of structured learning with foundational skills, specialization, portfolio, and job search strategies.`, mermaid_diagram: DEMO_MERMAID }
            setResult(demo)
            setTimeout(() => renderMermaid(DEMO_MERMAID), 200)
        } finally {
            setLoading(false)
        }
    }

    function copyRoadmap() {
        if (result?.roadmap) navigator.clipboard.writeText(result.roadmap)
    }

    const RESULT_TABS = [
        { key: 'roadmap', label: 'Roadmap', icon: 'fa-solid fa-list-check' },
        { key: 'diagram', label: 'Flow Diagram', icon: 'fa-solid fa-diagram-project' },
        { key: 'summary', label: 'Summary', icon: 'fa-solid fa-file-lines' },
    ]

    return (
        <div className="rm-page">

            {/* ── Hero / Search Area ── */}
            <div className="rm-hero">
                <div className="rm-hero-orb rm-orb-a"></div>
                <div className="rm-hero-orb rm-orb-b"></div>

                <div className="container rm-hero-inner">
                    <div className="rm-badge">
                        <i className="fa-solid fa-map"></i> AI Roadmap Generator
                    </div>
                    <h1>Generate Your Learning Roadmap</h1>
                    <p>
                        Enter a career goal below. Our LangGraph AI research agent performs iterative
                        web research to build you a personalized, structured learning path.
                    </p>

                    {/* Search bar */}
                    <form className="rm-search" onSubmit={handleSubmit}>
                        <div className="rm-search-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                        <input
                            className="rm-search-input"
                            type="text"
                            placeholder="e.g. Become a Machine Learning Engineer in 2025..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            disabled={loading}
                        />
                        {query && !loading && (
                            <button type="button" className="rm-clear-btn" onClick={() => { setQuery(''); setResult(null) }} title="Clear">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                        <button type="submit" className="rm-generate-btn" disabled={loading || !query.trim()}>
                            {loading
                                ? <><i className="fa-solid fa-spinner fa-spin"></i> Researching...</>
                                : <><i className="fa-solid fa-paper-plane"></i> Generate</>
                            }
                        </button>
                    </form>

                    {/* Example queries */}
                    {!result && !loading && (
                        <div className="rm-examples">
                            <span className="rm-examples-label">
                                <i className="fa-solid fa-wand-magic-sparkles"></i> Try:
                            </span>
                            <div className="rm-examples-chips">
                                {EXAMPLE_QUERIES.map(q => (
                                    <button key={q} className="rm-chip" onClick={() => setQuery(q)}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="container rm-content">

                {/* Loading */}
                {loading && (
                    <div className="rm-loading">
                        <div className="rm-loading-card">
                            <div className="rm-loading-glow"></div>
                            <div className="rm-spinner"></div>
                            <h3>Researching Your Career Path</h3>
                            <p className="rm-loading-goal">
                                <i className="fa-solid fa-crosshairs"></i> {query}
                            </p>
                            <p className="rm-loading-msg">{loadingMsg}</p>
                            <div className="rm-traces">
                                <div className="rm-trace">[AGENT] Analyzing career goal... extracting intent...</div>
                                <div className="rm-trace">[SEARCH] Querying DuckDuckGo for latest industry trends...</div>
                                <div className="rm-trace">[GRAPH] Assembling LangGraph state... building roadmap...</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Demo notice */}
                {result?.demo && (
                    <div className="rm-demo-notice">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>Demo mode — backend not connected. Run the Roadmap FastAPI server on port 8000. Showing sample output for <strong>"{query}"</strong>.</span>
                    </div>
                )}

                {/* Result */}
                {result && !loading && (
                    <div className="rm-result">

                        {/* Result header */}
                        <div className="rm-result-header">
                            <div className="rm-result-meta">
                                <div className="rm-result-badge">
                                    <i className="fa-solid fa-circle-check"></i> Roadmap Generated
                                </div>
                                <h2 className="rm-result-title">
                                    <i className="fa-solid fa-route"></i> {query}
                                </h2>
                            </div>
                            <div className="rm-result-actions">
                                <button className="rm-action-btn" onClick={copyRoadmap}>
                                    <i className="fa-solid fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="rm-tabs">
                            {RESULT_TABS.map(t => (
                                <button
                                    key={t.key}
                                    className={`rm-tab ${activeTab === t.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(t.key)}
                                >
                                    <i className={t.icon}></i> {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Roadmap content */}
                        {activeTab === 'roadmap' && result.roadmap && (
                            <div className="rm-card">
                                <div
                                    className="rm-md"
                                    dangerouslySetInnerHTML={{ __html: marked.parse(result.roadmap) }}
                                />
                            </div>
                        )}

                        {/* Diagram */}
                        {activeTab === 'diagram' && (
                            <div className="rm-card rm-diagram-card">
                                <div className="rm-diagram-header">
                                    <div>
                                        <h3><i className="fa-solid fa-diagram-project"></i> Learning Path Flowchart</h3>
                                        <p>Visual representation of your career progression milestones</p>
                                    </div>
                                </div>
                                <div className="rm-diagram-body" ref={diagramRef}>
                                    <div className="rm-diagram-loading">
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        <span>Rendering diagram...</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Summary */}
                        {activeTab === 'summary' && result.summary && (
                            <div className="rm-card">
                                <div
                                    className="rm-md"
                                    dangerouslySetInnerHTML={{ __html: marked.parse(result.summary) }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {!result && !loading && (
                    <div className="rm-empty">
                        <div className="rm-empty-icon">
                            <i className="fa-solid fa-map"></i>
                        </div>
                        <h3>Enter a Career Goal to Get Started</h3>
                        <p>
                            Type your desired career destination in the search bar above.
                            Our AI agent will research industry trends and generate a detailed,
                            step-by-step learning roadmap customized for you.
                        </p>
                        <div className="rm-empty-features">
                            <div className="rm-ef">
                                <i className="fa-solid fa-diagram-project"></i>
                                <span>Visual Mermaid flowcharts</span>
                            </div>
                            <div className="rm-ef">
                                <i className="fa-solid fa-list-check"></i>
                                <span>Structured learning phases</span>
                            </div>
                            <div className="rm-ef">
                                <i className="fa-solid fa-bolt"></i>
                                <span>Real-time web research</span>
                            </div>
                            <div className="rm-ef">
                                <i className="fa-solid fa-brain"></i>
                                <span>AI-powered recommendations</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
