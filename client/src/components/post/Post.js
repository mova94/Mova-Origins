import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import {getPost} from '../../actions/post'

const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost,match.params.id]);
    
    return loading || post === null ? <Spinner/>  : <React.Fragment>
        <PostItem post={post} showActions={false}/>
    </React.Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
