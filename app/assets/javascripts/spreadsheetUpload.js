angular.module('spreadsheetUpload', ['angularFileUpload'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }])
  .controller('UploadCtrl', ['$scope', '$upload', function($scope, $upload) {
    var file;

    $scope.onFileSelect = function($files) {
      file = $files[0]
    }

    $scope.submitForm = function() {
      $scope.upload = $upload.upload({
        url: '/batches',
        data: {assembly: $scope.assembly},
        file: file
      })
    }
  }])
