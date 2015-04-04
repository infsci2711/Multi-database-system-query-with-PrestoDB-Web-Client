function QueryModel() {
    var self = this;

    self.query = ko.observable();
}

function QueryResultModel(data) {
    var self = this;

    self.data = ko.observable(data);
}

function QueryViewModel() {
	var self = this;

	self.queryModel = ko.observable(new QueryModel());
    self.queryRestultModel = ko.observable(new QueryResultModel());

	self.run = function() {
		$.ajax({
            url: restBaseUrl + "Query",
            type: 'PUT',
            dataType: 'json',
            data: ko.toJSON(self.queryModel()),
            contentType: "application/json",
            crossDomain: true,
            success: function(data) {
                console.log(data);
                self.queryRestultModel(new QueryResultModel(data));
                //debugger;
            },
            error: function(data) {
                var err=data.responseJSON;
		alert("Oops, there 's an error.\n\nerror type:   "+err.error+"\n\nerror details:  "+err.message);
            }
        });
	};
}

ko.applyBindings(new QueryViewModel(), $("#queryContainer")[0]);
