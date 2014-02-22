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

        $scope.batchID = data.id
        $scope.uploaded = true
      })
    }
  }])
  .controller('ShowCtrl', ['$scope', function($scope) {
    $scope.selected = []

    var updateSelected = function(action, id) {
      if (action === 'add' && $scope.selected.indexOf(id) === -1) {
        $scope.selected.push(id)
      }

      if (action === 'remove' && $scope.selected.indexOf(id) !== -1) {
        $scope.selected.splice($scope.selected.indexOf(id), 1)
      }

      $scope.selectedURLFormat = '?'

      for (var i = 0; i < $scope.selected.length; i++) {
        $scope.selectedURLFormat += 'id[]=' + $scope.selected[i]

        if(i !== ($scope.selected.length - 1)) {
          $scope.selectedURLFormat += '&'
        }
      }
    }

    $scope.updateSelection = function(checked, id) {
      var action = (checked ? 'add' : 'remove')

      updateSelected(action, id)
    }

    $scope.isSelected = function(id) {
      return $scope.selected.indexOf(id) >= 0
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
