
const usersR = require("./users")
const carsR = require("./cars")

exports.routesInit = (app) =>{  
    
    app.use("/users",usersR);
    app.use("/cars",carsR);



    app.use("*", (req, res) => {
        res.status(404).json({ msg: "endpoint not found , 404", error: 404 });
      });
    
}

