/****************
 * Author: Alex Borchers
 * Date Created: 11/6/2023
 * Adapted From: https://www.youtube.com/watch?v=f2EqECiTBL8 CH 10
 *
 * Purpose:
 * Define function to registering new users, verify no duplicates, and store in database
 *
 *****************/
const bcrypt = require("bcrypt");
const yup = require("yup");
const {
  getUserByEmail,
  addUser,
  updateUserPassword,
} = require("../services/usr/users");

// Define the schema for the user object
const userSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  is_active: yup.boolean().required(),
  usr_permissions_id: yup.number().required(),
  // supervisor_id: yup.number().required(),
});

const handleNewUser = async (req, res) => {
  // Verify email and password are provided
  const user = req.body;
  // Validate user object
  try {
    await userSchema.validate(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }

  // Check for existing user (by email)
  // console.log(email);
  const duplicate = await getUserByEmail(user.email);
  // console.log("duplicate", duplicate);
  if (duplicate) {
    // @TODO move to seperate function
    // Encrypt password (10 rounds of hashing) & store new password
    // const hashedPwd = await bcrypt.hash(user.password, 10);
    // updateUserPassword(duplicate.id, hashedPwd);
    // res.status(201).json({ success: `Password Updated.` });

    res.status(409).json({ message: "Email already exists." }); // Conflict
    return;
  }
  try {
    // Encrypt password (10 rounds of hashing)
    if (user.password) {
      const hashedPwd = await bcrypt.hash(user.password, 10);
      user.password = hashedPwd;
    }

    // Store new user
    const newUser = await addUser(user);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
