const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const { Account } = require("../db");
const jwt = require("jsonwebtoken");
const { Pass } = require("../config");
const { authMiddleware } = require("../middleware");

//SIGNUP CODE :

const singupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const userInput = singupSchema.safeParse(body);
    if(!userInput.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    // const user = await User.findOne({
    //     username: body.username
    // });
    // if(user._id) {
    //     return res.json({
    //         message: "Email already taken / Incorrect inputs"
    //     });
    // }

    const existingUser = await User.findOne({
        username: body.username
    });

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    // const dbUser = await User.create(body);
    // const token = jwt.sign({
    //     userId: dbUser._id
    // }, JWT_SECRET);

    const user = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password
    });

    const userId = user._id;
    //console.log(userId);

    //Creating new account during signup with amount
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, Pass);

    res.status(200).json({
        message: "User created successfully",
        token: token,
        firstName: body.firstName
    });
});

//SIGNIN CODE :

const signinSchema = zod.object({
    usename: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const userinput = signinSchema.safeParse(body);
    if(!userinput) {
        return res.json({
            message: "Incorrect Inputs"
        });
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });

    const userId = user._id;

    if(user) {
        const token = jwt.sign({
            userId
        }, Pass);

        res.status(200).json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

//UPDATE DATA : 

const updatedataSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    username: zod.string().optional(),
    password: zod.string().optional()
});

router.put("/updateData", authMiddleware, async (req, res) => {
    const body = req.body;
    const userInput = updatedataSchema.safeParse(body);

    if(!userInput) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, body);

    res.status(200).json({
        message: "Updated successfully"
    });
});

//SEARCHING USER CODE : 

router.get("/searchUser", async (req, res) => {
    const filter = req.query.filter || "";

    const findingUsers = await User.find({
        $or: [{
            firstName: {
                $regex: ".*" + filter + ".*",
                $options: "i"
            }
        },{
            lastName: {
                $regex: ".*" + filter + ".*",
                $options: "i"
            }
        }]
    });

    res.json({
        user: findingUsers.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            _id: user._id
        }))
    });
});


module.exports = router;