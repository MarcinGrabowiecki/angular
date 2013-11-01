var app = angular.module('plunker', ['ngAnimate']);

app.controller('MainCtrl', function($scope, $http, $filter) {
    $scope.status = 'Idle...';
    $scope.data = [];
    $scope.startPlanuPracy = '01-07-2013';
    $scope.koniecPlanuPracy = '31-07-2013';
    $scope.kierownik;
    $scope.kierownicy = [];
    $scope.skroty = [];
    $scope.planyPracy = [];
    
    //pobierz kierownikow przez REST
    $http({
      method: 'GET',
      url: 'http://localhost:8080/HCM-Prezentacja/rest/czas_pracy/kierownicy'
        }).
            success(function(data, status, headers, config) {
                $scope.kierownicy = data;
                $scope.kierownik = data[0];
                $scope.status = "Pobrano listę kierowników";
        }).
            error(function(data, status, headers, config) {
                $scope.status = "Nieudane pobranie listy kierowników";
    });
    
    //pobierz skroty przez REST
    $http({
      method: 'GET',
      url: 'http://localhost:8080/HCM-Prezentacja/rest/czas_pracy/skroty'
        }).
            success(function(data, status, headers, config) {
                $scope.skroty = data;
        }).
            error(function(data, status, headers, config) {
                $scope.status = "Nieudane pobranie skrótów";
    });
    
    /**
     * Składa argumenty w jeden napis
     */
    $scope.label = function () {
        var napis = "";
        for(var id in arguments){
            napis += " " + arguments[id];
        }
        
        return napis;
    };
    
    $scope.pobierzPlanyPracy = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/HCM-Prezentacja/rest/czas_pracy/plan_pracy/' + $scope.startPlanuPracy + '/' + $scope.koniecPlanuPracy
            }).
                success(function(data, status, headers, config) {
                    zaladujListePracownikow(data);
                    $scope.status = "Pobrano i załadowano plan pracy";
            }).
                error(function(data, status, headers, config) {
                    $scope.status = "Nieudane pobranie planów pracy";
            });
    };

    function zaladujListePracownikow(dane){
        for(var pracownik in dane){
            var dniPracownika = [];
            var idDniaPracownika = 0;
            
            for (var dzien = stworzPoprawnaDate($scope.startPlanuPracy); dzien <= stworzPoprawnaDate($scope.koniecPlanuPracy); dzien.setDate(dzien.getDate() + 1)) {
                if(dane[pracownik].length > idDniaPracownika){
                    var dzienPracownika = dane[pracownik][idDniaPracownika].dzien;
                    if(dzienPracownika === Date.parse(dzien)){
                        var godzinyWDniu = $filter('date')(dane[pracownik][idDniaPracownika].startAktywnosci, 'HH:mm') + "-" + $filter('date')(dane[pracownik][idDniaPracownika].koniecAktywnosci, 'HH:mm');
                        dniPracownika.push({
                            typAktywnosci: dane[pracownik][idDniaPracownika].typAktywnosci,
                            kolor: 'lightblue',
                            data: dane[pracownik][idDniaPracownika].dzien,
                            godziny: godzinyWDniu,
                            ostatniePrawidloweGodziny: godzinyWDniu
                        });
                        idDniaPracownika++;
                    } else {
                        stworzPustaKomorke(dniPracownika, dzien);
                    }
                } else {
                    stworzPustaKomorke(dniPracownika, dzien);
                }
            }

        $scope.planyPracy.push({
                pracownik: pracownik,
                dni: dniPracownika
            });
        }
    }
    
    /**
     * Tworzy JavaScriptowy obiekt Date ze stringa w formacie dd-MM-yyyy
     * @param {type} data
     * @returns {Date}
     */
    function stworzPoprawnaDate(data){
        var regex = /(\d{2})-(\d{2})-(\d{4})/;
        var tablicaSkladowychDaty = regex.exec(data);
        return new Date(tablicaSkladowychDaty[3], tablicaSkladowychDaty[2] - 1, tablicaSkladowychDaty[1]);
    }
  
    function stworzPustaKomorke(tablicaKomorek, dzien){
        tablicaKomorek.push({
              typAktywnosci: "BRAK",
              kolor: 'white',
              data: dzien,
              godziny: "",
              ostatniePrawidloweGodziny: ""
            });
    }
    
    $scope.blur = function(komorka) {
        var skrot = czySkrot(komorka.godziny);
        if(skrot !== undefined){
            komorka.godziny = skrot.godziny;
            komorka.typAktywnosci = skrot.typAktywnosci;
        }
    };
    
    function czySkrot(wpisanaWartosc){
        for(var id in $scope.skroty){
            if($scope.skroty[id].klucz === wpisanaWartosc){
                return $scope.skroty[id];
            }
        }
    }

    $scope.change = function(field) {
        //skróty dla pp
//        if (field.val == 'q') field.val = "9:30-18:12";
//        if (field.val == 'w') field.val = "10:30-8:12";
//        if (field.val == 'e') field.val = "11:30-8:12";
//
//        field.val = field.val.replace(/[A-z]/, '');
//
//        field.status = validate(field.val);
//        console.log(validate(field.val));
    };
    
    $scope.otworzOknoSzczegolow=function(txt){
        //console.log(modal);
        //$scope.selectedRow=row;
        //$scope.selectedData=data;
        $('#myModal').modal('show')
    }
    
    $scope.modalOk=function(){
        console.log("zamknięto pomyślnie okno modalne");
    }
    
    $scope.test1="pppppppppp";
    $scope.modalCancel=function(){
        console.log("zamknięto niepomyślnie okno modalne");
        alert("ha");
    }


});

