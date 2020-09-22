module.exports = {
  development: {
    database: {

      host: "mysql669.umbler.com",
      name: "pointdojogador-u",
      dialect: "mysql",
      user: "piterson",
      password: "sWXFuvbtpFA3V6i",



//      host: "mysql669.umbler.com",
//      name: "pointdojogador",
//      dialect: "mysql",
//      user: "pointdojogador",
//      password: "xedsi5-soWpet-cextek",

//      host: "localhost",
//      port: 3306,
//      name: "pointdojogador",
//      dialect: "mysql",
//      user: "root",
//      password: "admin"
      
    },
    secret: '1C3C7E1694F1E9DAD939399E87E5FFB5DF06B2327CA31B409CB3'
  },
  production: {
    database: {
      host: "mysql669.umbler.com",
      name: "pointdojogador",
      dialect: "mysql",
      user: "pointdojogador",
      password: "xedsi5-soWpet-cextek",
      secret: process.env.JWT_SECRET
    }
  }
};
