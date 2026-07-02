import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';

// Admin Model
export class Admin extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

Admin.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'Admin', tableName: 'admins' }
);

// Category Model
export class Category extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: 'Category', tableName: 'categories' }
);

// SubCategory Model
export class SubCategory extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public CategoryId!: number;
}

SubCategory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'SubCategory', tableName: 'subcategories' }
);

// Article Model
export class Article extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public excerpt!: string;
  public content!: string;
  public imageUrl!: string;
  public videoUrl!: string | null;
  public author!: string;
  public status!: 'draft' | 'published';
  public isFeatured!: boolean;
  public isBreaking!: boolean;
  public isTrending!: boolean;
  public CategoryId!: number;
  public SubCategoryId!: number | null;
}

Article.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    excerpt: { type: DataTypes.TEXT, allowNull: true },
    content: { type: DataTypes.TEXT('long'), allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    author: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Admin' },
    status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'published' },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isBreaking: { type: DataTypes.BOOLEAN, defaultValue: false },
    isTrending: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: 'Article', tableName: 'articles' }
);

// Comment Model
export class Comment extends Model {
  public id!: number;
  public name!: string;
  public content!: string;
  public ArticleId!: number;
}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, modelName: 'Comment', tableName: 'comments' }
);

// Associations
Category.hasMany(SubCategory, { foreignKey: 'CategoryId', as: 'subcategories' });
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId', as: 'category' });

Category.hasMany(Article, { foreignKey: 'CategoryId', as: 'articles' });
Article.belongsTo(Category, { foreignKey: 'CategoryId', as: 'category' });

SubCategory.hasMany(Article, { foreignKey: 'SubCategoryId', as: 'articles' });
Article.belongsTo(SubCategory, { foreignKey: 'SubCategoryId', as: 'subcategory' });

Article.hasMany(Comment, { foreignKey: 'ArticleId', as: 'comments' });
Comment.belongsTo(Article, { foreignKey: 'ArticleId', as: 'article' });

export const syncDb = async () => {
  try {
    await sequelize.authenticate();
    // This will create the tables if they do not exist
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
