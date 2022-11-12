var express = require("express");
const path = require("path");
var app = express();
const hbs = require("hbs");
require("./db/conn");
const Registration = require("./models/registers");

const PORT = process.env.PORT || 8080;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/index", (req, res) => {
    res.render("index")
});

app.get("/article", (req, res) => {
    res.render("article");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/registration", (req, res) => {
    res.render("registration");
})

app.post("/registration", async (req, res) => {
    try {
        
        console.log(req.body.email);
        res.send(req.body.email);
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerCustomer = new Registration({
                email: req.body.email,
                password:password,
                confirmpassword:cpassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age
            })
            const registered = await registerCustomer.save();
            res.send(201).render("/");
        } else {
            res.send("Password is not matching")
        }

    } catch (error) {
        res.status(400).send(error);
    }
})


app.listen(PORT, () => {
    console.log('Server is running');
});