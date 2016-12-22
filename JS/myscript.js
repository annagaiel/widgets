(function() {
  var appsListItems = document.querySelectorAll('#appListbox > li > a');
  var keys = {
     tab:    9,
     enter:  13,
     esc:    27,
     space:  32,
     up:     38,
     down:   40,
     alt:    18,
     shift:  16
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
     if ($(el).hasClass("active")) {
       el.setAttribute('tabindex', '0');
       el.setAttribute('aria-selected', 'true');
       el.addEventListener("focus", function() {
         currentIndex = 0;
       });
     } else {
       el.setAttribute('tabindex', '-1');
       el.setAttribute('aria-selected', 'false');
       el.classList.remove("active");
     }
     el.addEventListener("keydown", function(event) {
         switch (event.keyCode) {
           case event.shiftKey && keys.tab:
            $('#appListbox').toggle('slow');
            $('button').focus().children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');
			tabMoveFocusBackward();
           break;
           case keys.tab:
             $('#appListbox').toggle('slow');
             $('button').children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');
             tabMoveFocusForward();
             break;
           case keys.esc:
             $('#appListbox').toggle('slow');
			 $('#arrow').attr('src','IMAGES/down.png');
			 $('#categoryLbl').focus();
             break;
           case keys.down:
		    if (currentIndex == 5) {
				  
				  break;
			  }
              gotoIndex(currentIndex + 1);
             break;
           case keys.up:
		    if (currentIndex == 0) {
				  
				  break;
			  }
              gotoIndex(currentIndex - 1);
             break;
           case keys.enter:
             $('#appListbox').find('.active').children().remove('span');
             $('#appListbox').find('.active').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('active');
             $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('active');
             $(this).append("<span class='ui-hidden-accessible'> - You are here</span>");
			 $('a').removeAttr('aria-current');
              $(this).attr('aria-current', 'true');
              changeCategory(this.innerText);
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
    $('button').attr("aria-pressed", function(i, value){
      return value === "true" ? "false" : "true";
    }).attr("aria-expanded", function(i, value){
      return value === "true" ? "false" : "true";
    });
    var placeholder = $("#placeholderTxt").text();
    $('button').attr("aria-label", 'Category ' + placeholder);
  }

  $('button').click(function (e){
    togglePressed();
    $(this).children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');
    $('#appListbox').toggle('slow');
    $('#appListbox').find(".active" ).focus();
  });

  var changeCategory = function(option){
    var name = option.split("-")[0];
    $("#cName").text(name);
    $("#placeholderTxt").text(name);
    $('#appListbox').toggle('slow');
    togglePressed();
    $('button').children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');
    $('.filterTxt').focus();
  }

  $("a").on('click', function(e){
    $('#appListbox').find('.active').children().remove('span');
    $('#appListbox').find('.active').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('active');
    $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('active');
    $(this).append("<span class='ui-hidden-accessible'> - You are here</span>");
	$('a').removeAttr('aria-current');
    $(this).attr('aria-current', 'true');
    changeCategory(this.innerText);
  });

  $('button').on('keydown', function(event, e){
    switch (event.keyCode) {
      case (event.altKey && keys.down) || keys.down:
        $('button').click();
        break;
    }
  });

  var tabMoveFocusForward = function(e) {
    $("#cardNumber").focus(); // moving focus to next focusable element
			 togglePressed();
			 $('#arrow').attr('src','IMAGES/down.png');
  }
  
   var tabMoveFocusBackward = function() {
			 $("#fullName").focus(); // moving focus to previous focusable element
			 togglePressed();
			 $('#arrow').attr('src','IMAGES/down.png');
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

})()
