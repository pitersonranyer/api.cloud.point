module.exports = {
  development: {
    database: {
      host: "localhost",
      port: 3306,
      name: "pointdojogador",
      dialect: "mysql",
      user: "root",
      password: "admin",
      timezone: "+08:00"
    },
    secret: '1C3C7E1694F1E9DAD939399E87E5FFB5DF06B2327CA31B409CB3'
  },
  production: {
    database: {
      host: "mysql669.umbler.com",
      user: "pointdojogador",
      password: 'xedsi5-soWpet-cextek',
      database: "pointdojogador"
    }
  }
};
