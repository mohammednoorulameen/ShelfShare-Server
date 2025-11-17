export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESSFUL: "User registered successfully.",
  LOGIN_SUCCESSFUL: "User logged in successfully.",

  DATA_FETCHED: "Data fetched successfully.",
  DATA_CREATED: "Data Created Successfully",
  DATA_EDITED: "Data Edited Successfully",
  DATA_DELETED: "Data Deleted Successfully",

  USER_LOGOUT: "User logout successfully.",
  USER_UPDATED: "User updated successfully.",

  EMAIL_SEND: "Email send successfully",
  EMAIL_VERIFIED: "Email verification was successfull",

  ADMIN_LOGOUT: "Admin logout successfully.",
  FORGOT_EMAIL_SEND:
    "If an account exists for this email, we’ve sent a reset link. Please check your inbox or spam.",
};

export const ERROR_MESSAGES = {
     // GENERAL
  UNEXPECTED_SERVER_ERROR: "An unexpected server error occurred.",
  EMAIL_ALREADY_EXISTS: "A user with this email already exists.",
  USER_NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  RESOURCE_NOT_FOUND: "The requested resource was not found.",
  RESOURCE_ALREADY_EXISTS: "The resource already exists.",
  UNAUTHORIZED_ACCESS: "Unauthorized: Missing information",
  FORBIDDEN_ACCESS: "Forbidden access.",
  AUTH_NO_TOKEN_PROVIDED: "Access Denied: No authentication token provided.",
  AUTH_INVALID_TOKEN: "Access Denied: Invalid or expired authentication token.",
  AUTH_TOKEN_ERROR: "Authentication error: Could not process token.",
}