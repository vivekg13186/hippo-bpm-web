import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env["SQLITE_DB_PATH"] || "data/hippo-bpm-web.db",
});

console.log("Using SQLite DB at:", process.env["SQLITE_DB_PATH"] || "data/hippo-bpm-web.db");
export const initDatabase = async () => {
  await sequelize.sync();
};
export const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING(555),
    allowNull: true,
  },

  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
});

const TestServiceModel = sequelize.define("TestServiceModel", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  appName: {
    type: DataTypes.STRING(555),
    allowNull: true,
  },

  serviceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  input: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export async function getAllAccounts() {
  return await Account.findAll();
}

export async function insertAccount(accountData) {
  return await Account.create(accountData);
}

export async function deleteAccount(id) {
  const account = await Account.findByPk(id);
  if (!account) throw new Error("Account not found");
  await account.destroy();
}

export async function getAccount(id) {
  return await Account.findByPk(id);
}

export async function getAllTestService() {
  return await TestServiceModel.findAll();
}

export async function insertTestService(data) {
  return await TestServiceModel.create(data);
}

export async function updateTestService( data) {
     
  const [updatedCount] = await TestServiceModel.update(data, {
    where: { id :data.id }
  });
   

  if (updatedCount === 0) {
    return null; // not found
  }

  return await TestServiceModel.findByPk(data.id);
}

export async function deleteTestService(id) {
  const ts = await TestServiceModel.findByPk(id);
  if (!ts) throw new Error("Test service not found");
  await ts.destroy();
}

export async function getTestService(id) {
  return await TestServiceModel.findByPk(id);
}
