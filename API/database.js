import Sequelize from "sequelize"

const sequelize = new Sequelize('sys','root','Marduck.121207121207',{
    dialect: 'mysql',
    host:'localhost'
});

export default sequelize