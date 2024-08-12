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

const notice = (req,res) =>{
    res.render('notice')
}

const login = (req,res) =>{
    res.render('login')
  }

const siteinfo = (req,res) =>{
    res.render('siteinfo')
}

const index = (req,res) =>{
    res.render('index')
}

const noticewrite = (req,res) =>{
    res.render('noticewrite')
}
const editnotice = (req,res) =>{
    res.render('editnotice')
}

const board = (req,res) =>{
    res.render('board')
}

const boardwrite = (req,res) =>{
    res.render('boardwrite')
}
const editboard = (req,res) =>{
    res.render('editboard')
}

module.exports = { main, signup, terms, personal, login, notice , siteinfo, noticewrite, index, editnotice, board , boardwrite, editboard};


