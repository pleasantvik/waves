const AccessControl = require("accesscontrol");

// This grants the role a user is able to view
//? NOTE: the keys are the role and the value are the accesible role for the user is viewing
const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};
let grantsRoleObject = {
  admin: {
    profile: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"], // the password won't be sent back
      "update:own": ["*"],
    },
  },
};
const roles = new AccessControl(grantsRoleObject);

module.exports = {
  roles,
};
