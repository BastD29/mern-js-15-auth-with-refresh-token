const permissions = require("./permissions");

const rolePermissions = {
  admin: [permissions.READ_ALL_USERS],
  basic: [permissions.UPDATE_OWN_PROFILE],
  // Add more roles and their permissions as needed
};

module.exports = { rolePermissions };
