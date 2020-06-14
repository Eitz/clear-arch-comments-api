export default function makeListComments({ commentsDb }) {
  return async function listComments({ postId = null } = {}) {
    if (!postId) {
      throw new Error("You must supply a post id.");
    }

    const comments = await commentsDb.findByPostId({
      postId,
      omitReplies: false,
    });

    const nestedComments = nestReplies(comments);
    return nestedComments;
  };
}

// If this gets slow introduce caching.
function nestReplies(replies) {
  if (replies.length === 0) {
    return replies;
  }
  return replies.reduce((nested, comment) => {
    comment.replies = replies.filter((reply) => reply.replyToId === comment.id);
    nestReplies(comment.replies);
    if (comment.replyToId == null) {
      nested.push(comment);
    }
    return nested;
  }, []);
}
