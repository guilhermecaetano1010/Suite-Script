/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/record","N/search"],


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
            let purchase = scriptContext.currentRecord
            
            let id = purchase.getValue('custrecord_nts_field_pre_purchase_order')

            try{

                search.create({
                    type: "customrecord_nts_custom_record_products", // O ID do registro Products
                    filters: [
                        search.createFilter({name: "custrecord_nts_custom_field_product", operator: search.Operator.IS, values: id})
                    ],
                    columns : [
                        search.createColumn({name: 'custrecord_nts_custom_field_p_vendor'}), // Aqui utilizamos os IDs do registro Products
                        search.createColumn({name: 'custrecord_nts_field_color'}),
                        search.createColumn({name: 'custrecord_nts_field_description'}),
                        search.createColumn({name: 'custrecord_nts_field_amount'}),
                        search.createColumn({name: 'custrecord_nts_field_gross_cost'}),
                        search.createColumn({name: 'custrecord_nts_field_base_cost'}),
                        search.createColumn({name: 'custrecord_nts_field_sale_price'}),
                        search.createColumn({name: 'custrecord_nts_field_numbering'}),
                    ]
                }).run().getRange({ start: 0, end: 1000}).forEach(function (result){
                    let productVendor = result.getValue('custrecord_nts_custom_field_p_vendor')
                    let vendorCode = result.getValue('custrecord_nts_field_vendor_code')
                    let color = result.getValue('custrecord_nts_field_color')
                    let description = result.getValue('custrecord_nts_field_description')
                    let amount = result.getValue('custrecord_nts_field_amount')
                    let grossCost = result.getValue('custrecord_nts_field_gross_cost')
                    let baseCost = result.getValue('custrecord_nts_field_base_cost')
                    let salesPrice = result.getValue('custrecord_nts_field_sale_price')
                    let numbering = result.getText('custrecord_nts_field_numbering')


                purchase.selectNewLine({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link', // Aqui colocamos os valores da pesquisa na sublista usando os IDs do registro Products & PO
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_products_vendors',
                    value: productVendor
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_cod_vendor',
                    value: vendorCode
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_color_',
                    value: color
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_description_product',
                    value: description
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_amount_product',
                    value: amount
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_gross_cost_product',
                    value: grossCost
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_base_cost_product',
                    value: baseCost
                });
                purchase.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: 'custrecord_nts_field_sale_price_product',
                    value: salesPrice
                });

                purchase.setCurrentSublistText({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link',
                    fieldId: '	custrecord_nts_field_numbering_product',
                    text: numbering
                });

                purchase.commitLine({
                    sublistId: 'recmachcustrecord_nts_create_items_po_link'
                })
                });


            } catch (e) {
                alert(e.message)
            }


        // Funciona mas roda mais devagar

        //     const purchase = scriptContext.currentRecord
        //     let id = purchase.getValue('custrecord_nts_field_pre_purchase_order')
        //     let objRecord = record.load({
        //     type: 'customrecord104',
        //     id: id
        //    });
        //     var countLines = objRecord.getLineCount({
        //         sublistId: 'recmachcustrecord_nts_custom_field_product'
        //     });

        //     for (let i = 0; i < countLines; i++) {
        //         let productVendor = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_custom_field_p_vendor',
        //             line: i
        //         });
        //         let vendorCode = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_vendor_code',
        //             line: i
        //         });
        //         let color = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_color',
        //             line: i
        //         });
        //         let description = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_description',
        //             line: i
        //         });
        //         let amount = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_amount',
        //             line: i
        //         });
        //         let grossCost = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_gross_cost',
        //             line: i
        //         });
        //         let baseCost = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_base_cost',
        //             line: i
        //         });
        //         let salesPrice = objRecord.getSublistValue({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_sale_price',
        //             line: i
        //         });

        //         let numbering = objRecord.getSublistText({
        //             sublistId: 'recmachcustrecord_nts_custom_field_product',
        //             fieldId: 'custrecord_nts_field_numbering',
        //             line: i
        //         });


        //         purchase.selectNewLine({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_products_vendors',
        //             value: productVendor + " - " + numbering
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_cod_vendor',
        //             value: vendorCode
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_color_',
        //             value: color
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_description_product',
        //             value: description
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_amount_product',
        //             value: amount
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_gross_cost_product',
        //             value: grossCost
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_base_cost_product',
        //             value: baseCost
        //         });
        //         purchase.setCurrentSublistValue({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: 'custrecord_nts_field_sale_price_product',
        //             value: salesPrice
        //         });

        //         purchase.setCurrentSublistText({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link',
        //             fieldId: '	custrecord_nts_field_numbering_product',
        //             text: numbering
        //         });

        //         purchase.commitLine({
        //             sublistId: 'recmachcustrecord_nts_create_items_po_link'
        //         })
        //     }




        }


        return {
            pageInit: pageInit
        };

    });

