import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="logo-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-rating-container">
            <h2 className="job-role">{title}</h2>
            <div className="rating-container">
              <AiFillStar className="rating-star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-type-container">
            <div className="job-icons-container">
              <MdLocationOn className="job-icons" />
              <p className="icons-label">{location}</p>
            </div>
            <div className="job-icons-container">
              <BsBriefcaseFill className="job-icons" />
              <p className="icons-label">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
