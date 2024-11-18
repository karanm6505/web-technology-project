const mongoose = require('mongoose');
const BaseUser = require('../User');

const adminSchema = new mongoose.Schema({
  adminLevel: {
    type: String,
    enum: ['super', 'moderator'],
    default: 'moderator'
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_content', 'manage_settings', 'view_analytics']
  }],
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

const Admin = BaseUser.discriminator('Admin', adminSchema);
module.exports = Admin;