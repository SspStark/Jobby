import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="logo-role-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
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
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem
