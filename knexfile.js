require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : 'ec2-54-163-233-201.compute-1.amazonaws.com',
      user     : 'hyvxujmruqbefh',
      password : 'a6509a29a2669dd027f94dc8baa0c52b132f01144294f383a33cf10e8ec26535',
      database : 'd1q365geurhcu9',
      port     : '5432',
      ssl      : process.env.DB_SSL
    },
    pool: {
      min: 1,
      max: 7
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    host     : 'ec2-54-163-233-201.compute-1.amazonaws.com',
    user     : 'hyvxujmruqbefh',
    password : 'a6509a29a2669dd027f94dc8baa0c52b132f01144294f383a33cf10e8ec26535',
    database : 'd1q365geurhcu9',
    port     : '5432',
    ssl: true
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }

};
