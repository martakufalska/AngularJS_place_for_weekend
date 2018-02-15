function wantToVisite (elem) {
    if(elem.checked == true &&  elem.parentElement.parentElement.style.background != 'grey'){
       elem.parentElement.parentElement.style.background = 'purple';
       } 
    else {
        if(elem.parentElement.parentElement.style.background != 'grey')
            elem.parentElement.parentElement.style.background = 'white';
       }
    console.log("+");
   }

   function visited (elem) {
    if(elem.checked == true){
       elem.parentElement.parentElement.style.background = 'grey';
       } 
    else {
        if (elem.parentElement.previousSibling.previousSibling.children[0].checked) {
            elem.parentElement.parentElement.style.background = 'purple';
        }
        else {
            elem.parentElement.parentElement.style.background = 'white';
        }
       }
    console.log("+");
   }
