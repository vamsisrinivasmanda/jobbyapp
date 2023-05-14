import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="desc">
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              className="findjob-btn"
              type="button"
              onClick={this.onclickJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
