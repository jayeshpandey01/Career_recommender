import { Link } from 'react-router-dom'
import './Reviews.css'

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Recent Graduate',
      content: 'The career prediction matched my interests perfectly. The roadmap feature helped me land my first junior developer role within 6 months of graduating!',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'I used the AI Roadmap to pivot from frontend to full-stack. Having a customized learning path with specific technologies to learn saved me hundreds of hours of research.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Data Science Student',
      content: 'The 38-attribute personality and academic test is incredibly accurate. It recommended Data Analyst for me, which is exactly what I was leaning towards.',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?u=elena'
    },
    {
      id: 4,
      name: 'David Smith',
      role: 'IT Professional',
      content: 'Clean UI, fast predictions, and the roadmap flowcharts are a game-changer for visual learners like myself.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=david'
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'Career Changer',
      content: 'Transitioning from healthcare into tech was daunting. CareerAI gave me the confidence to pursue cybersecurity and a step-by-step guide to get there.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=priya'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      role: 'System Administrator',
      content: 'Good platform, but I wish the backend connected faster sometimes. The predictions are solid though.',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?u=alex'
    }
  ];

  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <div className="container text-center">
          <div className="section-tag"><i className="fa-solid fa-star"></i> Success Stories</div>
          <h1 className="display-title">What Our Users Are Saying</h1>
          <p className="hero-subtitle">
            Join thousands of students and professionals who have navigated their tech careers using CareerAI's intelligent prediction and roadmapping tools.
          </p>
        </div>
      </div>

      <div className="container pb-100">
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star ${i < review.rating ? 'active' : ''}`}></i>
                ))}
              </div>
              <p className="review-content">"{review.content}"</p>
              <div className="review-author">
                <img src={review.avatar} alt={review.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{review.name}</h4>
                  <span className="author-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta text-center mt-60">
          <h2 className="mb-24">Ready to start your journey?</h2>
          <div className="d-flex justify-content-center gap-16">
            <Link to="/predict" className="btn btn-black-pill">Predict Career</Link>
            <Link to="/roadmap" className="btn btn-outline">Build Roadmap</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
