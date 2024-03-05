/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/ui/dialog'],

    /**
     * @param{https} https
     */

    function (https, dialog) {


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
            const currentRecord = scriptContext.currentRecord

            if (scriptContext.fieldId == "custentity_nts_cs_cnpj_customer") {

                let cnpj = currentRecord.getValue({ fieldId: "custentity_nts_cs_cnpj_customer" }).replace(/[^\w\s]/g, '');
                let url = "https://brasilapi.com.br/api/cnpj/v1/"

                
                
                if (!cnpj)
                    return
                
                
                if(cnpj.length !== 14) {
                    dialog.create({
                        title: "Erro!",
                        message: "<b>CNPJ está incorreto!</b>"
                    })  
                    return
                }
                

                https.get.promise({
                    url: url + cnpj
                }).then(function (response) {
                    let responseBody = response.body

                    let responseJson = JSON.parse(responseBody)
                    let razaoSocial = responseJson.razao_social
                    let nomeFantasia = responseJson.nome_fantasia
                    let descricaoSituacaoCadastral = responseJson.descricao_situacao_cadastral
                    let dataInicioAtividade = responseJson.data_inicio_atividade
                    let telefonePrincipal = responseJson.ddd_telefone_1
                    let telefoneAlternativo = responseJson.ddd_telefone_2
                    let fax = responseJson.ddd_fax
                    let cnae = responseJson.cnae_fiscal
                    let cnaeDescricao = responseJson.cnae_fiscal_descricao
                    let logradouroDescricao = responseJson.descricao_tipo_logradouro
                    let logradouro = responseJson.logradouro
                    let numero = responseJson.numero
                    let complemento = responseJson.complemento
                    let bairro = responseJson.bairro
                    let cep = responseJson.cep
                    let uf = responseJson.uf
                    let codigoMunicipio = responseJson.codigo_municipio
                    let municipio = responseJson.municipio
                    let enderecoCompleto = /*logradouroDescricao+"\n"+*/"Logradouro: "+logradouro+"\n"+"Número: "+numero+"\n"+"Complemento: "+complemento+"\n"+"Bairro: "+bairro+"\n"+"CEP: "+cep+"\n"+"UF: "+uf+"\n"+"Código do município: "+codigoMunicipio+"\n"+"Município: "+municipio
                    let newDate = new Date(dataInicioAtividade)
                    let dataCompleta = (newDate.getDate() + 1) + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()

                    dialog.create({
                        title: "CNPJ encontrado!",
                        message:
                            "<b>Razão Social: </b>"         + razaoSocial + "<br>" +
                            "<b>Nome Fantasia: </b>"        + nomeFantasia+"<br>" +
                            "<b>Data de Início: </b>"       + dataCompleta+"<br>" +
                            "<b>Telefone Principal: </b>"   + telefonePrincipal+"<br>" +
                            "<b>Telefone Alternativo: </b>" + telefoneAlternativo+"<br>" +
                            "<b>Fax: </b>"                  + fax+"<br>" +
                            "<b>Endereço: </b>"             +"<br>" +
                            /*logradouroDescricao             +"<br>" +*/
                            "Logradouro: "+logradouro       +"<br>" +
                            "Número: "+numero               +"<br>" +
                            "Complemento: "+complemento     +"<br>" +
                            "Bairro: "+bairro               +"<br>" +
                            "CEP: "+cep                     +"<br>" +
                            "UF: "+uf                       +"<br>" +
                            "Código do Município: "+codigoMunicipio+"<br>" +
                            "Município: "+municipio         +"<br>" +
                            "<b>CNAE Fiscal: </b>"          + cnae+"<br>" +
                            "<b>CNAE Descrição: </b>"       + cnaeDescricao+"<br>" +
                            "<b>Situação cadastral: </b>"   + descricaoSituacaoCadastral,
                        buttons: [
                            { label: "Cadastrar", value: 1 },
                            { label: "Cancelar", value: 2 },
                        ]
                    }).then(function (result) {
                        if (result == 1 && descricaoSituacaoCadastral == "ATIVA") {
                            currentRecord.setValue({ fieldId: "companyname", value: razaoSocial })
                            currentRecord.setValue({ fieldId: "custentity_nts_cs_registration_status", value: descricaoSituacaoCadastral})
                            currentRecord.setValue({ fieldId: "custentitynts_fantasyname_customer", value: nomeFantasia })
                            currentRecord.setValue({ fieldId: "custentity_nts_cs_start_date", value: dataCompleta})
                            currentRecord.setValue({ fieldId: "phone", value: telefonePrincipal})
                            currentRecord.setValue({ fieldId: "altphone", value: telefoneAlternativo})
                            currentRecord.setValue({ fieldId: "fax", value: fax})
                            currentRecord.setValue({ fieldId: "custentity_nts_cs_address_description", value: enderecoCompleto})
                            currentRecord.setValue({ fieldId: "custentity_nts_cs_cnae_fiscal", value: cnae})
                            currentRecord.setValue({ fieldId: "custentity_nts_cs_cnae_descricao", value: cnaeDescricao})
                            
                            
                            
                            try{
                                
                                
                                let enderecoSubRecord = currentRecord.getCurrentSublistSubrecord({
                                    sublistId: 'addressbook',
                                    fieldId: 'addressbookaddress'
                                });
                                
                    
                                enderecoSubRecord.setValue({
                                    fieldId: 'country',
                                    value: 'BR' 
                                });
                                
                                
                                enderecoSubRecord.setValue({
                                    fieldId: 'addr1',
                                    value: logradouro + ' ' + numero
                                });
                                enderecoSubRecord.setValue({
                                    fieldId: 'addrphone',
                                    value: telefonePrincipal
                                });
                                
                                enderecoSubRecord.setValue({
                                    fieldId: 'state',
                                    value: uf
                                });
                                
                                enderecoSubRecord.setValue({
                                    fieldId: 'city',
                                    value: municipio
                                });
                                
                                enderecoSubRecord.setValue({
                                    fieldId: 'zip',
                                    value: cep
                                });
                                currentRecord.commitLine({
                                    sublistId: 'addressbook'
                                });
                                alert("Endereço cadastrado com sucesso!")
                            } catch{
                                alert("Endereço não cadastrado!")
                            }
                            if (uf == "SP") {
                                currentRecord.setValue({ fieldId: "subsidiary", value: 19})
                            } 
                            }  
                            if(result == 1 && descricaoSituacaoCadastral != "ATIVA"){
                            dialog.create({
                                title: "Erro!",
                                message:
                                    "<b>Não pode ser cadastrado!</b>"   +"<br>"+ 
                                    "Pois a situação cadastral está: "+ descricaoSituacaoCadastral
                            })  
                        }
                        if (result == 2) {
                            return 
                        }
                   })

                })
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
            // validateField: validateField
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });

