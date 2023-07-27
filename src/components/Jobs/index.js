import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobItem from '../JobItem'
import JobFiltersGroup from '../JobFiltersGroup'
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
    selectedEmployments: [],
    selectedSalary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {selectedEmployments, selectedSalary, searchInput} = this.state
    const employments = selectedEmployments.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employments}&minimum_package=${selectedSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  selectEmploymentType = event => {
    const {selectedEmployments} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        prevState => ({
          selectedEmployments: [...prevState.selectedEmployments, value],
        }),
        this.getJobsList,
      )
    } else {
      const updatedEmploymentTypes = selectedEmployments.filter(
        each => each !== value,
      )
      this.setState(
        {selectedEmployments: updatedEmploymentTypes},
        this.getJobsList,
      )
    }
  }

  changeSalaryRange = event =>
    this.setState({selectedSalary: event.target.value}, this.getJobsList)

  changeSearchInput = event => this.setState({searchInput: event.target.value})

  searchJobs = () => this.getJobsList()

  renderSearchContainer = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.changeSearchInput}
      />
      <button
        type="button"
        className="search-button"
        data-testid="searchButton"
        onClick={this.searchJobs}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  retryJobsList = () => this.getJobsList()

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
      <button
        type="button"
        className="retry-button"
        onClick={this.retryJobsList}
      >
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
      <div>
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <JobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
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
    const {selectedEmployments, selectedSalary} = this.state
    return (
      <>
        <Header />
        <div className="jobs-section">
          <div className="profile-filters-container">
            <div className="search-mobile-view">
              {this.renderSearchContainer()}
            </div>
            <ProfileSection />
            <JobFiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              selectedEmployments={selectedEmployments}
              selectedSalary={selectedSalary}
              selectEmployment={this.selectEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobs-container">
            <div className="search-pc-view">{this.renderSearchContainer()}</div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
