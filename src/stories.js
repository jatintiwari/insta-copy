import React from 'react';
import {stories} from './data.js'

function Stories() {
    return <div className="stories">
        {stories.map(story => {
            return (
                <div key={story.id} className="story">
                    <div className="photo-container">
                        <img src={story.photoUrl} alt="pic1" className="photo" />
                    </div>
                    <div className="username">{story.name}</div>
                </div>
            )
        })}
    </div>
}
export default Stories
