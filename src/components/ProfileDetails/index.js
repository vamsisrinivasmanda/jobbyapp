import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Profile from '../Profile/index'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  profilesuccess: 'SUCCESS',
  profilefailure: 'FAILURE',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    apiActiveStatus: apiStatus.initial,
    isprofileloading: true,

    profileDetails: {},
  }

  componentDidMount() {
    this.getProfiledetails()
  }

  getProfiledetails = async () => {
    const profileapiurl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileapiurl, options)

    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = {
        name: data.profile_details.name,
        profileImagaUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiActiveStatus: apiStatus.profilesuccess,
      })
    }
    if (response.status === 400) {
      this.setState({apiActiveStatus: apiStatus.profilefailure})
    }
  }

  renderProfileDetails = () => {
    const {isprofileloading, profileDetails} = this.state
    // console.log(profileDetails)

    return <Profile profileDetails={profileDetails} />
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderallViews = () => {
    const {apiActiveStatus} = this.state
    switch (apiActiveStatus) {
      case apiStatus.profilesuccess:
        return this.renderProfileDetails()
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.profilefailure:
        return this.renderProfilefailure()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderallViews()}</>
  }
}

export default ProfileDetails
