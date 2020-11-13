import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
    profile: {
        user:{_id, name, avatar},
        currentStatus,
        location,
        interests
    }
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{currentStatus}</p>
                <p className="my-1">{location}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {interests[0].split(',').map((interest,index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"/> {interest}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
