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
        url: '/batches.json',
        data: {assembly: $scope.assembly},
        file: file
      }).success(function(data, status, headers, config) {
        $scope.resetForm()
      })
    }
  }])
  .directive('resetForm', function() {
    return {
      link: function(scope, element, attrs) {
        scope[attrs.resetForm] = function() {
          scope[attrs.name].$setPristine()
          element[0].reset()
        }
      }
    }
  })
