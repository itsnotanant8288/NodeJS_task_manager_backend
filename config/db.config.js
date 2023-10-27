module.exports = {                
    HOST: "localhost",       
    USER: "anant",              
    PASSWORD: "123",   
    DB: "task_manager",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };