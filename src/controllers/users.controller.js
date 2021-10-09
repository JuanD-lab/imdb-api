const { Users, ValidateUsers } = require("../models");
const createToken = require('../middlewares/createToken.middleware')
const bcrypt = require("bcryptjs");
const {sendEmail, emailOptions} = require('../helpers/nodemailer')

const list = async (req, res, next) => {
    try {
        const results = await Users.findAll({ raw: true });
        console.log(results);
        res.json(results);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const { first_name, last_name, password, email } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password, salt);
        let user = await Users.create({
            first_name: first_name,
            password: hash,
            last_name: last_name,
            email: email,
            active: false,
            reset_token: null,
        });

        const id = user.id;

        user = await Users.findOne({
            where: { id },
            attributes: { exclude: ["password"] },
            raw: true,
        });
        
        const newResetToken = createToken(user)
        Users.update({reset_token: newResetToken}, {where: {id}})
        user.reset_token = newResetToken;

        let hashEmail = bcrypt
            .hashSync(user.first_name, salt)
            .split("")
            .filter((character) => character !== "/")
            .join("");

        await ValidateUsers.create({ hash: hashEmail, user_id: id });

        emailOptions.to = user.email;
        emailOptions.subject = "Very your email for IMDb api"
        emailOptions.template = "verify_email";
        emailOptions.context = {
            url: `https://imdb-lab.herokuapp.com/api/v1/verify/${hashEmail}`,
            name: user.first_name,
        };
        sendEmail(emailOptions);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = await Users.update(req.body, {
            where: id,
        });
        res.json(newData);
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const actor = await Users.destroy({ where: { id } });
        res.json(actor);
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    const hash = req.params.hash;
    try {
        const validation = await ValidateUsers.findOne({
            where: { hash: hash },
        });

        if (validation) {
            await Users.update(
                { active: true },
                { where: { id: validation.user_id } }
            );

            await ValidateUsers.destroy({ where: { hash } });

            res.send("User activated");
        } else {
            res.status(404).send("We coudn't find the user");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    list,
    create,
    update,
    destroy,
    verify,
};
