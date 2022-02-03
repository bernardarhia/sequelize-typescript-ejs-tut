import { DataTypes } from "sequelize";
import { UserInterface } from "./../db/interfaces/User";
import { Model } from "sequelize";
import sequelize from "../db/db";
class User extends Model implements UserInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
    timestamps: true,
    freezeTableName: true,
  }
);

User.sync({ force: true });

export default User;
