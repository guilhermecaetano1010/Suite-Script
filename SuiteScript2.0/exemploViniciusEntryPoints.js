/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/ui/dialog"],

    function (dialog) {
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
            const currentRecord = scriptContext.currentRecord

            if (scriptContext.fieldId == "custentity_sdr_apply_coupon") {


                let applyCoupon = currentRecord.getValue({ fieldId: "custentity_sdr_apply_coupon" });

                if (applyCoupon == true) {

                    let couponCode = currentRecord.getField({ fieldId: "custentity_sdr_coupon_code" });

                    couponCode.isMandatory = true
                    couponCode.isDisabled = false


                } else {

                    let couponCode = currentRecord.getField({ fieldId: "custentity_sdr_coupon_code" });

                    if (couponCode) {

                        dialog.create({
                            title: "Alerta!",
                            message: "O campo Coupon está preenchido. Caso você prossiga com a ação, o conteúdo será excluído. Deseja prosseguir?",
                            buttons: [
                                { label: 'Prosseguir', value: 1 },
                                { label: 'Cancelar', value: 2 },
                            ]
                        }).then(function (resposta) {
                            if (resposta == 1) {
                                currentRecord.setValue({ fieldId: "custentity_sdr_coupon_code", value: "" });
                            } else {

                                currentRecord.setValue({ fieldId: "custentity_sdr_apply_coupon", value: true, ignoreFieldChange: true });
                            }
                        })

                    }

                    couponCode.isMandatory = false
                    couponCode.isDisabled = true

                }
            }

        }

        function saveRecord(scriptContext) {
            const currentRecord = scriptContext.currentRecord

            let applyCoupon = currentRecord.getValue({ fieldId: "custentity_sdr_apply_coupon" });

            if (applyCoupon == true) {

                let couponCode = currentRecord.getValue({ fieldId: "custentity_sdr_coupon_code" });

                if (!couponCode) {
                    // SE O CAMPO ESTA VAZIO

                    alert("Preencha o campo Coupon Code.")
                    return false

                } else {

                    return true
                }

            }
        }


        return {
            fieldChanged: fieldChanged,
            saveRecord: saveRecord,
        };

    });