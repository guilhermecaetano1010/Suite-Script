/**
 * @NScriptType ScheduledScript
 * @NApiVersion 2.0
 */

define(['N/record', 'N/search'],
    /**
     * @param {search} search
     * @param {Record} record 
     */
    function (record, search) {
        /**
         * Definition of the Scheduled script trigger point.
         * 
         * @param {Object} scriptContext
         * @param {string} scriptContext.type   
         * @Since 2015.2
         */

        function execute(scriptContext) {
            //     // var caseSearch = search.load({
            //     //     id: 'customsearch_sdr_prod_shortages'
            //     // });

            // var searchResults = caseSearch.run().getRange({
            //     start : 0,
            //     end   : 9 
            // });
            // var stop = 'This is a stopper line'
            // }


            var productSearch = search.create({
                type: 'customrecord_sdr_prod_pref',
                filters: [
                    search.createFilter({
                        name: 'custrecord_sdr_prod_pref_qty',
                        operator: search.Operator.GREATERTHAN,
                        values: '2'
                    }),
                    search.createFilter({
                        name: 'subsidiary',
                        join: 'custrecord_sdr_prod_pref_customer',
                        operator: search.Operator.ANYOF,
                        values: 1
                    })
                ],
                columns: [
                    search.createColumn({ name: 'custrecord_sdr_prod_pref_customer' }),
                    search.createColumn({ name: 'email', join: 'custrecord_sdr_prod_pref_customer' }),
                    search.createColumn({ name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer' }),
                    search.createColumn({ name: 'custrecord_sdr_prod_pref_item' }),
                    search.createColumn({ name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item' }),
                    search.createColumn({ name: 'custrecord_sdr_prod_pref_qty' })
                ]
            });

            var searchResults = productSearch.run().getRange({
                start: 0,
                end: 9
            });

            for (var i = 0; i < searchResults.length; i++) {
                var customerId = searchResults[i].getValue('custrecord_sdr_prod_pref_customer')
                var customerEmail = searchResults[i].getValue({
                    name: 'email', join: 'custrecord_sdr_prod_pref_customer'
                })

                var subsidiary = searchResults[i].getText({
                    name: 'subsidiary', join: 'custrecord_sdr_prod_pref_customer'
                })

                var preferredItem = searchResults[i].getText('custrecord_sdr_prod_pref_item')

                var available = parseInt(searchResults[i].getValue({
                    name: 'quantityavailable', join: 'custrecord_sdr_prod_pref_item'
                }))

                var preferredQuantity = parseInt(searchResults[i].getValue('custrecord_sdr_prod_pref_qty'))
            }

            if (available < preferredQuantity) {

                var supportCase = record.create({
                    type: record.Type.SUPPORT_CASE,
                    isDynamic: true
                });

                supportCase.setValue('title', 'Item low for customer');
                supportCase.setValue({ fieldId: 'company', value: customerId });
                supportCase.setValue({ fieldId: 'incomingmessage', value: 'This company prefers to puchase ' + preferredQuantity + ' ' + preferredItem + ' each time they create a sales order, but only ' + available + ' are left in stock.' });
                supportCase.save();
            } else {

                log.debug('Product search', 'Customer ID : ' + customerId +
                    '\nCustomer email : ' + customerEmail +
                    '\nSubsidiary : ' + subsidiary +
                    '\nPreferred item : ' + preferredItem +
                    '\nQuantity Available : ' + available +
                    '\nPreferred quantity : ' + preferredQuantity
                )
            }


            // var stop = 'This is a stopper line'
        }
        return {
            execute: execute
        }
    });
