/**
 * @NApiVersion 2.0
 * @NScriptType Restlet
 */

define([],

    function() {
        
        /**
         * 
         * @param {Object} requestParams 
         * @returns {string | Object} HTTP response body;
         * @since 2015.1
         */

        function get(requestParams){
            var couponCode = requestParams.custparam_couponcode;

            if (couponCode == 'ABC12') {
                return 'valid'
            } else {
                return 'invalid'
            }
        }





        return{
            get : get
        }
    });