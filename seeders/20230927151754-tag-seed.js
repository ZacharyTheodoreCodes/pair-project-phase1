'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = fs.readFileSync('./data/tags.json', 'utf-8')
    data = JSON.parse(data)  
    data.forEach(el =>{
      delete el.id
      el.createdAt =  el.updatedAt = new Date()
    })
   return queryInterface.bulkInsert("Tags",data)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Tags', null, {});
  }
};

