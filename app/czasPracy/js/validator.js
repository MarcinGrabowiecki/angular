function validate(text){

    var v=text;
    
    try{
      var v1=v.split('-');
      var v2=v1[0].split(':');
      var v3=v1[1].split(':');
      console.log(v2);
      console.log(v3);
      
      if(v2[0]>24) {
        return "invalid";
      }
      
      if(v2[1]>59) {
        return "invalid";
      }
      
       if(v3[0]>24||!v3[0]>1) {
        return "invalid";
      }
      
      if(v3[1]>59||!v3[1]>1) {
        return "invalid";
      }
      
      if(v2[0]+(v2[1]*60)>v3[0]+(v3[1]*60)) {
        return "invalid";
      }
      
      
    }catch(e){
      return "invalid";
    }
    return "valid";
    
}