import {Sequelize, DataTypes} from "sequelize";

const Database = {
    sequelize: (path: string)=>{
        return new Sequelize({dialect: "sqlite", storage: path});
    }
}

export default Database;