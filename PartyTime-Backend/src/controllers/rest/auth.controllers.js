import User from "./../../models/User.model";
import { UserType } from "./../types";

const AuthControllers = {
    login: async (req, res)=> {
        const { userName, firstName, lastName, email, password } = req.body;
        console.log(userName, firstName, lastName, email, password)

        const newUserType = new UserType(req.body);

        let validateUser;
        try {
            validateUser = await User.validate(req.body);
        } catch (error) {
            console.log(error)
            return res.json({
                error: true,
                concept: error
            })
        }



        res.json(validateUser)
    }
}

export default AuthControllers;