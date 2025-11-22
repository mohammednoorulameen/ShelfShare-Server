export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESSFUL_USER: "User registered successfully Email Sended.",
  REGISTRATION_SUCCESSFUL_VENDOR:
    "Vendor registered successfully Email Sended.",
  LOGIN_SUCCESSFUL: "Logged in successfully.",
  EMAIL_ALREADY_VERIFIED: "Email Already Verified",
  SEND_EMAIL_VERIFIACTION: "Email Verification ",
  EMAIL_VERIFIED: "Email verification was successfull",
  LOGOUT_SUCCESSFULLY: "logout successfully.",



  DATA_FETCHED: "Data fetched successfully.",
  DATA_CREATED: "Data Created Successfully",
  DATA_EDITED: "Data Edited Successfully",
  DATA_DELETED: "Data Deleted Successfully",

  USER_LOGOUT: "User logout successfully.",
  USER_UPDATED: "User updated successfully.",

  EMAIL_SEND: "Email send successfully",

  FORGOT_EMAIL_SEND:
  "If an account exists for this email, we’ve sent a reset link. Please check your inbox or spam.",
};

export const ERROR_MESSAGES = {
  // GENERAL
  UNEXPECTED_SERVER_ERROR: "An unexpected server error occurred.",
  EMAIL_ALREADY_EXISTS: "A user with this email already exists.",
  EMAIL_ALREADY_EXISTS_NOT_VERIFIED:
    "Email exists but not verified. Verification Email Resent",
  ACCOUNT_NOT_FOUND: "Account not found.",
  EMAIL_NOT_FOUND: "Email not found.",
  EMAIL_NOT_VERIFIED: "Email Not Verified.",
  INVALID_ROLE: "Invalid Role Type",
  INVALID_CREDENTIALS: "Invalid email or password.",
  TOKEN_EXPIRED_OR_INVALID: "Token expired or invalid",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired refresh token",
  REFRESH_TOKEN_MISSING :  " Token is Missing ",
  UNAUTHORIZED_ACCESS: "Unauthorized, Missing information",

  FORBIDDEN_ACCESS: "Forbidden access.",
  AUTH_NO_TOKEN_PROVIDED: "Access Denied: No authentication token provided.",
  AUTH_INVALID_TOKEN: "Access Denied: Invalid or expired authentication token.",
  AUTH_TOKEN_ERROR: "Authentication error: Could not process token.",

  // USER

  USER_NOTEXIST_ALREADY_VERIFIED: "User Already Verified or not Existed",
};
