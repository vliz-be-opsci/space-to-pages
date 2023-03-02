//this file will be the main data block for the app
//

import React from 'react';

/*styles here*/

function MainDataBlock(data) {

    const imageStyle = {
        background: `linear-gradient(90deg, rgba(255,255,255,0) 27%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 65%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        /*be more opace to the right side of image*/
    }

    return (
            <div className="main-data-block">
                {/* Have a fading picture to the right here  */}
                <div className="main-data-block__content" style={imageStyle}>
                    <img src={data.logo} className="project_logo"></img>
                    <div className='description_project'>
                        {data.description}
                    </div>
                </div>
            </div>
    );
}

export default MainDataBlock;