import React from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
    return(
        <React.Fragment>
            <img 
                src={spinner} 
                alt="Loading---" 
                style={{width: '1000px', margin: 'auto', display: 'block'}}
            />
        </React.Fragment>
    )
}

export default Spinner;
