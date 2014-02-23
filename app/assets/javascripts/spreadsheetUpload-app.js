var app = angular.module('spreadsheetUpload', ['angularFileUpload'])

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}])

$(document).on('ready page:load', function() {
  angular.bootstrap(document.body, ['spreadsheetUpload'])
})
