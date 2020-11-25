import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
    bio,
    interests,
    user: {name}
  }
}) => {
    return (
        <div className="profile-about bg-light p-2">
          {bio && (
              <React.Fragment>
                <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                <p>{bio}</p>
              </React.Fragment>
          )}
          <div className="line"></div>
          <h2 className="text-primary">Interests</h2>
          <div className="skills">
            {interests[0].split(',').map((interest, index) => (
                <div className="p-1" key={index}><i className="fa fa-check"></i>{interest}</div>
            ))}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
