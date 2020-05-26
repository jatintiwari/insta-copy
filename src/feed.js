import React, { Component, useState } from "react";
import "./feed.css";
import Stories from "./stories";

import Data, { feeds, stories } from "./data.js";
const likesArr = window.localStorage.getItem("likes"); // can be null or something like "[1,2,3]"

let likes = JSON.parse(likesArr || "[]"); // if it is '[1,2,3]' then use likesArr otherwise use '[]' to parse the value
/**
 * JSON
 *  - stringify => converts object/array into string.
 *                      eg - {name: "avi"} -> stringify -> "{\"name\":\"avi\"}"
 *                         - [1,2,3] -> stringify -> "[1,2,3]"
 *  - parse => converts strings back to objects
 *                      eg - "{\"name\":\"avi\"}"  -> parse -> {name: "avi"}
 *                         - "[1,2,3]" -> parse -> [1,2,3]
 */
const OptionsButton = () => (
    <svg aria-label="More options" class="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16">
        <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
        <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
        <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
    </svg>
);

const LikesButton = () => (
    <svg aria-label="Like" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>
);

const CommentButton = () => (
    <svg aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path
            clip-rule="evenodd"
            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
            fill-rule="evenodd"
        ></path>
    </svg>
);
const SendButton = () => (
    <svg aria-label="Share Post" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
    </svg>
);
const SaveButton = () => (
    <svg aria-label="Save" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
    </svg>
);
const LikedButton = () => (
    <svg aria-label="Unlike" class="_8-yf5 " fill="#ed4956" height="24" viewBox="0 0 48 48" width="24">
        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>
);
const SavedButton = () => (
    <svg aria-label="Remove" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 28.9 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1z"></path>
    </svg>
);

function Comment(props) {
    const { comment } = props;
    return (
        <div className="comment">
            <strong>{comment.username}</strong>&nbsp;
            <span>{comment.text}</span>
        </div>
    );
}

function Likes(props) {
    const { likes, likedBy } = props;
    return (
        <div className="likes">
            <span class="image-container">
                Liked by &nbsp;
                <img src={likedBy.userPhotoUrl} alt="" />
                &nbsp;
                <strong>{likedBy.username}</strong>
            </span>
            &nbsp;and&nbsp;
            <strong>{parseInt(likes) - 1} others</strong>
        </div>
    );
}

function Caption(props) {
    const { username, caption } = props;
    const threshHoldLength = 10;
    const [showTruncated, setShowTruncated] = useState(true);
    const truncatedCaption = caption.length > threshHoldLength ? caption.slice(0, threshHoldLength) + " ..." : caption;
    const handleMore = () => {
        setShowTruncated(false);
    };
    return (
        <div className="caption-section">
            <strong>{username}</strong>&nbsp;
            {caption.length > threshHoldLength && showTruncated ? (
                <span>
                    {truncatedCaption} <span onClick={handleMore}>more</span>
                </span>
            ) : (
                caption
            )}
        </div>
    );
}

class CaptionC extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            showTruncated: true,
            value2: true,
        };
        this.handleMore = this.handleMore.bind(this);
    }

    handleMore() {
        console.log({ handleMore: this.state.showTruncated });
        this.setState({
            showTruncated: false,
            value2: false,
        });
    }

    render() {
        const { username, caption } = this.props;
        const threshHoldLength = 10;
        const truncatedCaption = caption.length > threshHoldLength ? caption.slice(0, threshHoldLength) + " ..." : caption;
        return (
            <div className="caption-section">
                <strong>{username}</strong>&nbsp;
                {caption.length > threshHoldLength && this.state.showTruncated ? (
                    <span>
                        {truncatedCaption} <span onClick={this.handleMore}>more</span>
                    </span>
                ) : (
                    caption
                )}
            </div>
        );
    }
}

function FeedLabel(props) {
    const { userPhotoUrl, username } = props; // this.props not required coz inside functional component
    return (
        <div className="feed-label-container">
            <div className="photo-username-container">
                <div className="photo-container">
                    <img src={userPhotoUrl} alt="pic1" />
                </div>
                <div>
                    <p className="username">{username}</p>
                </div>
            </div>
            <div>
                <OptionsButton />
            </div>
        </div>
    );
}

const FeedImage = (props) => {
    return <img src={props.img} alt="feedImage1" className="feed-image" />;
};

const LikeSection = (props) => {
    const { liked, bookmarked, handleBookmark, handleLike } = props;
    return (
        <div className="like-section">
            <div className="like-group">
                <div className="like-button" onClick={handleLike}>
                    {liked ? <LikedButton /> : <LikesButton />}
                </div>
                <div className="comment-button">
                    <CommentButton />
                </div>
                <div className="send-button">
                    <SendButton />
                </div>
            </div>
            <div className="save-button" onClick={handleBookmark}>
                {bookmarked ? <SavedButton /> : <SaveButton />}
            </div>
        </div>
    );
};

