import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export class Expense extends Model {
  declare id: number;
  declare category_id: number;
  declare amount: number;
  declare description: string | null;
  declare expense_date: string;
  declare created_at: Date;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    expense_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "expenses",
    timestamps: false,
  }
);
