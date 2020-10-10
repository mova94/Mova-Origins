import React from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">MovaBook</h1>
            <p className="lead">
              Become a memeber of the Mova Family, share posts and see how the community is doing
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}
