import './index.css'

const JobFiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    selectEmployment,
    changeSalaryRange,
  } = props

  const renderEmploymentTypes = () => (
    <>
      <h2 className="heading">Type of Employment</h2>
      <ul className="list-container">
        {employmentTypesList.map(each => (
          <li className="list-item" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.label}
              value={each.employmentTypeId}
              onChange={selectEmployment}
            />
            <label htmlFor={each.label} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryRanges = () => (
    <>
      <h2 className="heading">Salary Range</h2>
      <ul className="list-container">
        {salaryRangesList.map(each => (
          <li className="list-item" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.label}
              value={each.salaryRangeId}
              name="salaries"
              onChange={changeSalaryRange}
            />
            <label htmlFor={each.label} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filters-container">
      {renderEmploymentTypes()}
      <hr className="line" />
      {renderSalaryRanges()}
    </div>
  )
}

export default JobFiltersGroup
