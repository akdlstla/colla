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

const chat = (req,res) =>{
  res.render("chat")
}

const searchResult = (req,res) =>{
  res.render("searchResult")
}

const noSearchResult = (req,res) =>{
  res.render("noSearchResult")
}
const login = (req,res) =>{
  res.render("login")
}
const search = (req,res) =>{
  res.render('search')
}

module.exports = { main, signup, chat, searchResult, noSearchResult, terms, personal, login, search };


