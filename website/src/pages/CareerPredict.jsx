import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CareerPredict.css'

/* ─── Field Definitions ──────────────────────────────────────────────────── */
const ACADEMIC_SLIDERS = [
    { key: 'os', label: 'Operating Systems', icon: 'fa-solid fa-server' },
    { key: 'algo', label: 'Algorithms', icon: 'fa-solid fa-code-branch' },
    { key: 'prog', label: 'Programming Concepts', icon: 'fa-solid fa-code' },
    { key: 'se', label: 'Software Engineering', icon: 'fa-solid fa-screwdriver-wrench' },
    { key: 'networks', label: 'Computer Networks', icon: 'fa-solid fa-network-wired' },
    { key: 'elec', label: 'Electronics Subjects', icon: 'fa-solid fa-bolt' },
    { key: 'arch', label: 'Computer Architecture', icon: 'fa-solid fa-microchip' },
    { key: 'math', label: 'Mathematics', icon: 'fa-solid fa-square-root-variable' },
    { key: 'comm', label: 'Communication Skills', icon: 'fa-solid fa-comments' },
]

const SKILL_SLIDERS = [
    { key: 'work_hours', label: 'Hours Working Per Day', icon: 'fa-solid fa-clock', min: 1, max: 24, default: 8 },
    { key: 'logical', label: 'Logical Quotient Rating', icon: 'fa-solid fa-brain', min: 1, max: 10, default: 5 },
    { key: 'hackathons', label: 'Number of Hackathons', icon: 'fa-solid fa-trophy', min: 0, max: 20, default: 0 },
    { key: 'coding', label: 'Coding Skills Rating', icon: 'fa-solid fa-terminal', min: 1, max: 10, default: 5 },
    { key: 'public_speaking', label: 'Public Speaking Points', icon: 'fa-solid fa-microphone', min: 1, max: 10, default: 5 },
]

const YES_NO = ['yes', 'no']
const CAPABILITY_SELECTS = [
    { key: 'long_work', label: 'Can Work Long Hours at System?', options: YES_NO, icon: 'fa-solid fa-clock-rotate-left' },
    { key: 'self_learning', label: 'Self-Learning Capability?', options: YES_NO, icon: 'fa-solid fa-user-graduate' },
    { key: 'extra_courses', label: 'Completed Extra Courses?', options: YES_NO, icon: 'fa-solid fa-graduation-cap' },
    { key: 'talent_tests', label: 'Taken Talent Tests?', options: YES_NO, icon: 'fa-solid fa-vial' },
    { key: 'olympiads', label: 'Participated in Olympiads?', options: YES_NO, icon: 'fa-solid fa-medal' },
    { key: 'reading_writing', label: 'Reading & Writing Skills', options: ['poor', 'medium', 'excellent'], icon: 'fa-solid fa-pen-nib' },
    { key: 'memory', label: 'Memory Capability Score', options: ['poor', 'medium', 'excellent'], icon: 'fa-solid fa-database' },
]

const TEXT_FIELDS = [
    { key: 'certifications', label: 'Certifications Held', placeholder: 'e.g. machine learning, python, AWS', icon: 'fa-solid fa-certificate' },
    { key: 'workshops', label: 'Workshops Attended', placeholder: 'e.g. data science, cloud computing', icon: 'fa-solid fa-chalkboard-user' },
    { key: 'interested_subj', label: 'Interested Subjects', placeholder: 'e.g. data science, networks', icon: 'fa-solid fa-book-open' },
    { key: 'career_area', label: 'Interested Career Area', placeholder: 'e.g. developer, security, testing', icon: 'fa-solid fa-compass' },
    { key: 'company_type', label: 'Preferred Company Type', placeholder: 'e.g. Product based, Service based', icon: 'fa-solid fa-building' },
    { key: 'book_type', label: 'Preferred Book Types', placeholder: 'e.g. Technical, Mystery, Science', icon: 'fa-solid fa-book' },
]

const CAREER_SELECTS = [
    { key: 'job_studies', label: 'Job or Higher Studies?', options: ['job', 'higherstudies'], icon: 'fa-solid fa-route' },
    { key: 'senior_input', label: 'Taken Inputs from Seniors?', options: YES_NO, icon: 'fa-solid fa-users' },
    { key: 'interested_games', label: 'Interested in Games?', options: YES_NO, icon: 'fa-solid fa-gamepad' },
]

