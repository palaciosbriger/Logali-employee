sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'logaligroup/employees/model/formatter'
], 

function(Controller, formatter) {

    function onInit(){


    };
    function onCreateIncidence(){

        var tableIncidence = this.getView().byId("tableIncidence");        
        var newIncidence   = sap.ui.xmlfragment("logaligroup.employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index : index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);

    };
    function onDeleteIncidence(oEvent) {
        var tableIncidence = this.getView().byId("tableIncidence");
        var rowIncidence = oEvent.getSource().getParent().getParent();
        var incidenceModel = this.getView().getModel("incidenceModel");
        var oData = incidenceModel.getData();
        var contextObj = rowIncidence.getBindingContext("incidenceModel").getObject();
        
        oData.splice(contextObj.index-1,1);
        for (var i in oData) {
            oData[i].index = parseInt(i) + 1;
        };

        incidenceModel.refresh();
        tableIncidence.removeContent(rowIncidence);

        for (var j in tableIncidence.getContent()){
            tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
        }
    };
    
    var EmployeeDetails = Controller.extend("logaligroup.employees.controller.MasterEmployee", {});
    
    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;

    return EmployeeDetails;
    
});