import React from "react";

function Stories(props) {
    const { stories = [], background, storyClass="", storiesClass="" } = props;
    return (
        <div className={`stories ${storiesClass}`}>
            {stories.map((story) => {
                return (
                    <div key={story.id} className={`story ${storyClass}`} style={{ background }}>
                        <div className="photo-container">
                            <img src={story.photoUrl} alt="pic1" className="photo" />
                        </div>
                        <div className="username">{story.name}</div>
                    </div>
                );
            })}
        </div>
    );
}
export default Stories;
