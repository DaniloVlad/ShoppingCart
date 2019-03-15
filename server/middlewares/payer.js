/**
 * Represents a Payer
 * 
 * @param {string} given_name - first name
 * @param {string} surname - last name
 * @param {string} email_address - email address
 * @param {string} address_line_1 - main address Ex: 124 main rd
 * @param {string} address_line_2 - secondary address Ex: suit or apt 1001
 * @param {string} admin_area_2 - City/Town/Village
 * @param {string} admin_area_1 - State Code
 * @param {string} postal_code - postal code
 * @param {string} country_code - 2-Character country code
 */
function Payer(given_name, surname, email_address, address_line_1, address_line_2 = null, admin_area_2, admin_area_1, postal_code, country_code = "US") {  
    this.name = {
      given_name: given_name,
      surname: surname
    };
    this.email_address = email_address;
    this.address = {
      address_line_1: address_line_1, //
      address_line_2: address_line_2, //
      admin_area_1: admin_area_1,  //State codes
      admin_area_2: admin_area_2, //
      postal_code: postal_code,
      country_code: "US"
    };
  }

module.exports = {Payer}