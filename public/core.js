var scotchTodo = angular.module('leopard', []);

function mainController($scope, $http, $timeout) {
    var baseURL = "http://localhost:3000";
    $scope.colours = false;
    $scope.vinylClosed = false;
    $scope.vinylFlipped = false;
    $scope.soundcloud = {};
    $scope.download = {};
    $scope.vinylHidden = {
        'display': 'block'
    }
    $scope.buttonHidden = {
        'visibility': 'hidden'
    };

    // when submitting the add form send the text to the node api
    $scope.resolveSoundcloud = function () {
        var url = baseURL + "/resolve?url=" + $scope.soundcloud.url;

        // start colours
        $scope.colours = true;

        $http.get(url)
            .success(function (download) {
                stopDisk();
                $scope.soundcloud.url = "";
                $scope.download.url = baseURL + download.uri;
                $scope.download.uri = download.uri;
                console.log($scope.download.url);

                // close vinyl
                showBack();

            })
            .error(function (err) {

                $scope.soundcloud.url = "";
                $scope.download.err = err.desc;
                console.log('Error: ' + $scope.download.err);

                // close vinyl
                showBack();

            });
    }

    $scope.urlChanged = function () {
        // validate url
        var url = $scope.soundcloud.url;
        if (url.indexOf("soundcloud.com/") === -1 || (url.indexOf("http") == -1 && url.indexOf("www.") == -1)) return $scope.buttonHidden = {
            'visibility': 'hidden'
        };

        // show button
        $scope.buttonHidden = {
            'visibility': 'block'
        };
    }

    // flips the vinyl
    function flipVinyl() {
        $scope.vinylFlipped = !$scope.vinylFlipped;
        console.log("[flipping vinyl]");
    }

    function showBack() {
        $scope.vinylClosed = true;
        $timeout(function () {
            $scope.vinylHidden = {
                'display': 'none'
            }
            $scope.colours = false;
            flipVinyl();
        }, 1500);
    }
}