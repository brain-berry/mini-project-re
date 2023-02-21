// Get the modal
var qrmodal = document.getElementById("myqrModal");

// Get the button that opens the modal
var mbtn = document.getElementById("modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
mbtn.onclick = function() {
   qrmodal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   qrmodal.style.display = "none";
 }


 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if(event.target == qrmodal){
     qrmodal.style.display = "none";
   }
 }

 $(document).ready(function(){

    //create data
      $('.form1').on('submit', function(){
    
          var name = $('.form1 #name');
          var studID = $('.form1 #studID');
          var email = $('.form1 #email');
          var phone = $('.form1 #phone');
          var studData = {studentName: name.val(), studentID: studID.val(), email: email.val(), phone: phone.val()};
    
          $.ajax({
            type: 'POST',
            url: '/home',
            data: studData,
            success: function(data){
              //do something with the data via front-end framework
              location.reload();
            }
          });
    
          return false;
    
      });
    
});
    