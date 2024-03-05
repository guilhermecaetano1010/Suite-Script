/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/url'],

    /**
     * param {https} https
     * param {runtime} runtime
     * 
     */
    function (https, url) {


        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {
            var customer = scriptContext.currentRecord;

            var perfRevCount = customer.getLineCount({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer'
            });
            alert('This customer has ' + perfRevCount + ' product preferences');

            // var fRatingCount = 0;

            // for (let  i = 0; i < array.fRatingCount; i++) {
            //    var ratingCode = customer.getSublistValue({
            //        sublistId: 'recmachcustrecord_sdr_prod_pref_customer'
            //         fieldId: 
            //     });
        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {
            debugger;
            var customer = scriptContext.currentRecord
            if (scriptContext.fieldId == 'custentity_sdr_apply_coupon') {
                var applyCoupon = customer.getValue({ fieldId: 'custentity_sdr_apply_coupon' });

                if (applyCoupon == true) {

                    var couponCode = customer.getField({ fieldId: 'custentity_sdr_coupon_code' });

                    couponCode.isMandatory = true
                    couponCode.isDisabled = false

                } else {

                    var couponCode = customer.getField({ fieldId: 'custentity_sdr_coupon_code' });


                    couponCode.isMandatory = false
                    couponCode.isDisabled = true
                }
            }
        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {
            var customer = scriptContext.currentRecord;

            if (scriptContext.sublistId == 'recmachcustrecord_sdr_prod_pref_customer') {
                var preferredQuantity = parseInt(customer.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                    fieldId: 'custrecord_sdr_prod_pref_qty'
                }));

                if (isNaN(preferredQuantity)) {
                    customer.setCurrentSublistValue({
                        sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                        fieldId: 'custrecord_sdr_prod_pref_qty',
                        value: '1'
                    })
                }
            }
        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {
            var customer = scriptContext.currentRecord
            if (scriptContext.fieldId == 'custentity_sdr_apply_coupon') {
                var applyCoupon = customer.getValue({ fieldId: 'custentity_sdr_apply_coupon' });

                if (applyCoupon == true) {

                    var couponCode = customer.getValue({ fieldId: 'custentity_sdr_coupon_code' });

                    if (couponCode.length != 5) {
                        // SE A QUANTIDADE DE CARACTERES FOR DIFERENTE DE 5

                        alert("O campo deve ser preenchido com 5 caracteres!")
                        return false

                    } else {
                        return true
                    }
                }

            }
            return true;
        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {
            customer = scriptContext.currentRecord
            if (scriptContext.sublistId == 'recmachcustrecord_sdr_prod_pref_customer') {
                var preferredQuantity = parseInt(customer.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                    fieldId: 'custrecord_sdr_prod_pref_qty'
                }));

                if (preferredQuantity > 10) {
                    alert('You have selected a preferred quantity that exceeds the limit of 10')
                    return false
                } else {
                    return true
                }
            }
            return true
        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {
            var customer = scriptContext.currentRecord

            var applyCoupon = customer.getValue({ fieldId: 'custentity_sdr_apply_coupon' });

            var couponCode = customer.getValue({ fieldId: 'custentity_sdr_coupon_code' }); // alteração para o útimo exercício

            //if (applyCoupon == true) {       alteração para o útimo exercício

            // if (couponCode.length != 5) {
            //     // SE A QUANTIDADE DE CARACTERES FOR DIFERENTE DE 5

            //     alert("O campo deve ser preenchido com 5 caracteres!")
            //     return false

            // } else {

            //     return true
            // }
            // }

            if (applyCoupon == true && couponCode !== '') {


            
                var restletScriptId = 'customscript_sdr_rl_coupon_code';
                var restletDeploymentId = 'customdeploy_sdr_rl_coupon_code'; 
                var restletUrl = url.resolveScript({
                    scriptId: restletScriptId,
                    deploymentId: restletDeploymentId
                });

                restletUrl += '&custparam_couponcode=' + encodeURIComponent(couponCode);  //encodeURIComponent muda os caracteres especiais da URL  e essa função é frequentemente usada ao construir URLs para garantir que os dados passem de forma segura na URL sem causar problemas de interpretação.

            
                var response = https.get({
                    url: restletUrl
                });

                if (response.body === 'invalid') {
                    alert('Invalid Coupon Code!');
                    return false;
                }

            }
            return true
        }

        return {
            //pageInit: pageInit,
            fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            //lineInit: lineInit,
            //validateField: validateField,
            //validateLine: validateLine
            // validateInsert: validateInsert,
            //validateDelete: validateDelete,
            saveRecord: saveRecord
        };

    });


