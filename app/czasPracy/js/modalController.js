//kontroler okna modalnego
var ModalInstanceCtrl = function($scope, $modalInstance, items, row, data) {

    $scope.typyAktywnosci1 = {
        1: "praca", 2: "urlop", 3: "zwolnienie"
    };

    $scope.typyAktywnosci = ["praca", "urlop", "zwolnienie"];
    
    $scope.items = items;
    $scope.data= data;
    $scope.row = row;
    $scope.akcja = "cancel";
    
    $scope.remove = function(item) {
        $scope.akcja = "cancel";
        for (var i in $scope.items) {
            if (item === $scope.items[i]) {
                $scope.items.splice(i, 1);
                return;
            }
        }
    };

    $scope.add = function() {
        $scope.akcja = "edit";
        $scope.wybrany = {
            typ: "wybierz",
            zakres: "",
            new: true
        };
        
    };
    
    $scope.select = function(item) {
        $scope.edytowany = item;
        $scope.wybrany=JSON.parse(JSON.stringify(item));
        $scope.akcja = "edit";
    };

    $scope.save = function() {
        if($scope.wybrany.new) {
            $scope.items.push($scope.wybrany);
        } else {
            $scope.edytowany.zakres=$scope.wybrany.zakres;
            $scope.edytowany.typ=$scope.wybrany.typ;
            //$scope.edytowany = $scope.wybrany;
        }
        $scope.akcja = "cancel";
    };

    $scope.cancel = function() {
        $scope.wybrany = null;
        $scope.akcja = "cancel";
    };

    $scope.windowOk = function() {
        $modalInstance.close($scope.wybrany);
    };

    $scope.windowCancel = function() {
        $modalInstance.dismiss('cancel');
    };


};