const successMessages = {
  user: {
    created: "User successfully created",
    deleted: "User successfully deleted",
    passwordResetLinkSent:
      "If your account exists in our database, we'll send you a link to reset your password",
    passwordReset: "Your password has been reset successfully",
    emailSent: "An email has been sent to your address",
    documentUpdated: "The user document was updated successfully",
    updated: "Info updated successfully",
  },
  post: {
    deleted: "Post deleted successfully",
    liked: "Post liked",
    unliked: "Post unliked",
    updated: "Post updated successfully",
    created: "Post successfully created",
  },
  comment: {
    created: "Your comment was created successfully",
    liked: "Comment liked",
    unliked: "Comment unliked",
  },
  friendRequest: {
    sent: "Friend request sent!",
    received: "Friend request received!",
    accepted: "Friend request accepted!",
    declined: "Friend request declined!",
    cancelled: "Friend request cancelled!",
    rejected: "Friend request has been rejected",
  },
  friendship: {
    nowFriends: "You are now friends!",
    removedFromFriendList: "This user has been removed from your friend list",
  },
  testing: {
    usersCreatedSuccessfully: "Users created successfully!",
    friendRequestsReceived: "Friend requests received!",
    deleteAllUsers: "Deleting all users from the database...",
    generatingFakeUsers: "Generating fake users...",
    uploadingToDB: "Uploading data to the database...",
    creatingMainUser: "Creating main user...",
    generatingFriendRequests:
      "Generating friend requests to send to main user...",
    findingMainUser: "Finding main user...",
    redirectToGenerateFriendsRequests:
      "Redirecting to generate friends requests...",
    postsCreatedSuccessfully: "Posts created successfully!",
    deletingAllPosts: "Deleting all posts...",
    generatingFakePosts: "Generating fake posts...",
    testDataLoadedSuccessfully: "All test data loaded successfully!",
  },
}

export default successMessages
