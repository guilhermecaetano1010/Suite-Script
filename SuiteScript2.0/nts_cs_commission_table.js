/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],


    function (record) {


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
            let currentRecord = scriptContext.currentRecord

            if(scriptContext.fieldId == 'custrecord_nts_field_commission_company') {
                let subsidiary = currentRecord.getValue({fieldId: 'custrecord_nts_field_commission_company'})
                record.load.promise({
                    type: record.Type.SUBSIDIARY,
                    id: subsidiary
                }).then(function (subsidiaryRecord) {
                    let currencySubsidiary = subsidiaryRecord.getValue({ fieldId: 'currency' });
                    currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value: currencySubsidiary });

                }).catch(function (error) {
                    log.error({
                        title: 'Error loading subsidiary record',
                        details: error.toString()
                    });
                });
            }

        //     if(scriptContext.fieldId == 'custrecord_nts_field_commission_on'){
        //     let commissionOn = currentRecord.getValue({fieldId: 'custrecord_nts_field_commission_on'});
        //      if (commissionOn == '1') {
        //         currentRecord.getField({
        //            fieldId: 'custrecord_nts_field_commission_per'
        //         }).isDisabled = true;
        //      } else {
        //         currentRecord.getField({
        //            fieldId: 'custrecord_nts_field_commission_per'
        //         }).isDisabled = false;
        //      }
        // }


                // let company = currentRecord.getValue({fieldId : 'custrecord_nts_field_commission_company'})
                // switch (company) {
                //     case '1' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '1' });
                //         break;
                //     case '3' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '2' });                     
                //         break;
                //     case '4' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '2' });                        
                //         break;
                //     case '5' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '4' });                       
                //         break;
                //     case '8' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '6' });                       
                //         break;
                //     case '9' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '7' });                       
                //         break;
                //     case '10' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '5' });                       
                //         break;
                //     case '11' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '1' });                       
                //         break;
                //     case '12' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '1' });                        
                //         break;
                //     case '15' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '2' });                        
                //         break;
                //     case '16' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '3' });                       
                //         break;
                //     case '17' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '1' });                       
                //         break;
                //     case '18' :
                //         currentRecord.setValue({ fieldId: 'custrecord_nts_field_commission_currency', value : '8' });                       
                //         break;
                
                //     default:
                //         alert('Error! Incorrect value.')
                //         break;
                // }
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

        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
