# Multi-database-system-query-with-PrestoDB-Web-Client
Multi-database system query with PrestoDB Web Client

#global.js 
contains restBaseurl which is used in queryViewModel.js
Change the url to 127.0.0.1 when you want to run in localhost

also contains metaStoreGetDataSourcesURL to get database meta info from MetaStore project

#queryViewModel.js 
get query from index.html and use restFul to put query to QueryRestService.java(the important java you should look) in multidbsqueryserverapi
and get response 

#bootstrap.min.js; jquery-2.1.3.min.js;knockout-3.2.0.js
you can treat them as libraries.

#datasourcesView.js 
get selected database from index.html and use restFul to get database info from  metaStoreGetDataSourcesURL and return tables and columns info.