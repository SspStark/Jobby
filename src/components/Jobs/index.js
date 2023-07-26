import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileSection from '../ProfileSection'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    selectedEmployment: '',
    selectedSalary: '',
    searchInput: '',
  }

  renderSearchContainer = () => (
    <div className="search-container">
      <input type="search" className="search-input" placeholder="Search" />
      <button
        type="button"
        className="search-button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderFailureView = () => (
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
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state
    return jobsList.length !== 0 ? (
      <p>jobs</p>
    ) : (
      <div className="no-jobs-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-failure-image"
        />
        <h1 className="no-jobs-failure-heading">No Jobs Found</h1>
        <p className="no-jobs-failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-section">
          <div className="profile-filters-container">
            <div className="search-mobile-view">
              {this.renderSearchContainer()}
            </div>
            <ProfileSection />
          </div>
          <div className="jobs-container">
            <div className="search-pc-view">{this.renderSearchContainer()}</div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
