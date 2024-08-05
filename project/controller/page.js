const main = (req, res) => {
    res.render("main");
  };

const signup = (req,res) =>{
    res.render("signup")
}

const terms = (req,res) =>{
    res.render('terms')
}
const personal = (req,res) =>{
    res.render('personal')
}
const login = (req,res) =>{
    res.render('login')
  }
module.exports = { main, signup, terms, personal, login };

