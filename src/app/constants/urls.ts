const server = process.env.REACT_APP_SERVER;

export const getReviewsURL = process.env.REACT_APP_SERVER + "/api/reviews";

export const getReviewURL = (id: number) =>
  process.env.REACT_APP_SERVER + "/api/reviews/" + id;

export const googleUrl = server + "/auth/login-google";
export const githubUrl = server + "/auth/login-github";
export const signUpURL = server + "/auth/signup";
export const logInURL = server + "/auth/login";
export const signOutURL = server + "/auth/signout";
export const tagsURL = process.env.REACT_APP_SERVER + "/api/tags/";
export const reviewsURL = process.env.REACT_APP_SERVER + "/api/reviews/";
export const usersURL = server + "/api/users/";
export const commentsURL = server + "/api/comments/";
export const compositionsURL = server + "/api/compositions/";
export const reviewRatingsURL = server + "/api/ratings/reviews/";
export const searchURL = server + "/api/reviews/search";

export const imgUploadURL = process.env.REACT_APP_UPLOAD_IMAGE_URL!;
