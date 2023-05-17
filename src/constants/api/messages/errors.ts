const errorMessages = {
  authentication: {
    invalidEmail: "Please provide a valid email address",
    invalidId: "Invalid _id value",
    incorrectPassword: "Incorrect password",
    invalidCredentials: "Invalid credentials",
    invalidJwtUserEmail:
      "The user email in the JWT does not match the expected value",
    invalidJwtUserId:
      "The user ID in the JWT does not match the expected value",
    invalidToken: "Invalid token",
    jwtExpired: "JWT has expired",
    unauthorized: "You are not authorized to perform this action",
  },
  user: {
    userNotFound: "User not found",
    userAlreadyExists: "User already exists",
    usernameNotAvailable: "Username is not available",
    emailIsNotAvailable: "Email is not available",
  },
  password: {
    passwordsDoNotMatch: "Passwords do not match",
    passwordMinLength: (length: number) =>
      `The password must be at least ${length} characters long`,
    passwordMaxLength: (length: number) =>
      `The password must be no longer than ${length} characters`,
  },
  post: {
    postNotFound: "Post not found",
    postNotWrittenByUser:
      "This post was not written by you or the author is someone else",
  },
  friendRequest: {
    selfFriendRequest: "You can't send a friend request to yourself",
    friendRequestNotFound: "Friend requests not found",
    acceptOwnFriendRequest:
      "You cannot accept a friend request that you have sent",
    notFriendRequestReceiver:
      "You cannot accept a friend request that was not sent to you",
    alreadyFriends: "You are already friends with this user",
    cannotRejectOwnRequest: "You cannot reject your own request",
    notYourFriend: "This user is not your friend",
    receiverUserNotFound:
      "The user you are trying to add as a friend was not found",
    requestAlreadySent: "Friend request already sent to this user",
  },
  common: {
    requiredFields: "Please provide all required fields",
    limitOffset: "Limit and offset cannot be empty",
    offsetMustBeNumber: "Offset param should be a number",
    limitMustBeNumber: "Limit param should be a number",
    commentNotFound: "Comment not found",
    internalServerError:
      "An error occurred while processing your request. Please try again later.",
    routeNotFound: "Route not found",
    unknown: "An unknown error has occurred",
  },
  comment: {
    notFound: "Comment not found",
  },
}

export default errorMessages
