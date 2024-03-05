/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/ui/dialog'],


    function (record, dialog) {
        /**
         * @param record
         * @param dialog
         */

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

        function aprovar(scriptContext) {
            // const confirmPurchase = confirm("Are you sure you want to approve the purchase order?")
            dialog.create({
                title: "Alert!",
                message: "Are you sure you want to approve the purchase order?",
                buttons: [
                    { label: "Aprovar", value: 1 },
                    { label: "Cancelar", value: 2 },
                ]
            }).then(function (result) {

                // if(confirmPurchase){
                if (result == 1) {

                    let currentUrl = document.location.href;
                    let url = new URL(currentUrl);
                    let id = url.searchParams.get("id")

                    let objRecord = record.load({
                        type: "customrecord104",
                        id: id
                    })

                    objRecord.setValue({
                        fieldId: "custrecord_nts_custom_order_status",
                        value: 3
                    })
                    objRecord.save()
                    window.location.reload();
                }
                if (result == 2) {
                    return
            }
            })
        }

        function reprovar(scriptContext) {
            //const reprovePurchase = confirm("Are you sure you want to reprove the purchase order?")
            dialog.create({
                title: "Alert!",
                message: "Are you sure you want to reprove the purchase order?",
                buttons: [
                    { label: "Reprovar", value: 1 },
                    { label: "Cancelar", value: 2 },
                ]
            }).then(function (result) {
                //if(reprovePurchase){
                if (result == 1) {
                    let currentUrl = document.location.href;
                    let url = new URL(currentUrl);
                    let id = url.searchParams.get("id")

                    let objRecord = record.load({
                        type: "customrecord104",
                        id: id
                    })

                    objRecord.setValue({
                        fieldId: "custrecord_nts_custom_order_status",
                        value: 4
                    })
                    objRecord.save()
                    window.location.reload();
                }
                if (result == 2) {
                    return
                }

            })
        }
    

    return {
    pageInit: pageInit,
    aprovar: aprovar,
    reprovar: reprovar
     };

});