const PERSONAL_SELECTS = [
    { key: 'relationship', label: 'In a Relationship?', options: YES_NO, icon: 'fa-solid fa-heart' },
    { key: 'behaviour', label: 'Behavior Style', options: ['gentle', 'stubborn'], icon: 'fa-solid fa-face-smile' },
    { key: 'mgmt_tech', label: 'Management or Technical?', options: ['Management', 'Technical'], icon: 'fa-solid fa-briefcase' },
    { key: 'salary_work', label: 'Priority: Salary or Work?', options: ['salary', 'work'], icon: 'fa-solid fa-hand-holding-dollar' },
    { key: 'worker_type', label: 'Hard or Smart Worker?', options: ['hard worker', 'smart worker'], icon: 'fa-solid fa-gears' },
    { key: 'team_work', label: 'Worked in Teams Before?', options: YES_NO, icon: 'fa-solid fa-people-group' },
    { key: 'introvert', label: 'Are You an Introvert?', options: YES_NO, icon: 'fa-solid fa-mask' },
    { key: 'salary_range', label: 'What Matters More to You?', options: ['salary', 'Work'], icon: 'fa-solid fa-money-bill-trend-up' },
]

const JOB_CATEGORIES = {
    'CRM/Managerial Roles': ['CRM Business Analyst', 'CRM Technical Developer', 'Project Manager', 'IT Manager'],
    'Analyst': ['Business Systems Analyst', 'Business Intelligence Analyst', 'E-Commerce Analyst'],
    'Mobile Applications/ Web Development': ['Mobile Applications Developer', 'Web Developer', 'Applications Developer'],
    'QA/Testing': ['Software Quality Assurance (QA) / Testing', 'Quality Assurance Associate'],
    'UX/Design': ['UX Designer', 'Design & UX'],
    'Databases': ['Database Developer', 'Database Administrator', 'Database Manager', 'Portal Administrator'],
    'Programming/ Systems Analyst': ['Programmer Analyst', 'Systems Analyst'],
    'Networks/ Systems': ['Network Security Administrator', 'Network Security Engineer', 'Network Engineer', 'Systems Security Administrator', 'Software Systems Engineer', 'Information Security Analyst'],
    'SE/SDE': ['Software Engineer', 'Software Developer'],
    'Technical Support/Service': ['Technical Engineer', 'Technical Services/Help Desk/Tech Support', 'Technical Support'],
    'others': ['Solutions Architect', 'Data Architect', 'Information Technology Auditor'],
}

