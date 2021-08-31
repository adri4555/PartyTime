import jwt from "jsonwebtoken";

let loginClients = [];

const usersNames =  {
    adri: "holaquetal",
    angel: "holaquetal"
}

const autentication = (token)=> {
    try {
        return jwt.verify(token);
    } catch (error) {
        return null;
    }
}


export default io=> client=> {
    client.on('app/:id', data => { 
        io.to(client.id).emit("response", data);
    });

    client.on('login', data => { 
        if(data.userName && usersNames[data.userName] && usersNames[data.userName] === data.password){ 
            loginClients.push(client);
            console.log(data)
            io.to(client.id).emit("response", {
                token: "hola"
            });
        }else {
            io.to(client.id).emit("error", {concept: "auth/loginIncorrect"});
        }
        
    });



    client.on('disconnect', () => { 
        loginClients = loginClients.filter(element => element !== client);
    });
}

