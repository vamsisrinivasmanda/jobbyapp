import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/index'

import ProfileDetails from '../ProfileDetails/index'
import JobCard from '../JobCard/index'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  profilesuccess: 'SUCCESS',
  profilefailure: 'FAILURE',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiActiveStatus: apiStatus.initial,

    jobsList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getjobsList()
  }

  onchangeInput = event => {
    // console.log(event.target.value)
    this.setState({searchInput: event.target.value}, this.getjobsList)
  }

  getchangedata = eachjob => ({
    id: eachjob.id,
    employeeType: eachjob.employment_type,
    companyLogoUrl: eachjob.company_logo_url,
    jobDescription: eachjob.job_description,
    packagePerAnnum: eachjob.package_per_annum,
    location: eachjob.location,
    rating: eachjob.rating,
    title: eachjob.title,
  })

  getjobsList = async () => {
    const {searchInput} = this.state
    const jobsurl = `https://apis.ccbp.in/jobs?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsurl, options)
    if (response.ok === true) {
      const jobslist = await response.json()

      const updatejobslist = jobslist.jobs.map(eachjob =>
        this.getchangedata(eachjob),
      )
      this.setState({
        jobsList: updatejobslist,
        apiActiveStatus: apiStatus.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiActiveStatus: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderjobsList = () => {
    const {jobsList, searchInput} = this.state
    console.log(searchInput)
    return (
      <div className="job-search-container">
        <input
          type="search"
          className="search-job-input"
          placeholder="Search"
          onChange={this.onchangeInput}
          value={searchInput}
        />
        <ul>
          {jobsList.map(eachjobData => (
            <JobCard eachData={eachjobData} />
          ))}
        </ul>
      </div>
    )
  }

  renderjobViews = () => {
    const {apiActiveStatus} = this.state
    switch (apiActiveStatus) {
      case apiStatus.success:
        return this.renderjobsList()
      case apiStatus.loading:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="job-container">
          <ProfileDetails />
          {this.renderjobViews()}
        </div>
      </>
    )
  }
}

export default Jobs
