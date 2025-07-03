const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login form",
    currentPage: "login",
    isLoggedin: false,
    errorMessage: [],
    oldInput: {
      email: "",
      password: "",
    },
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // check email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "login form",
      currentPage: "login",
      isLoggedin: false,
      errorMessage: ["Invalid email"],
      oldInput: {
        email: "",
      },
      user: {},
    });
  }
  // check password
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "login form",
      currentPage: "login",
      isLoggedin: false,
      errorMessage: ["Invalid password"],
      oldInput: {
        email: email,
      },
      user: {},
    });
  }
  req.session.isLoggedin = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postlogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup form",
    currentPage: "signup",
    isLoggedin: false,
    errorMessage: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    user: {},
  });
};

exports.postSignup = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only letters"),

  check("lastName").trim(),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .toLowerCase(),

  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 8 characters long"),
  // .matches(/[$@_]/)
  // .withMessage("Password must contain at least one special character ($, @, _)")

  check("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("User type must be either 'guest' or 'host'"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup form",
        currentPage: "signup",
        isLoggedin: false,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
          user: {},
        },
      });
    }

    bcryptjs.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        userType: userType,
      })
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((error) => {
          return res.status(422).render("auth/signup", {
            pageTitle: "Signup form",
            currentPage: "signup",
            isLoggedin: false,
            errorMessage: [error.msg],
            oldInput: {
              firstName,
              lastName,
              email,
              password,
              userType,
              user: {},
            },
          });
        });
    });
  },
];
