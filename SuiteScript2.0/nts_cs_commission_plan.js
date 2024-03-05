/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search'],


    function (record, search) {


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


            // if (scriptContext.sublistId == 'recmachcustrecord_nts_field_schedules_plan') {
            //     let currentRecord = scriptContext.currentRecord;
            //     let id = currentRecord.getCurrentSublistValue({
            //         sublistId: 'recmachcustrecord_nts_field_schedules_plan',
            //         fieldId: 'custrecord_nts_field_schedule'
            //     });

            //     if (id) {

            //         record.load.promise({
            //             type: 'customrecord_nts_record_commission_table',
            //             id: id
            //         }).then(function (result) {
            //             let currency = result.getText({
            //                 fieldId: 'custrecord_nts_field_commission_currency'
            //             })
            //             let commissionOn = result.getText({
            //                 fieldId: 'custrecord_nts_field_commission_on'
            //             })
            //             let createdOn = result.getValue({
            //                 fieldId: 'created'
            //             })

            //             let dateObj = new Date(createdOn)



            //             currentRecord.setCurrentSublistText({
            //                 sublistId: 'recmachcustrecord_nts_field_schedules_plan',
            //                 fieldId: 'custrecord_nts_field_schedule_currency',
            //                 text: currency
            //             });
            //             currentRecord.setCurrentSublistText({
            //                 sublistId: 'recmachcustrecord_nts_field_schedules_plan',
            //                 fieldId: 'custrecord_nts_field_schedule_type',
            //                 text: commissionOn
            //             });
            //             currentRecord.setCurrentSublistValue({
            //                 sublistId: 'recmachcustrecord_nts_field_schedules_plan',
            //                 fieldId: 'custrecord_nts_field_schedule_created_on',
            //                 value: dateObj
            //             });

            //         })
            //     }


            // }

            

            // if (scriptContext.sublistId == 'recmachcustrecord_nts_field_assign_plan') {
            //     let currentRecord = scriptContext.currentRecord;
            //     let id = currentRecord.getCurrentSublistValue({
            //         sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //         fieldId: 'custrecord_nts_field_assign_sales_rep'
            //     });

            //     if (id) {

            //         record.load.promise({
            //             type: record.Type.EMPLOYEE,
            //             id: id
            //         }).then(function (result) {

            //             let phone = result.getValue({
            //                 fieldId: 'phone'
            //             })
            //             let email = result.getValue({
            //                 fieldId: 'email'
            //             })

            //             let currentDate = new Date()

            //             let dateAfterYear = new Date()
            //             dateAfterYear.setFullYear(dateAfterYear.getFullYear() + 1)


            //             // currentRecord.setCurrentSublistText({
            //             //     sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //             //     fieldId: 'custrecord_nts_field_assign_currency',
            //             //     text: currency
            //             // })

            //             currentRecord.setCurrentSublistValue({
            //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //                 fieldId: 'custrecord_nts_field_assign_phone',
            //                 value: phone
            //             });
            //             currentRecord.setCurrentSublistValue({
            //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //                 fieldId: 'custrecord_nts_field_assign_email',
            //                 value: email
            //             });
            //             currentRecord.setCurrentSublistValue({
            //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //                 fieldId: 'custrecord_nts_field_assign_from',
            //                 value: currentDate
            //             });
            //             currentRecord.setCurrentSublistValue({
            //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
            //                 fieldId: 'custrecord_nts_field_assign_to',
            //                 value: dateAfterYear
            //             });

            //         });
            
            //     }
            
            
            
            // }

                
                // if (scriptContext.sublistId == 'recmachcustrecord_nts_field_schedules_plan') {
                //     let currentRecord = scriptContext.currentRecord;
                //     let id = currentRecord.getCurrentSublistValue({
                //     sublistId: 'recmachcustrecord_nts_field_schedules_plan',
                //     fieldId: 'custrecord_nts_field_schedule'
                // });
                //      if (id > 0) {
                
                //     try {
                //           setTimeout(function () {
                //               let searchResult = search.create({
                //               type: "customrecord_nts_record_commission_table",
                //               filters: [
                //                   search.createFilter({ name: 'internalid', operator: search.Operator.ANYOF, values: id })
                //               ],
                //               columns: [
                //                   search.createColumn({ name: 'custrecord_nts_field_commission_currency' }),
                //                   search.createColumn({ name: 'custrecord_nts_field_commission_on' }),
                //                   search.createColumn({ name: 'created' })
                //               ]
                //           }).run().getRange({ start: 0, end: 1}).forEach(function(result){

                //               let currency = result.getText('custrecord_nts_field_commission_currency');
                //               let commissionOn = result.getText('custrecord_nts_field_commission_on');
                //               let createdOn = result.getValue('created');
                              
        
                                  
                //                   let dateObj = new Date(createdOn)
                                  
                //                   currentRecord.setCurrentSublistText({
                //                       sublistId: 'recmachcustrecord_nts_field_schedules_plan',
                //                       fieldId: 'custrecord_nts_field_schedule_currency',
                //                       text: currency
                //                   });
                //                   currentRecord.setCurrentSublistText({
                //                       sublistId: 'recmachcustrecord_nts_field_schedules_plan',
                //                       fieldId: 'custrecord_nts_field_schedule_type',
                //                       text: commissionOn
                //                   });
                                  
                //                   currentRecord.setCurrentSublistValue({
                //                       sublistId: 'recmachcustrecord_nts_field_schedules_plan',
                //                       fieldId: 'custrecord_nts_field_schedule_created_on',
                //                       value: dateObj
                //                   });
                //           })
                          

                //           },200)
                        
                            
                //         } catch (e) {
                //             alert(e.message);
                //         }
                //     }
                // }



                // if (scriptContext.sublistId == 'recmachcustrecord_nts_field_assign_plan') {
                //     let currentRecord = scriptContext.currentRecord;
                //     let id = currentRecord.getCurrentSublistValue({
                //     sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //     fieldId: 'custrecord_nts_field_assign_sales_rep'
                // });
                //      if (id > 0) {
                
                //     try {
                //           setTimeout(function () {
                //               search.create({
                //               type: search.Type.EMPLOYEE,
                //               filters: [
                //                   search.createFilter({ name: 'internalid', operator: search.Operator.ANYOF, values: id })
                //               ],
                //               columns: [
                //                   search.createColumn({ name: 'phone' }),
                //                   search.createColumn({ name: 'email' }),
                //               ]
                //           }).run().getRange({ start: 0, end: 1 }).forEach(function(result){
                              
                //               let phone = result.getValue('phone');
                //               let email = result.getValue('email');
                              
                //               let currentDate = new Date()
                //               let dateAfterYear = new Date()
                //               dateAfterYear.setFullYear(dateAfterYear.getFullYear() + 1)
                              
                              
                //             // currentRecord.setCurrentSublistText({
                //             //     sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //             //     fieldId: 'custrecord_nts_field_assign_currency',
                //             //     text: currency
                //             // })
    
                //             currentRecord.setCurrentSublistValue({
                //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //                 fieldId: 'custrecord_nts_field_assign_phone',
                //                 value: phone
                //             });
                //             currentRecord.setCurrentSublistValue({
                //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //                 fieldId: 'custrecord_nts_field_assign_email',
                //                 value: email
                //             });
                //             currentRecord.setCurrentSublistValue({
                //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //                 fieldId: 'custrecord_nts_field_assign_from',
                //                 value: currentDate
                //             });
                //             currentRecord.setCurrentSublistValue({
                //                 sublistId: 'recmachcustrecord_nts_field_assign_plan',
                //                 fieldId: 'custrecord_nts_field_assign_to',
                //                 value: dateAfterYear
                //             });

                //         })

    
                //         },200)
                        
                            
                //         } catch (e) {
                //             alert(e.message);
                //         }
                //     }
                // }

                if (scriptContext.fieldId == "custrecord_nts_field_assign_sales_rep") {

                    let currentRecord = scriptContext.currentRecord;
                    let salesRep = currentRecord.getCurrentSublistValue({ sublistId: "recmachcustrecord_nts_field_assign_plan", fieldId: "custrecord_nts_field_assign_sales_rep" });
    
                    if (!salesRep) {
    
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_field_assign_plan',
                            fieldId: 'custrecord_nts_field_assign_from',
                            value: null
                        });
    
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_field_assign_plan',
                            fieldId: 'custrecord_nts_field_assign_to',
                            value: null
                        });
    
                    } else {
                        let currentDate = new Date()
                        let dateAfterYear = new Date()
                        dateAfterYear.setFullYear(dateAfterYear.getFullYear() + 1)
    
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_field_assign_plan',
                            fieldId: 'custrecord_nts_field_assign_from',
                            value: currentDate
                        });
    
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'recmachcustrecord_nts_field_assign_plan',
                            fieldId: 'custrecord_nts_field_assign_to',
                            value: dateAfterYear
                        });
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
            // pageInit: pageInit,
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
