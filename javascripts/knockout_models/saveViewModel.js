function SaveViewModel() {
	var self = this;

	self.ip = ko.observable();
                self.port = ko.observable();
                self.dbtype=ko.observable
                self.username = ko.observable();
                self.password = ko.observable();
                self.dbname = ko.observable();
                self.title = ko.observable();
                self.description = ko.observable();
                self.tablename = ko.observable();

	self.save = function() {
                    var data = ko.toJS(self);
                    data.query = $("#sqlquery").val();
debugger;
                    $.ajax({
                        url: restBaseUrl + "Query/Save",
                        type: 'Put',
                        dataType: 'json',
                        data: JSON.stringify(data) ,
                        contentType: "application/json",
                        crossDomain: true,
                        success: function(data) {
                            //console.log(data);
                            //self.queryRestultModel(new QueryResultModel(data));
                            alert("yes");
                            //debugger;
                        },
                        error: function(data) {
                            //alert("Something went wrong while running query. Please try again.");
            		var err = data.responseJSON;
            		alert("Oops, there 's an error.\n\nerror type:   " + err.error + "\n\nerror details:  " + err.message);
            		//alert(data);
            		//console.log(err.error);
                        }
                    });
	};
}

ko.applyBindings(new SaveViewModel(), $("#modal-contents")[0]);
