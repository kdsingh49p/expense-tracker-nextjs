import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Expense } from "@/models/Expense";

export class Category extends Model {
  declare id: number;
  declare title: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: false,
  }
);



Category.hasMany(Expense, {
  foreignKey: "category_id",
});

Expense.belongsTo(Category, {
  foreignKey: "category_id",
});