    /* =========================================
       CONNEXION
       ========================================= */
/*
Cas 2 : Ajouter une page de connexion 
*/
window.onload = function(){
    let myForm = document.getElementById("formulaire");

    myForm.addEventListener("submit",function(event){  
        event.preventDefault();   
        window.location.replace("tron_-_v2.html");

    });

}