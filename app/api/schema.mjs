import mongoose from "mongoose";

export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d ]{8,16}$/;
export const otpPattern = /^[a-zA-Z0-9]{6}$/
export const profilePicturePattern = /^https:\/\/[^\s\/$.?#].[^\s]*$/;
export const firstNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const lastNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const otpMaxAgeInMinutes = 15;
export const forgetPasswordOtpMaxAgeInMinutes = 15;
export const initialSessionInDays = 15;
export const extendedSessionInDays = 30;

// user schema
let userSchema = new mongoose.Schema({
    profilePhoto: {
        type: String,
        default: null,
        maxlength: 1000,
        match: profilePicturePattern
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true],
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: emailPattern
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

export const userModel = mongoose.model("users", userSchema);