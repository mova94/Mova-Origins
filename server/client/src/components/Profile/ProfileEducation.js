import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education :{
    name,
    degree,
    location,
    to,
    from,
    current
}}) => {
    return (

          <div>
            <h3>{name}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Current' : <Moment format='YYYY/MM/DD'>{to}</Moment> }
            </p>
            <p><strong>Degree: </strong>{degree}</p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education:PropTypes.object.isRequired
}

export default ProfileEducation