function buildDefaults() {
    const d = {}
    ACADEMIC_SLIDERS.forEach(f => { d[f.key] = 70 })
    SKILL_SLIDERS.forEach(f => { d[f.key] = f.default })
    CAPABILITY_SELECTS.forEach(f => { d[f.key] = f.options[0] })
    CAREER_SELECTS.forEach(f => { d[f.key] = f.options[0] })
    PERSONAL_SELECTS.forEach(f => { d[f.key] = f.options[0] })
    TEXT_FIELDS.forEach(f => { d[f.key] = '' })
    return d
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function SliderField({ icon, label, min = 0, max = 100, value, onChange }) {
    const pct = ((value - min) / (max - min)) * 100
    const isPercent = max === 100
    return (
        <div className="cp-field">
            <div className="cp-field-label">
                <i className={icon}></i>
                <span>{label}</span>
            </div>
            <div className="cp-slider-row">
                <input
                    type="range" min={min} max={max} step={1}
                    value={value} onChange={e => onChange(Number(e.target.value))}
                    className="cp-range"
                    style={{ '--pct': `${pct}%` }}
                />
                <span className="cp-slider-val">{value}{isPercent ? '%' : ''}</span>
            </div>
            {isPercent && (
                <div className="cp-progress">
                    <div className="cp-progress-fill" style={{ width: `${pct}%` }} />
                </div>
            )}
        </div>
    )
}

function SelectField({ icon, label, options, value, onChange }) {
    return (
        <div className="cp-field">
            <div className="cp-field-label">
                {icon && <i className={icon}></i>}
                <span>{label}</span>
            </div>
            <div className="cp-select-wrap">
                <select className="cp-select" value={value} onChange={e => onChange(e.target.value)}>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <i className="fa-solid fa-chevron-down cp-select-arrow"></i>
            </div>
        </div>
    )
}

function TextField({ icon, label, placeholder, value, onChange }) {
    return (
        <div className="cp-field">
            <div className="cp-field-label">
                {icon && <i className={icon}></i>}
                <span>{label}</span>
            </div>
            <div className="cp-input-wrap">
                <input
                    className="cp-input" type="text"
                    placeholder={placeholder} value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        </div>
    )
}

const TABS = [
    { label: 'Academic', icon: 'fa-solid fa-graduation-cap' },
    { label: 'Skills', icon: 'fa-solid fa-star' },
    { label: 'Interests', icon: 'fa-solid fa-compass' },
    { label: 'Traits', icon: 'fa-solid fa-user' },
]

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function CareerPredict() {
    const [form, setForm] = useState(buildDefaults)
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setResult(null)
        try {
            const res = await fetch('http://127.0.0.1:8501/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error()
            setResult(await res.json())
        } catch {
            // Demo result
            setResult({
                demo: true,
                prediction: 'SE/SDE',
                confidence: 72.4,
                probabilities: {
                    'SE/SDE': 72.4, 'Analyst': 10.2,
                    'Mobile Applications/ Web Development': 8.1,
                    'Networks/ Systems': 4.3, 'Databases': 2.5,
                    'QA/Testing': 1.3, 'Programming/ Systems Analyst': 0.8,
                    'CRM/Managerial Roles': 0.3, 'UX/Design': 0.1,
                    'Technical Support/Service': 0.0, 'others': 0.0,
                }
            })
        } finally {
            setLoading(false)
        }
    }

    function reset() { setForm(buildDefaults()); setResult(null); }

    const topProbs = result?.probabilities
        ? Object.entries(result.probabilities).sort((a, b) => b[1] - a[1])
        : []

    return (
        <div className="cp-page">

            <div className="container cp-layout">
                {/* ── Left Column: FORM PANEL ── */}
                <div className="cp-form-col">
                    <div className="cp-side-info">
                        <h1>Discover Your Ideal IT Career</h1>
                        <p>Our MLP neural network analyzes 38 attributes to predict your best-fit career with confidence scores.</p>
                    </div>

                    <form className="cp-form-panel" onSubmit={handleSubmit}>

                        {/* Panel header */}
                        <div className="cp-panel-header">
                            <div className="cp-panel-title">
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                                <h2>Profile Analysis</h2>
                            </div>
                            <button type="button" className="cp-reset-btn" onClick={reset}>
                                Reset Form
                            </button>
                        </div>

                    {/* Steps indicator */}
                    <div className="cp-steps">
                        {TABS.map((t, i) => (
                            <button
                                key={t.label} type="button"
                                className={`cp-step ${tab === i ? 'active' : ''} ${i < tab ? 'done' : ''}`}
                                onClick={() => setTab(i)}
                            >
                                <div className="cp-step-dot">
                                    {i < tab
                                        ? <i className="fa-solid fa-check"></i>
                                        : <span>{i + 1}</span>
                                    }
                                </div>
                                <div className="cp-step-info">
                                    <i className={t.icon}></i>
                                    <span>{t.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Tab 0 — Academic */}
                    {tab === 0 && (
                        <div className="cp-tab-body">
                            <div className="cp-section-info">
                                <h3><i className="fa-solid fa-graduation-cap"></i> Academic Mastery</h3>
                                <p>Provide your estimated proficiency in these core computer science subjects. Higher scores indicate stronger theoretical foundations.</p>
                            </div>
                            <div className="cp-fields-grid">
                                {ACADEMIC_SLIDERS.map(f => (
                                    <SliderField
                                        key={f.key} icon={f.icon} label={f.label}
                                        min={0} max={100} value={form[f.key]}
                                        onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 1 — Skills */}
                    {tab === 1 && (
                        <div className="cp-tab-body">
                            <div className="cp-section-info">
                                <h3><i className="fa-solid fa-lightbulb"></i> Practical Skills</h3>
                                <p>Rate your hands-on experience and general cognitive capabilities. These metrics help determine your technical and logical aptitude.</p>
                            </div>
                            <div className="cp-fields-grid">
                                {SKILL_SLIDERS.map(f => (
                                    <SliderField
                                        key={f.key} icon={f.icon} label={f.label}
                                        min={f.min} max={f.max} value={form[f.key]}
                                        onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>

                            <div className="cp-section-title" style={{ marginTop: '1.75rem' }}>
                                <i className="fa-solid fa-shield-halved"></i>
                                Capabilities & Extra-Curriculars
                            </div>
                            <div className="cp-fields-grid">
                                {CAPABILITY_SELECTS.map(f => (
                                    <SelectField
                                        key={f.key} label={f.label} options={f.options}
                                        icon={f.icon}
                                        value={form[f.key]} onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 2 — Interests */}
                    {tab === 2 && (
                        <div className="cp-tab-body">
                            <div className="cp-section-info">
                                <h3><i className="fa-solid fa-heart"></i> Personal Interests</h3>
                                <p>Extracurricular efforts and career preferences often dictate the environment where you will thrive most.</p>
                            </div>
                            <div className="cp-fields-grid">
                                {TEXT_FIELDS.map(f => (
                                    <TextField
                                        key={f.key} icon={f.icon} label={f.label}
                                        placeholder={f.placeholder} value={form[f.key]}
                                        onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>

                            <div className="cp-section-title" style={{ marginTop: '1.75rem' }}>
                                <i className="fa-solid fa-compass"></i>
                                Career Ambitions
                            </div>
                            <div className="cp-fields-grid">
                                {CAREER_SELECTS.map(f => (
                                    <SelectField
                                        key={f.key} label={f.label} options={f.options}
                                        icon={f.icon}
                                        value={form[f.key]} onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 3 — Personal Traits */}
                    {tab === 3 && (
                        <div className="cp-tab-body">
                            <div className="cp-section-info">
                                <h3><i className="fa-solid fa-user-gear"></i> Personality Profile</h3>
                                <p>Your work style and interpersonal traits are key indicators for managerial vs technical role suitability.</p>
                            </div>
                            <div className="cp-fields-grid">
                                {PERSONAL_SELECTS.map(f => (
                                    <SelectField
                                        key={f.key} label={f.label} options={f.options}
                                        icon={f.icon}
                                        value={form[f.key]} onChange={v => set(f.key, v)}
                                    />
                                ))}
                            </div>

                            {/* Summary Review */}
                            <div className="cp-review-box">
                                <div className="cp-review-header">
                                    <i className="fa-solid fa-clipboard-check"></i>
                                    <span>Profile Summary Review</span>
                                </div>
                                <div className="cp-review-grid">
                                    <div className="cp-review-item">
                                        <label>Academic Avg</label>
                                        <span>{Math.round(ACADEMIC_SLIDERS.reduce((a, b) => a + form[b.key], 0) / ACADEMIC_SLIDERS.length)}%</span>
                                    </div>
                                    <div className="cp-review-item">
                                        <label>Logic/Coding</label>
                                        <span>{form.logical}/10, {form.coding}/10</span>
                                    </div>
                                    <div className="cp-review-item">
                                        <label>Style</label>
                                        <span>{form.worker_type}</span>
                                    </div>
                                    <div className="cp-review-item">
                                        <label>Goal</label>
                                        <span>{form.job_studies}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation row */}
                    <div className="cp-nav-row">
                        {tab > 0 && (
                            <button type="button" className="cp-btn-outline" onClick={() => setTab(t => t - 1)}>
                                <i className="fa-solid fa-arrow-left"></i> Previous
                            </button>
                        )}
                        <div style={{ flex: 1 }} />
                        {tab < TABS.length - 1 ? (
                            <button type="button" className="cp-btn-primary" onClick={() => setTab(t => t + 1)}>
                                Continue <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        ) : (
                            <button type="submit" className="cp-btn-primary" disabled={loading}>
                                {loading
                                    ? <><i className="fa-solid fa-spinner fa-spin"></i> Processing...</>
                                    : <><i className="fa-solid fa-brain"></i> Generate Prediction</>
                                }
                            </button>
                        )}
                    </div>

                    {/* Quick submit link */}
                    {tab < TABS.length - 1 && (
                        <button type="submit" className="cp-quick-submit" disabled={loading}>
                            {loading
                                ? <><i className="fa-solid fa-spinner fa-spin"></i> Analyzing...</>
                                : <>Instant Prediction (Skip Steps) <i className="fa-solid fa-arrow-right"></i></>
                            }
                        </button>
                    )}
                </form>
                </div>

                {/* ── Right Column: RESULTS PANEL ── */}
                <div className="cp-results-panel">

                    {/* Placeholder */}
                    {!result && !loading && (
                        <div className="cp-placeholder">
                            <div className="cp-placeholder-icon">
                                <i className="fa-solid fa-bolt-lightning"></i>
                            </div>
                            <h3>AI Analysis Ready</h3>
                            <p>Complete your profile and let our neural network calculate your career trajectory with data-driven precision.</p>
                            <ul className="cp-tips">
                                <li><i className="fa-solid fa-check-double"></i> 38 distinct attributes analyzed</li>
                                <li><i className="fa-solid fa-check-double"></i> Real-time confidence scoring</li>
                                <li><i className="fa-solid fa-check-double"></i> Personalized roadmap generation</li>
                            </ul>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="cp-loading">
                            <div className="cp-spinner-wrap">
                                <div className="cp-spinner"></div>
                                <div className="cp-spinner-inner"></div>
                            </div>
                            <h3>Analyzing Your DNA</h3>
                            <p>Calculating probabilities across 11 IT categories using hidden layers...</p>
                        </div>
                    )}

                    {/* Result */}
                    {result && !loading && (
                        <div className="cp-result fade-in">

                            {result.demo && (
                                <div className="cp-demo-notice">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <span>Demo mode — backend not connected. Predicted using local fallback logic.</span>
                                </div>
                            )}

                            {/* Primary prediction card */}
                            <div className="cp-result-card main-card">
                                <div className="cp-result-header">
                                    <div className="cp-result-status">
                                        <i className="fa-solid fa-stars"></i> HIGH MATCH FOUND
                                    </div>
                                    <div className="cp-match-score">
                                        <div className="cp-score-circle">
                                            <span>{result.confidence?.toFixed(0)}</span>
                                            <small>%</small>
                                        </div>
                                        <span className="cp-score-label">Match Score</span>
                                    </div>
                                </div>

                                <div className="cp-result-body">
                                    <div className="cp-insight-badge">
                                        <i className="fa-solid fa-bolt"></i> Instant Insight
                                    </div>
                                    <span className="cp-result-eyebrow">Your Optimal Career Path</span>
                                    <h2 className="cp-result-career">{result.prediction}</h2>

                                    <div className="cp-personality-badge">
                                        <i className="fa-solid fa-user-check"></i>
                                        <span>Personality Align: <strong>{form.mgmt_tech} / {form.worker_type}</strong></span>
                                    </div>

                                    <div className="cp-progress-group">
                                        <div className="cp-conf-track">
                                            <div className="cp-conf-fill" style={{ width: `${Math.min(result.confidence, 100)}%` }} />
                                        </div>
                                        <div className="cp-conf-labels">
                                            <span>AI Confidence Level</span>
                                            <span>{result.confidence?.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Specific roles cards */}
                                {JOB_CATEGORIES[result.prediction] && (
                                    <div className="cp-roles-report">
                                        <div className="cp-report-title">
                                            <i className="fa-solid fa-briefcase"></i>
                                            Recommended Specializations
                                        </div>
                                        <div className="cp-roles-grid">
                                            {JOB_CATEGORIES[result.prediction].map(role => (
                                                <div key={role} className="cp-role-item">
                                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                                    {role}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="cp-action-row">
                                    <Link
                                        to={`/roadmap?career=${encodeURIComponent(result.prediction)}`}
                                        className="cp-roadmap-btn-premium"
                                    >
                                        <span>Build Learning Roadmap</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>

                            {/* Confidence chart */}
                            {topProbs.length > 0 && (
                                <div className="cp-distribution-card">
                                    <div className="cp-card-header">
                                        <h3><i className="fa-solid fa-dna"></i> Match Distribution</h3>
                                        <div className="cp-badge-small">AI Probability Map</div>
                                    </div>
                                    <div className="cp-dist-list">
                                        {topProbs.slice(0, 5).map(([label, val], i) => (
                                            <div key={label} className="cp-dist-row">
                                                <div className="cp-dist-info">
                                                    <span className="cp-dist-label">{label}</span>
                                                    <span className="cp-dist-val">{val.toFixed(1)}%</span>
                                                </div>
                                                <div className="cp-dist-bar-wrap">
                                                    <div
                                                        className="cp-dist-bar-fill"
                                                        style={{
                                                            width: `${Math.min(val, 100)}%`,
                                                            background: i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.05)'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
