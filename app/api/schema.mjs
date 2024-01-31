import mongoose from "mongoose";

export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,24}$/;
export const otpPattern = /^[a-z0-9]{6}$/
export const profilePicturePattern = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/v[0-9]+\/[a-zA-Z0-9_-]+\..+$/i;
export const firstNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const lastNamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const otpMaxAgeInMinutes = 15;
export const forgetPasswordOtpMaxAgeInMinutes = 15;
export const initialSessionInDays = 15;
export const extendedSessionInDays = 30;
export const profilePicture = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1706343891/we-app-nextjs/Assets/profile-picture_ufgahm.png"
export const coverPhoto = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1706699220/we-app-nextjs/Assets/cover-photo_efzrvu.avif"

// user schema
let userSchema = new mongoose.Schema({
    profilePhoto: {
        type: String,
        default: profilePicture,
        maxlength: 1000,
    },
    coverPhoto: {
        type: String,
        default: coverPhoto,
        maxlength: 1000,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: emailPattern
    },
    bio: {
        type: String,
        maxlength: 200,
        trim: true,
        default: null
    },
    password: {
        type: String,
        required: true,
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
    provider: {
        type: String,
        required: true,
        enum: ['google', 'facebook'],
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

let userModel;

try {
    userModel = mongoose.model('users');
} catch (error) {
    userModel = mongoose.model('users', userSchema);
}

export { userModel };

// email otp schema
let otpSchemaEmail = new mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: [true],
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: emailPattern
    },
    otpCodeHash: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

otpSchemaEmail.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

let otpModelEmail;

try {
    otpModelEmail = mongoose.model('email-otps');
} catch (error) {
    otpModelEmail = mongoose.model('email-otps', otpSchemaEmail);
}

export { otpModelEmail };

//  otp schema
let otpSchemaPassword = new mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: [true],
        minlength: 3,
        maxlength: 100,
        trim: true,
        match: emailPattern
    },
    otpCodeHash: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

otpSchemaPassword.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

let otpModelPassword

try {
    otpModelPassword = mongoose.model('password-otps');
} catch (error) {
    otpModelPassword = mongoose.model('password-otps', otpSchemaPassword);
}

export { otpModelPassword };

// like schema
let likeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
})

// post schema
let postSchema = new mongoose.Schema({
    authorImage: {
        type: String,
        maxlength: 1000,
    },
    authorName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
    },
    media: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video', null],
    },
    likes: {
        type: [likeSchema],
        default: []
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

let postModel;

try {
    postModel = mongoose.model('posts');
} catch (error) {
    postModel = mongoose.model('posts', postSchema);
}

export { postModel };