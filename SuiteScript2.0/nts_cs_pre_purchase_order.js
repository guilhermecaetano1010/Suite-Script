/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

    function () {

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
            purchase = scriptContext.currentRecord

            if (scriptContext.sublistId == 'recmachcustrecord_nts_custom_field_product') {

                let productVendor = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_custom_field_p_vendor'
                });
                let vendorCode = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_vendor_code'
                });
                let color = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_color'
                });
                let description = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_description'
                });
                let amount = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_amount'
                });
                let grossCost = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_gross_cost'
                });
                let baseCost = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_base_cost'
                });
                let salesPrice = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_sale_price'
                });

                let separateItem = purchase.getCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_separate_item'
                });


                let numbering = purchase.getCurrentSublistText({
                    sublistId: 'recmachcustrecord_nts_custom_field_product',
                    fieldId: 'custrecord_nts_field_numbering'
                });

                if(numbering.length && separateItem == false){

                    let numberingLength = numbering.length
                    let numeros = numbering.split(',')
                    let numeroItens = 0
                    
                    for (numeroItens; numberingLength > numeroItens; numeroItens++) {
                        
                        let numero = numeros[numeroItens]
                        
                        if (numero) {
                            
                            let numeroSemEspaco = numero.replace(/\s/g, '');
                            
                            purchase.selectNewLine({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                        });
                            purchase.setCurrentSublistValue({
                                sublistId: 'recmachcustrecord_nts_custom_field_product',
                                fieldId: 'custrecord_nts_custom_field_p_vendor',
                                value: productVendor + " - " + numeroSemEspaco
                            });
                            purchase.setCurrentSublistValue({
                                sublistId: 'recmachcustrecord_nts_custom_field_product',
                                fieldId: 'custrecord_nts_field_vendor_code',
                                value: vendorCode
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_color',
                            value: color
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_description',
                            value: description
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_amount',
                            value: amount
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_gross_cost',
                            value: grossCost
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_base_cost',
                            value: baseCost
                        });
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_sale_price',
                            value: salesPrice
                        });
                        
                        
                        purchase.setCurrentSublistText({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_numbering',
                            text: numeroSemEspaco,
                            ignoreFieldChange: true
                        });
                        
                        purchase.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_custom_field_product',
                            fieldId: 'custrecord_nts_field_separate_item',
                            value: true
                        });
                        purchase.commitLine({
                            sublistId: 'recmachcustrecord_nts_custom_field_product'
                        })
                    }
                    
                }
                
            }
            

                if (!amount) {
                    alert('You have selected a amount!')
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

            customer = scriptContext.currentRecord

            var perfRevCount2 = customer.getLineCount({
                sublistId: 'recmachcustrecord_sdr_prod_pref_customer'
            });

            var sum = 0
            for (let i = 0; i < perfRevCount2; i++) {

                var preferredQuantity = parseInt(customer.getSublistValue({
                    sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                    fieldId: 'custrecord_sdr_prod_pref_qty',
                    line: i
                }));
                sum += preferredQuantity

            }
            if (sum > 900) {  //Era 25 mas foi atualizado por causa do outro exercício
                alert('The total preferred quantity across all product preferences has exceeded the limit of 25')
                return false
            } else {
                
            return true
            }

        }

        return {
            // pageInit: pageInit,
            //fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            //validateField: validateField,
            validateLine: validateLine
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });