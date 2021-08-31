import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.emcryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, salt)
    return passwordHashed
}

userSchema.statics.createToken = (user) => {
    const tokenUser = {
        _id: user._id,
        email: user.email,
        userName: user.userName
    }
    const token = jwt.sign(tokenUser, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
    return token;
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

userSchema.statics.validate = async (user) => {
    if( !user.userName || !user.firstName ||
        !user.lastName || !user.email ||
        !user.password
    ){
        throw "auth/insertAllValues";
    }

    if(!EmailValidator.validate(user.email)) {
        throw "auth/insertValidEmail";
    }

    const isExist = await User.findOne({$or: [{ userName: user.userName }, { email: user.email }]});

    if(isExist) {
        throw isExist.userName === user.userName ? "auth/userNameAlreadyExists" : "auth/emailAlreadyExists";
    }

    user.password = await User.emcryptPassword(user.password);

    return {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    }
}

const User = model('User', userSchema);

export default User;