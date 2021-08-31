import * as EmailValidator from "email-validator";
import User from "./../models/User.model";

class UserType {
    userName = null;
    firstName = null;
    lastName = null;
    email = null;
    password = null;

    constructor(type){
        this.userName = type.userName;
        this.firstName = type.firstName;
        this.lastName = type.lastName;
        this.email = type.email;
        this.password = type.password;
    }

    async validate(){
        if( !this.userName || !this.firstName ||
            !this.lastName || !this.email ||
            !this.password
        ){
            throw new Error("auth/insertAllValues");
        }

        if(!EmailValidator.validate(this.email)) {
            throw new Error("auth/insertValidEmail");
        }

        let userName = userName;
        let email = email;
        const isExist = await User.findOne({$or: [{ userName }, { email }]});

        if(isExist) {
            throw new Error(isExist.userName === this.userName ? "auth/userNameAlreadyExists" : "auth/emailAlreadyExists");
        }

        this.password = await User.emcryptPassword(password);

        return {
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }
    }
}

export { UserType };