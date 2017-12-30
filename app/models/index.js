const glob = require('glob');
const path = require('path');
const sequelizeInstance = require('../config/components/postgres');
const usync = require('umzug-sync');

const { PostgresDB, Sequelize } = sequelizeInstance;
const migrations = path.join(__dirname, '../migrations/');
const modelFiles = glob.sync(path.join(__dirname, '/*/schema.js'));
const postgresDB = PostgresDB();

/**
 * Loads the model schemas from the model files
 * @returns {Object} models
 */
const getModels = () => {
  const models = {};

  modelFiles.forEach((model) => {
    const modelName = model.replace(/^.*models\/(.+)\/schema\.js$/, '$1');
    models[modelName] = require(model)(postgresDB, modelName); // eslint-disable-line
  });
  return models;
};


/**
 * return config for migration
 * @returns {Object}
 */
const getConfigForMiagration = () => (
  {
    sequelize: postgresDB,
    SequelizeImport: Sequelize,
    migrationsDir: migrations,
    logging: console.log,
  }
);

/**
 * Builds the schema associations for sequelize models
 * @param {Object} models - Object with models that need relations defined
 */
const defineRelations = (models) => {
  Object.keys(models).forEach((model) => {
    if ('associate' in models[model]) {
      models[model].associate(models);
    }
  });
};

/**
 * Initializes models with relationships
 * @returns {Object} models
 */
const initializeModels = () => {
  const models = getModels();
  defineRelations(models);
  return models;
};

/**
 * Used to migrate the schema with sequelize
 * @param {Boolean} forceSync - defaults to False
 * @returns {Promise}
 */
const sequelizeMigrate = () => {
  const config = getConfigForMiagration();

  return usync.migrate(config);
};

/**
 * Used to destroy all local instances of models
 * @returns {Iterable<Promise>}
 */
const destroyAllModelInstances = () => {
  const models = getModels();

  const allInstancesDestroyPromises = Object.keys(models).map((model) => {
    const destroyPromise = models[model].destroy({ where: {} });
    return destroyPromise;
  });

  return Promise.all(allInstancesDestroyPromises);
};

const defineModels = () => {
  const models = initializeModels();

  const promObj = new Promise((resolve) => {
    resolve(models);
  });

  return promObj.then(data => data);
};

module.exports = {
  getModels,
  defineRelations,
  initializeModels,
  destroyAllModelInstances,
  sequelizeMigrate,
  defineModels,
};
