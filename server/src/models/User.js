const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        const salt = await bcrypt.genSalt(10);
        this._update.password = await bcrypt.hash(this._update.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
