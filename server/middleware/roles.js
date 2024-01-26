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
    site: allRights,
    profile: allRights,
    brand: allRights,
    product: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"], // the password won't be sent back
      "update:own": ["*"],
    },
    brand: {
      "read:any": ["*"],
    },
    product: {
      "read:any": ["*"],
    },
  },
};
const roles = new AccessControl(grantsRoleObject);

module.exports = {
  roles,
};
