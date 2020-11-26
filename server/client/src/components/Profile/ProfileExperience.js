import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience:{
    company,
    to,
    from,
    title,
    current,
    description
  }
  // TODO WILL ADD SEPARATE FOR FIELD OF STUDY AND DEGREE AND DESCRIPTION
}) => {
    return (
        <div>
            <h3 class="text-dark">{company}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Current' : <Moment format='YYYY/MM/DD'>{to}</Moment> }
            </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>
              {description}
            </p>
          </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
