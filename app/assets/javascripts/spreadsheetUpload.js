angular.module('spreadsheetUpload', ['angularFileUpload'])
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
