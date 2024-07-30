const main = (req, res) => {
    res.render("main");
  };

const signup = (req,res) =>{
    res.render("signup")
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

module.exports = { main, signup, chat, searchResult, noSearchResult };