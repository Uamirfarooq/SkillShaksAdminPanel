import express from "express";
import { upload } from "./../middleware/multer.middleware.js";
import { AddCourse, GetCourse, loginAdmin } from "../controllers/course.controller.js";
import { veryfyJWT } from "../middleware/verifyJWT.middleware.js";

const router = express();
AddCourse
router.route("/adminlogin").post(loginAdmin);

router.route("/getcourse").get(GetCourse);


router.route("/addcourse").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  AddCourse
);

// router.route("/refreshToken")
// .get(refreshAccessToken);

// router.route("/delete")
// .get(veryfyJWT,deleteUser)

// router.route("/change-password")
// .get(veryfyJWT,changeCurrentPassword)

// router.route("/update-user").post(upload.fields([
//     {
//         name: "avatar",
//         maxCount: 1
//     },
//     {
//         name: "coverImage",
//         maxCount: 1
//     }
// ]),veryfyJWT,updateUserDetails)

// router.route("/get-user-details").get(veryfyJWT,getCurrentUser)

export default router;
