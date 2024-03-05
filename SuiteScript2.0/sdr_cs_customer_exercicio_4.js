/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/record", "N/search"],

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
            const currentRecord = scriptContext.currentRecord
            let recordId = currentRecord.id

            // let amountSalesOrder = _recordLoad(record, recordId);
            let amountPromise = _recordLoadPromise(record, recordId); //Comenta a que não for usar no momento do teste


        }

        function _recordLoad(record, recordId) {

            search.create({
                type: search.Type.SALES_ORDER,
                filters: [],
                columns: [
                    search.createColumn({ name: "internalid" })
                ],
            }).run().getRange({ start: 0, end: 15 }).forEach(function (result) {
                let id = result.getValue("internalid")

                let salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: id
                });

                amount = salesOrder.getValue({ fieldId: "total" });

                console.log("Total: " + amount)
            })

            return amount
        }


        function _recordLoadPromise(record, recordId) {

            search.create({
                type: search.Type.SALES_ORDER,
                filters: [],
                columns: [
                    search.createColumn({ name: "internalid" })
                ],
            }).run().getRange({ start: 0, end: 15 }).forEach(function (result) {
                let id = result.getValue("internalid")

                let salesOrder = record.load.promise({
                    type: record.Type.SALES_ORDER,
                    id: id
                });

                salesOrder.then(function (objRecord) {
                    amount = objRecord.getValue({ fieldId: "total" });
                    console.log(amount)

                });
            })



            return amount
        }



        return {
            pageInit: pageInit
        };

    });