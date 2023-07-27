import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = jobData => ({
    companyLogoUrl: jobData.company_logo_url,
    companyWebsiteUrl: jobData.company_website_url,
    employmentType: jobData.employment_type,
    id: jobData.id,
    jobDescription: jobData.job_description,
    skills: jobData.skills,
    lifeAtCompany: jobData.life_at_company,
    location: jobData.location,
    packagePerAnnum: jobData.package_per_annum,
    rating: jobData.rating,
    title: jobData.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = this.getFormattedData(data.job_details)
      const similarJobsData = data.similar_jobs.map(each =>
        this.getFormattedData(each),
      )
      console.log(similarJobsData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: formattedData,
        similarJobs: similarJobsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryJobItemDetails = () => this.getJobDetails()

  renderJobDetailsFailure = () => (
    <div className="no-jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-failure-image"
      />
      <h1 className="no-jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <div className="job-details-container">
          <div className="logo-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-heading-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h2 className="skills-heading">Skills</h2>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill-list-item">
                <img
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h2 className="life-at-company">Life at Company</h2>
          <div className="life-at-company-details">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              className="life-at-company-img"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h2 className="similar-jobs-heading">Similar Jobs</h2>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJobItem similarJobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
