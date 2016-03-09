var scotchTodo = angular.module('leopard', []);

function mainController($scope, $http, $timeout, $location, $window) {
    var settings = {
        gifDuration: 3000
        , animationDelay: 800
    }
    var downloadStatus = 0;
    $scope.hideMenu = false;
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

        // clear vars
        clearState();

        var url = "/resolve?url=" + $scope.soundcloud.url;

        // start GIF
        startGIF();
        $scope.soundcloud.url = "loading...";

        $http.get(url)
            .success(function (download) {
                $scope.download.uri = download.uri;
                $scope.download.artist = download.artist;
                $scope.download.title = download.title;
                console.log('URL: ' + $scope.download.uri);
                // close vinyl
                stopGIF();

            })
            .error(function (err) {
                $scope.download.err = err.desc;
                console.log('Error: ' + $scope.download.err);

                // close vinyl
                stopGIF();

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

        // download mp3
        $window.open($scope.download.uri, "_self");
    }

    function startGIF() {
        $scope.colours = true;
        $timeout(function () {
            stopGIF();
        }, settings.gifDuration);
    }

    function stopGIF() {
        if (downloadStatus < 1) return downloadStatus++;

        showBack();
    }

    function showBack() {
        if ($scope.download.err != null) {
            console.log("fail");
            $scope.soundcloud.url = "stream not found...";


            // clear var
            $scope.colours = false;

            return;
        }
        $scope.hideMenu = true;
        $scope.vinylClosed = true;
        $timeout(function () {
            $scope.soundcloud.url = "";
            $scope.vinylHidden = {
                'display': 'none'
            }
            $scope.colours = false;
            flipVinyl();
        }, 1000 + settings.animationDelay);
    }

    function clearState() {
        downloadStatus = 0;
        $scope.hideMenu = false;
        $scope.colours = false;
        $scope.vinylClosed = false;
        $scope.vinylFlipped = false;
        $scope.download = {};
        $scope.vinylHidden = {
            'display': 'block'
        }
    }
}