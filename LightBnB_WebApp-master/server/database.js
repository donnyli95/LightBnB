const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const { options } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  queryString = `SELECT users.* FROM users WHERE email=$1`
  const values = [email];

  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message)
      });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  queryString = `SELECT users.* FROM users WHERE id=$1`
  const values = [id];

  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message)
      });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  queryString = `
  INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const values = [user.name, user.password, user.email];

  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows
      })
      .catch((err) => {
        console.log(err.message)
      });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  queryString = `
  SELECT * FROM properties
  JOIN reservations ON property_id=properties.id
  WHERE guest_id=$1
  LIMIT $2`;
  const values = [guest_id, limit];

  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows
      })
      .catch((err) => {
        console.log(err.message)
      });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  console.log(limit);
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1`;

  const values = [];
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `AND city LIKE $${values.length}`;
  };

  if (options.minimum_price_per_night) {
    let minPrice = Number(options.minimum_price_per_night);
    values.push(minPrice);
    queryString += `AND cost_per_night>=$${values.length}`;
  };

  if (options.maximum_price_per_night) {
    let maxPrice = Number(options.maximum_price_per_night);
    values.push(maxPrice);
    queryString +=`AND cost_per_night<=$${values.length}`;
  };

  if (options.minimum_rating) {
    let rating = Number(options.minimum_rating);
    values.push(rating);
    queryString += `AND rating>=$${values.length}`;
  };

  values.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;


  return pool
    .query(queryString, values)
      .then((result) => {
        return result.rows
      })
      .catch((err) => {
        console.log(err.message)
      });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

