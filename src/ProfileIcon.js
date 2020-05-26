import React from "react";

export default function ProfileIcon(props) {
    const { profilePhoto, size = "md", background="white" } = props;
    let image;
    switch (size) {
        case "sm":
            image = <img className={size} src={profilePhoto} alt="profilepic" />;
            break;
        case "md":
            image = <img className={size} src={profilePhoto} alt="profilepic" />;
            break;
        default:
            image = null;
    }
    return <div style={{background: background }} className="profile-pic">{image}</div>;
}
