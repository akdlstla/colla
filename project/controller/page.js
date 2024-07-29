const main = (req, res) => {
    res.render("main");
  };

const signup = (req,res) =>{
    res.render("signup")
}

  module.exports = { main,signup };