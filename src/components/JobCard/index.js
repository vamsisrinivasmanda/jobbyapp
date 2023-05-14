import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {eachData} = props
  //   console.log(eachData)
  const {
    employeeType,
    companyLogoUrl,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = eachData
  return (
    <li className="job-detail-contianer">
      <div className="list-header-container">
        <img src={companyLogoUrl} className="company-logo" />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="star-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-specifin-container">
        <div className="location-details">
          <div className="row-container">
            <MdLocationOn className="icon" />
            <p className="text">{location}</p>
          </div>
          <div className="row-container">
            <BsBriefcaseFill className="icon" />
            <p className="text">{employeeType}</p>
          </div>
        </div>
        <p>{packagePerAnnum}</p>
      </div>
      <hr className="list-line" />
      <div className="descri-container">
        <h2 className="description">Description</h2>
        <p className="desc">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobCard
