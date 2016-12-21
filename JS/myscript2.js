(function() {
  var appsListItems = document.querySelectorAll('#appListbox > li');
  var keys = {
     tab:    9,
     enter:  13,
     esc:    27,
     space:  32,
     left:   37,
     up:     38,
     right:  39,
     down:   40,
     alt: 18,
	 shift: 16
   };
   var currentIndex;

   var gotoIndex = function(idx) {
	   
     if (idx == appsListItems.length) {
       idx = 0;   
     } else if (idx < 0) {
       idx = appsListItems.length - 1;
     }
     appsListItems[idx].focus();
     currentIndex = idx;
	 var optionArray = appsListItems;
	 changeAttributes(appsListItems[idx], optionArray);
   };
   Array.prototype.forEach.call(appsListItems, function(el, i){

     if ($(el).hasClass("selected")) {
       el.setAttribute('tabindex', '0');
       el.setAttribute('aria-selected', 'true');
       el.addEventListener("focus", function() {
         currentIndex = 0;
       });
     } else {
       el.setAttribute('tabindex', '-1');
       el.setAttribute('aria-selected', 'false');
       el.classList.remove("selected");
	 
     }
     el.addEventListener("keydown", function(event) {
         switch (event.keyCode) { // switch for all keyPress events when a user is navigating the listbox
           
		   case event.shiftKey && keys.tab:
			$('#appListbox').toggle('slow');
			
			tabMoveFocusBackward();
			
			 break;
		   case keys.tab:
		      $('#appListbox').toggle('slow');
			  tabMoveFocusForward();
             break;
           case keys.right:
             gotoIndex(currentIndex + 1);
			 break;
           case keys.left:
             gotoIndex(currentIndex - 1);
             break;
           case keys.esc:
             $('#appListbox').toggle('slow');
			 $('#arrow').attr('src','Images/down.png');
			 $('#btnFrequency').focus();
             break;
           case keys.down:
              gotoIndex(currentIndex + 1);
             break;
           case keys.up:
              gotoIndex(currentIndex - 1);
             break;
           case keys.enter:
              $('#txtPlaceholder').text((this.innerText).replace('selected', ''));
              $('#option-selected').text(this.innerText + " selected");
              $('#appListbox').find('li').children().remove('span');
              $('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
              $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
              $(this).append("<span class='visuallyhidden'> selected </span>");
              togglePressed();
              changeCategory();
             break;
           case keys.space:
             break;
         }
         event.preventDefault();
         event.stopPropagation();
       });
  });

  $('#appListbox').hide();

  function togglePressed() {
    $('#btnFrequency').attr("aria-pressed", function(i, value){
      return value === "true" ? "false" : "true";
    });
  }

 
  
  function changeAttributes(appsListItems, optionArray) {
	
	Array.prototype.forEach.call(optionArray, function(el, i){
		
			el.setAttribute('tabindex', '-1');
			el.setAttribute('aria-selected', 'false');
			el.classList.remove("change");
		
		 
	});
	$(appsListItems).addClass('change');
	
	Array.prototype.forEach.call(optionArray, function(el, i){ // dynamically updating values for currently focused listbox option
			if ($(el).hasClass("change")) {
			el.setAttribute('tabindex', '0');
			el.setAttribute('aria-selected', 'true');
		} else { // removing classes and adding tabindex="-1" and aria-selected="false" to options that do not have focus
			el.setAttribute('tabindex', '-1');
			el.setAttribute('aria-selected', 'false');
			el.classList.remove("change");
		}
		});
		
  }

  $('#btnFrequency').on('click', function(e){
    $('#appListbox').toggle('slow');
    $('#appListbox').find(".selected" ).focus();
    togglePressed();
  });

  $('#btnFrequency').on('keydown', function(event, e){
	  
	  switch (event.keyCode) { // switch for opening listbox using enter/alt+down/space
		  case keys.enter:
		  case event.altKey && keys.down:
			  $('#appListbox').toggle('slow');
			  $('#arrow').attr('src','IMAGES/up.png');
			  $('#appListbox').find(".selected" ).focus();
			  togglePressed();
			  break; 
		  case keys.space:
			  var event = jQuery.Event('keypress');
		      event.which = 32; 
			  event.keyCode = 32; //keycode to trigger this for simulating enter
			  jQuery(this).trigger(event); 
			  $('#appListbox').toggle('slow');
			  $('#arrow').attr('src','IMAGES/up.png');
			  $('#appListbox').find(".selected" ).focus();
			  togglePressed();
			  break;
	
			}
	
  });
  
  
  jQuery.extend(jQuery.expr[':'], {
    focusable: function(el, index, selector){
		return $(el).is('a, button, :input, [tabindex=0]');
    }
});

  var tabMoveFocusForward = function() {
			 $("#accountNumber").focus(); // moving focus to next focusable element
			 togglePressed();
			 $('#arrow').attr('src','Images/down.png');
			 
  }
  
   var tabMoveFocusBackward = function() {
			 $("#informationLink").focus(); // moving focus to previous focusable element
			 togglePressed();
			 $('#arrow').attr('src','Images/down.png');
   }
  

  var changeCategory = function(e){
    $('#appListbox').toggle('slow');
	$('#arrow').attr('src','Images/down.png');
    $('#btnFrequency').focus();
  }

  $("li").on('click', function(e){
    $('#appListbox').find('.selected').children().remove('span');
    $('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
    $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
    $('#txtPlaceholder').text((this.innerText).replace('selected', ''));
    $('#option-selected').text(this.innerText + " selected");
    $(this).append("<span class='visuallyhidden'> selected </span>");
    togglePressed();
    changeCategory();
  });

})()
