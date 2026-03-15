import { Link } from 'react-router-dom'
import './Blog.css'

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Top 5 Machine Learning Frameworks to Learn in 2026',
      excerpt: 'Discover the most in-demand ML libraries that top tier companies are hiring for right now. TensorFlow, PyTorch, and emerging contenders.',
      category: 'Data Science',
      date: 'Oct 12, 2025',
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'How to Build a Developer Portfolio That Gets You Hired',
      excerpt: 'Your GitHub represents your work ethic. Learn how to structure your projects, write perfect READMEs, and deploy live demos effectively.',
      category: 'Career Advice',
      date: 'Sep 28, 2025',
      readTime: '8 min read',
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'System Design Interview: The Complete Guide',
      excerpt: 'Scaling from 0 to 1 million users. Key concepts like load balancing, database sharding, caching strategies, and microservices architectures.',
      category: 'Engineering',
      date: 'Sep 15, 2025',
      readTime: '12 min read',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Frontend vs Backend: Which path is right for you?',
      excerpt: 'A deep dive into the daily life, technology stacks, and average compensation mapping for specialized software engineering roles.',
      category: 'Industry Insights',
      date: 'Aug 30, 2025',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'Demystifying Cyber Security Certificates',
      excerpt: 'CompTIA Security+, CISSP, CEH... Which certifications actually move the needle on your resume when breaking into InfoSec?',
      category: 'Security',
      date: 'Aug 14, 2025',
      readTime: '7 min read',
      img: 'https://images.unsplash.com/photo-1510515152569-e0cbd3a1af6b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      title: 'The Rise of AI-Assisted Programming tools',
      excerpt: 'How GitHub Copilot, Cursor, and LLMs are changing the way software engineers write code. Spoiler: it is augmentative, not a replacement.',
      category: 'Technology',
      date: 'Jul 22, 2025',
      readTime: '10 min read',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container text-center">
          <div className="section-tag"><i className="fa-solid fa-newspaper"></i> Latest Articles</div>
          <h1 className="display-title">Insights for Tech Careers</h1>
          <p className="hero-subtitle">
            Get the latest industry trends, technical guides, and career advice curated by the experts behind CareerAI.
          </p>
        </div>
      </div>

      <div className="container pb-100">
        <div className="blog-grid">
          {posts.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
              <div className="blog-img-wrap">
                <img src={post.img} alt={post.title} className="blog-img" />
                <div className="blog-category">{post.category}</div>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <div className="meta-item"><i className="fa-regular fa-calendar"></i> {post.date}</div>
                  <div className="meta-item"><i className="fa-regular fa-clock"></i> {post.readTime}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-pagination">
          <button className="btn btn-outline disabled" disabled>Previous</button>
          <span className="page-num">1</span>
          <button className="btn btn-outline disabled" disabled>Next</button>
        </div>
      </div>
    </div>
  )
}
