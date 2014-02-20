angular.module('spreadsheetUpload', ['angularFileUpload'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }])
  .controller('UploadCtrl', ['$scope', '$upload', function($scope, $upload) {
    $scope.onFileSelect = function($files) {
      for(var i = 0; i < $files.length; i++) {
        var file = $files[i]

        $scope.upload = $upload.upload({
          url: '/batches',
          data: {assembly: $scope.assembly},
          file: file
        })
      }
    }
  }])
