function ColumnViewModel(columnName) {
    var self = this;

    self.columnName = ko.observable(columnName);
}

function TableModel(tableName, columns) {
      var self = this;

      self.tableName = ko.observable(tableName);
      self.columns = ko.observableArray(columns);
}

function DatasourceModel(did, ip, port, databaseName, username, password, DBtype, tables,title,description) {
    var self = this;

    self.did = ko.observable(did);
    self.ip = ko.observable(ip);
    self.port = ko.observable(port);
    self.databaseName = ko.observable(databaseName);
    self.username = ko.observable(username);
    self.password = ko.observable(password);
    self.dbType = ko.observable(DBtype);
    self.tables = ko.observableArray(tables);
    self.title = ko.observable(title);
    self.description = ko.observable(description); 
    self.selectedTable = ko.observable();
}

function DatasourcesModel() {
	var self = this;

	self.datasources = ko.observableArray();
                self.selectedDatasource = ko.observable();

	self.getDatasources = function() {
                    var data = ko.toJS(self);
                    data.query = $("#sqlquery").val();
                    //to test it, use firefox
                    $.ajax({
                        url: isInDebug ? 'datasources.json' : metaStoreGetDataSourcesURL,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data) {
                           processDatasources(self, data);
                        },
                        error: function(data) {
                           alert("Failed to fetch datasource information from Metastore.");
                        }
                    });
	};

              function processDatasources(self, data) {

                    $.each(data, function(i, datasource) {

                        var tables = [];

                        $.each(datasource.tables, function(j, table) {

                            var columns = [];

                            $.each(table.columns, function(k, column) {
                                columns.push(new ColumnViewModel(column.columnName));
                            })
debugger;
                            var tableView = new TableModel(table.tableName, columns);
                            tables.push(tableView);
                        })

debugger;
                        var datasources = new DatasourceModel(datasource.id,  datasource.ipAddress, datasource.port, datasource.dbName, 
                            datasource.username, datasource.password,datasource.dbType, tables,datasource.title,datasource.description);
                        self.datasources.push(datasources);
                    })
              }

                self.getDatasources();
}

ko.applyBindings(new DatasourcesModel(), $("#datasourcesContainer")[0]);