class Comments extends Component {
    state = {
        showAll: false,
    };
    handleViewAll = () => {
        // no need to bind as arrow function in class are bound to this always, no need of this.funcitonName = this.functionName.bind(this);
        this.setState({
            showAll: true,
        });
    };
    render() {
        const { comments } = this.props;
        if (!comments) {
            return null;
        }
        const totalComments = comments.length;
        return (
            <div className="comments-section">
                {this.state.showAll ? (
                    comments.map((comment) => <Comment comment={comment} key={comment.id} />)
                ) : (
                    <div>
                        <div className="medium grey view-all" onClick={this.handleViewAll}>
                            View all {totalComments} comments
                        </div>
                        <Comment comment={comments[0]} key={comments[0].id} />
                    </div>
                )}
            </div>
        );
    }
}

class Feed extends Component {
    likes = [];
    constructor(props) {
        super(props);
        const isLiked = likes.find((id) => id === this.props.id);
        /**
         * find => it is as same filter, return the first true value
         *         eg: likes = []
         *         likes => find => length of array is 0, return null
         *         eg: likes = [1,2,3]
            maps feeds => feed
            - we are mapping on feeds array and each <Feed/> component get an unique feed object from the array
            - then, we are mapping on likes array which has values [1,2,3]  
            - then, find return the first match value which is equal (feed.id). which is 1 in the first case, 2 nd is another
            - if the values is not falsly(ie. not undefined or null), then we consider isLiked as a true boolean
                - Boolean(undefined) = false
                - Boolean(null) = false
                - Boolean("") = false
                - Boolean(feed.id which is 1) = true
            - so in our case find returns 1 and we mark isLiked in the component state its value
                *          Feed(feed) =>
                    *         likes => find => id = 1 => id === this.pros.feed.id(1)
                *          Feed(feed) =>
                    *         likes => find => id = 2 => id === this.pros.feed.id(2)
         */

        // console.log(likes,this.props.feed.id, { isLiked})
        this.state = {
            liked: isLiked || this.props.feed.liked,
            /**
             * if it is not included in LS we will fall back to show values from data.
             * so if [1,2,3] is stored LS isLiked value will be false for the id = 4
             * but if id =4 in data.js has liked as true - this will make the condition true
             * (false || true) - true
             * (false || false) - false
             * (false && true) - false
             * (true && true) - true
             */
            bookmarked: this.props.feed.bookmarked,
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleBookmark = this.handleBookmark.bind(this);
    }
    handleLike() {
        /**
         * this.state.liked - it is initialized with the value from localstorage or from data.js
         */
        if (this.state.liked) {
            /**
             * filter => it returns all the true values
             *         eg: likes = []
             *         likes => filter => length of array is 0, return empty arr []
             *         eg: likes = [1,2,2,3,3,3]
             *         likes => filter => 2 => [2,2]
             *         eg: likes = [1,2,2,3,3,3]
             *         likes => filter => !2 => [1,3,3,3]
             */
            likes = likes.filter((id) => id !== this.props.feed.id);
            /**
             *          likes = [1,2,3]
             *          Feed(feed) =>
             *         likes => filter => id = 1 => id !== this.pros.feed.id(1) => [2,3]
             *          Feed(feed) =>
             *         likes => find => id = 2 => id === this.pros.feed.id(2) => [1,3]
             */
        } else {
            // likes = [...likes, this.props.feed.id];
            likes.push(this.props.feed.id);
        }
        localStorage.setItem("likes", JSON.stringify(likes));
        this.setState({
            liked: !this.state.liked,
        });
    }
    handleBookmark() {
        this.setState({
            bookmarked: !this.state.bookmarked,
        });
    }
    render() {
        const { feed, id } = this.props; // destruction method of getting keys from object. using this because inside class component
        return (
            <div key={id} className="feed-container">
                <FeedLabel userPhotoUrl={feed.userPhotoUrl} username={feed.username} />
                <FeedImage img={feed.feedImage} />
                <div className="feed-data">
                    <LikeSection
                        handleBookmark={this.handleBookmark}
                        handleLike={this.handleLike}
                        liked={this.state.liked}
                        bookmarked={this.state.bookmarked}
                    />
                    {feed.totalLikes ? <Likes likes={feed.totalLikes} likedBy={feed.likedBy} /> : null}
                    {feed.caption ? <CaptionC username={feed.username} caption={feed.caption} /> : null}
                    <Comments comments={feed.comments} />
                </div>
            </div>
        );
    }
}

function Feeds() {
    return (
        <div className="feed">
            <Stories stories={stories} />
            {feeds.map((feed) => (
                <Feed feed={feed} id={feed.id} />
            ))}
        </div>
    );
}
export default Feeds;
