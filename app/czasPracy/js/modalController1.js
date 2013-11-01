modalCtrl = function($scope, $http, $filter) {
    
    $scope.editable={typ:1,zakres:"pp"};
    $scope.wybranyTyp="praca";
    $scope.typy=["praca","wypoczynek","nudy","wysiłek"];
    selected=null;
    
    $scope.pozycje=[];  
    for(i=0; i<10; i++){
        $scope.pozycje.push({typ:"wypoczynek",zakres:'a'+i});
    }
    
    $scope.mode="dupa";
    
    $scope.edit=function(item){
        $scope.editable=item;
        $scope.mode="edit";
    }
    
    $scope.add=function(item){
        $scope.editable={typ:"praca",zakres:"",x:"new"};
        $scope.mode="edit";
    }
    
    $scope.submit=function(){
        if($scope.editable.x=="new"){
            $scope.editable.x=undefined;
            $scope.pozycje.push($scope.editable);
            $scope.mode="zapisano";
            $scope.editable=undefined;
            return;
        }
        $scope.editable=undefined;
        $scope.mode="zapisano";
    }
    
    $scope.remove=function(item){
        for(i in $scope.pozycje){
            if($scope.pozycje[i]==item) {
                $scope.pozycje.splice(i,1);
                return;
            }
        }
    }
    
};

app.controller('ModalCtrl', modalCtrl);