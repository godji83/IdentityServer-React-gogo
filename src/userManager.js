/* eslint-disable @typescript-eslint/camelcase */
import { createUserManager } from "redux-oidc";

const userManagerConfig = {
  client_id: "mykabapp_js",
  authority: "https://auth.mykab.ng",
  client_secret: ["mykabsecret"],
  grant_type: ["implicit"],
  // where to redirect to after login
  redirect_uri: [
    "http://localhost:3000/index.html",
    "http://localhost:4000/index.html",
    "http://localhost:5000/index.html",
    "https://www.mykab.ng/index.html"
  ],
  // where to redirect to after logout
  post_logout_redirect_uri: [
    "http://localhost:3000/index.html",
    "http://localhost:4000/index.html",
    "http://localhost:5000/index.html",
    "https://www.mykab.ng/index.html"
  ],
  scope: ["openid", "profile", "email", "offline_access", "mykabapb", "roles"]
};

const userManager = createUserManager(userManagerConfig);
console.log("FROM USER MANAGER");
console.log(userManager);

export default userManager;
