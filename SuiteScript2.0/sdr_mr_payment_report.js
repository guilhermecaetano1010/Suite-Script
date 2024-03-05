/**
 * @NScriptType MapReduceScript
 * @NApiVersion 2.1
 */

define(['N/search', 'N/runtime'],
    /**
     * @param {search} search
     * @param {runtime} runtime
     */
    function (search, runtime) {
    /**
     * Marks the beggining of the Map/Reduce process and generates input data.
     * 
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     * 
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() {
        var customerId = runtime.getCurrentScript().getParameter({
            name: 'custscript_sdr_mr_customer_parameter'
        });
            var invSearch = search.create({
            type : search.Type.TRANSACTION,
            filters : [
                ['type', search.Operator.IS, 'payingtransaction'], 'and',
                ['mainline', search.Operator.IS, true], 'and',
                ['entity', search.Operator.ANYOF, customerId]
            ],
            columns :[
                'entity',
                'statusref',
                'amountpaid'
            ]
        });

        return invSearch;




        // return {
        //     type : 'search',
        //     id: 152
        // };

        
        
        }
    
        /**
         * Executes when the map entry point is triggered ans applies to each key/values
         * 
         * @param {MapSummary} context - Data collection containing the key/value
         * @since 2015.1
         */
        function map(context) {

            var searchResult = JSON.parse(context.value);
            
            var customer = searchResult.values.entity.text;
            var statusRef = searchResult.values.statusref;
            var amountPaid = searchResult.values.amountpaid;
    
            context.write({
                key: customer,
                value : {                 
                    statusref: statusRef,
                    amountpaid : amountPaid
                }
            })
    
        }



        function reduce(context) {
            var totalDeposited = 0;
            var totalUndeposited = 0;

            var values = context.values; 

            values.forEach(function (value) {
                var element = JSON.parse(value);

                if (element.statusref === 'deposited') {
                    totalDeposited += element.amountpaid;
                } else if (element.statusref === 'undeposited') {
                    totalUndeposited += element.amountpaid;
                }
            });

            log.debug({
                title: 'Total values for each customer',
                details: 'Customer: ' + context.key + ', Total Deposited: ' + totalDeposited + ', Total Undeposited: ' + totalUndeposited
            });
        }

        function summarize(summary) {
            var usageConsumed = summary.usage;
            var queuesUsed = summary.concurrency;
            var yieldsDone = summary.yields;

            log.debug({
                title: 'Summarized Values',
                details: 'Usage Consumed: ' + usageConsumed + ', Queues Used: ' + queuesUsed + ', Yields Done: ' + yieldsDone
            });
        }

        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce,
            summarize: summarize
        };
    });






