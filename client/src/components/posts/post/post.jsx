import "./post.css";
import { getimg } from "../../../functions/getImg";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function Post({ post, map, handelLikes, handelComments }) {
  const [openComments, setOpenComments] = useState(false);
  return (
    <div className="Post" key={post._id}>
      <div className="PostImgPublisher">
        <div>
          <img alt="" src={getimg(map[post.PostWriterID])} />
        </div>
        <div className="postsPublisherAndDate">
          <Link to={`/profile/${map[[post.PostWriterID]].email}`}>
            {map[post.PostWriterID].firstname +
              " " +
              map[post.PostWriterID].surename}
          </Link>
          <span className="postDate">{post.createdAt}</span>
        </div>
      </div>
      <div className="postContent">
        <span>{post.content}</span>
        <div className="likesCommentsNumbers">
          <span id="likesNumber">
            <AiFillLike /> {post.likes.length}
          </span>
          <span id="commentsNumber">{post.comments.length} comments</span>
        </div>
        <hr />
      </div>
      <div className="likeComment">
        <span
          style={
            post.likeStates === "Like"
              ? { color: "#444950" }
              : { color: "#0577db" }
          }
          onClick={() =>
            handelLikes(post._id, post.PostWriterID, post.likeStates)
          }
        >
          <AiOutlineLike /> &nbsp; {post.likeStates}
        </span>
        <span
          onClick={() => {
            setOpenComments(!openComments);
          }}
        >
          <FaRegCommentAlt /> &nbsp; Comment
        </span>
      </div>
      {openComments && (
        <form
          className="comments"
          onSubmit={(e) => handelComments(e, post._id, post.PostWriterID)}
        >
          <input
            className="commentInput"
            placeholder="  write a comment..."
            autoComplete="off"
          />
          {post.comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <img alt="" src={getimg(map[comment.writerID])} />
              <div className="commentWriterAndContent">
                <Link to={`/profile/${map[comment.writerID].email}`}>
                  {map[comment.writerID].firstname +
                    " " +
                    map[comment.writerID].surename}
                </Link>
                <span>{comment.content}</span>
              </div>
            </div>
          ))}
        </form>
      )}
    </div>
  );
}
export default Post;
