const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const ShoppingSession = db.shopping_session;
// const { ShoppingSession } = require('../models/shopping-session.model'); // Adjust the path as needed

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            const result = user.setRoles(roles);
            if (result) res.send({ message: "User registered successfully!" });
        } else {
            // user has role = 1
            const result = user.setRoles([1]);
            if (result) res.send({ message: "User registered successfully!" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        req.session.token = token;
        req.session.userId = user.id;

        const shoppingSession = await ShoppingSession.findOne({
            where: {
                user_id: user.id,
            },
        });

        // If a shopping session doesn't exist, create a new one
        if (!shoppingSession) {
            const createdShoppingSession = await ShoppingSession.create({
                user_id: user.id,
                total: 0, // Set the initial total value
            });
            req.session.sessionId = createdShoppingSession.id;
            // localStorage.setItem('sessionId', createdShoppingSession.id);
        } else {
            req.session.sessionId = shoppingSession.id;
            // localStorage.setItem('sessionId', shoppingSession.id);
        }

        // const shoppingSession = await ShoppingSession.create({
        //     user_id: user.id,
        //     total: 0, // Set the initial total value (you can adjust it based on your requirements)
        // });
        // console.log(shoppingSession)
        // const SessionId = shoppingSession.id;
        //
        // req.session.sessionId = SessionId;

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};