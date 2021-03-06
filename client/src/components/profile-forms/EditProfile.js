import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile';
import {withRouter, Link} from 'react-router-dom';

const EditProfile = ({profile:{profile, loading}, createProfile, getCurrentProfile, history}) => {

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            gender: loading || !gender ? '' : gender,
            relationshipStatus:loading || !profile.relationshipStatus? '': profile.relationshipStatus,
            bio:loading || !profile.bio? '': profile.bio,
            interests:loading || !profile.interests? '': profile.interests,
            currentStatus:loading || !profile.currentStatus? '': profile.currentStatus,
            location: loading || !profile.location? '': profile.location,
            twitter:loading || !profile.social.twitter? '': profile.social.twitter,
            facebook:loading || !profile.social.facebook? '': profile.social.facebook,
            linkedin:loading || !profile.social.linkedin? '': profile.social.linkedin,
            instagram:loading || !profile.social.instagram? '': profile.social.instagram,
            youtube:loading || !profile.social.youtube? '': profile.social.youtube
        })
    },[loading, getCurrentProfile]);// eslint-disable-line react-hooks/exhaustive-deps

    const [formData, setFormData] = useState({
        gender:'',
        relationshipStatus:'',
        bio:'',
        interests:'',
        currentStatus:'',
        location: '',
        twitter:'',
        facebook:'',
        linkedin:'',
        instagram:'',
        youtube:''
    });

    const [displaySocial, toggleSocial] = useState(false);

    const {
        relationshipStatus,
        bio,
        gender,
        interests,
        currentStatus,
        location,
        twitter,
        facebook,
        linkedin,
        instagram,
        youtube
    } = formData;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true)
    }

    return (
        <React.Fragment>
                <h1 className="large text-primary">
                    Edit Your Profile
                </h1>
                <p className="lead">
                    <i className="fas fa-user"/>Let's get some information to make your
                    profile stand out
                </p>

                <small>* = required field</small>
                <form className="form" onSubmit={e => handleSubmit(e)}>
                
                    <div className="form-group">
                    <select name="currentStatus" value={currentStatus} onChange={e => handleChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Engineer</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                    </div>

                    <div className="form-group">
                        <select name="gender" value={gender} onChange={e => handleChange(e)}>
                            <option value="0">* Please select gender</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select name="relationshipStatus" value={relationshipStatus} onChange={ e => handleChange(e)}>
                            <option value="0">* Relationship Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="It's Complicated">It's Complicated</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="Location" value={location} name="location" onChange={ e => handleChange(e)} />
                    <small className="form-text">
                        City & State suggested (eg. Boston, MA)
                    </small>
                    </div>

                    <div className="form-group">
                    <textarea placeholder="A short bio of yourself" value={bio} name="bio" onChange={ e => handleChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="* Interests" name="interests" value={interests} onChange={ e => handleChange(e)}/>
                        <small className="form-text">
                            Please use comma separated values (eg.
                            Hiking,Gym,Food,Boba,Anime,etc.)
                        </small>
                    </div>

                    <div className="my-2">
                    <button type="button" onClick={() => toggleSocial(!displaySocial)} className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                    </div>
                
                {displaySocial && 
                    <React.Fragment>
                        <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" value={twitter} name="twitter" onChange={ e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" value={facebook} name="facebook" onChange={ e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" value={youtube} name="youtube" onChange={ e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i> 
                        <input type="text" placeholder="Linkedin URL" value={linkedin} name="linkedin" onChange={ e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" value={instagram} name="instagram" onChange={ e => handleChange(e)} />
                        </div>
                    </React.Fragment>}
                
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </React.Fragment>
    )
}


EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile 
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
