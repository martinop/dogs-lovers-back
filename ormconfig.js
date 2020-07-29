const isLocal = !['Test', 'Production'].includes(process.env.NODE_ENV)
const folder =  !isLocal ? 'build' : 'src';
const format = !isLocal ? 'js' : 'ts';

module.exports = {
  "type": process.env.CONNECTION || 'postgres',
  "host": process.env.RDS_HOSTNAME,
  "port": process.env.RDS_PORT,
  "username": process.env.RDS_USERNAME,
  "password": process.env.RDS_PASSWORD,
  "database": process.env.RDS_DB_NAME,
  "synchronize": true,
  "logging": true,
  "migrations": [`${folder}/migration/**/*.${format}`],
  "entities":  [`${folder}/entity/**/*.${format}`],
  "subscribers": [`${folder}/subscriber/**/*.${format}`],
  "factories": [`${folder}/factories/**/*.${format}`],
  "seeds": [`${folder}/seeds/**/*.${format}`],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}