/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/search", "N/record"],


    function (search, record) {


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
        
 function createProductsPurchase() {

     let currentUrl = document.location.href;
     let url = new URL(currentUrl)
     let id = url.searchParams.get("id") //Pega o ID da página web atual

     try{

        document.getElementById("loadscreen").style.visibility = 'visible'

        setTimeout(function () {
            search.create({
                type: "customrecord109", //Id do registro Products & PO
                filters: [
                    search.createFilter({name: "custrecord_nts_create_items_po_link", operator: search.Operator.IS, values: id}) // name: Id do parent field que conecta os registros
                ],
                columns : [
                    search.createColumn({name: 'custrecord_nts_field_products_vendors'}), //Os IDs são dos campos do registro Products & PO 
                    search.createColumn({name: 'custrecord_nts_field_cod_vendor'}),
                    search.createColumn({name: 'custrecord_nts_field_base_cost_product'}),
                    search.createColumn({name: 'internalid'}),
                ]
            }).run().getRange({ start: 0, end: 1000}).forEach(function (result){
                let productVendor = result.getValue('custrecord_nts_field_products_vendors')// Os IDs se repetem no resultado
                let vendorCode = result.getValue('custrecord_nts_field_cod_vendor')
                let baseCost = result.getValue('custrecord_nts_field_base_cost_product')
                let internalIdLinha = result.getValue('internalid')
    
               let objItem = record.create({
                   type: record.Type.INVENTORY_ITEM,
                   isDynamic: true
               });
    
               objItem.setValue({fieldId:'itemid', value: productVendor}) //Aqui preenche os campos do novo registro de Item que queremos criar
               objItem.setValue({fieldId:'displayname', value: vendorCode})
               objItem.setValue({fieldId:'vendorname', value: vendorCode})
               objItem.setValue({fieldId:'cost', value: baseCost})
               objItem.setValue({fieldId:'taxschedule', value: 1})
               let idNewProduct = objItem.save()
    
               let objProducts = record.load({
                   type: "customrecord109",
                   id: internalIdLinha
               })
    
               objProducts.setValue({fieldId: "custrecordnts_field_product_created", value: idNewProduct})
               objProducts.save()
    
    
            });
    
            window.location.reload()
        }, 1000)


     } catch (e) {
         alert(e.message)
     }

 }       




        return {
            pageInit: pageInit,
            createProductsPurchase: createProductsPurchase
        };

    });