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
     down:   40
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
         switch (event.keyCode) {
           case keys.tab:
             break;
           case keys.right:
             gotoIndex(currentIndex + 1);
             break;
           case keys.left:
             gotoIndex(currentIndex - 1);
             break;
           case keys.esc:
             $('#btnFrequency').click();
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
              $('#appListbox').find('.selected').children().remove('span');
              $('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
              $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
              $(this).append("<span class='visuallyhidden'>selected</span>");
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

  $('#btnFrequency').on('click', function(e){
    $('#appListbox').toggle('slow');
    $('#appListbox').find(".selected" ).focus();
  });

  $('#btnFrequency').on('keydown', function(e){
    if(e.keyCode === keys.down || e.keyCode === keys.enter || e.keyCode === keys.space){
      $('#appListbox').toggle('slow');
      $('#appListbox').find(".selected" ).focus();
    }
  });

  var changeCategory = function(e){
    $('#appListbox').toggle('slow');
    $('#btnFrequency').focus();
  }

  $("li").on('click', function(e){
    $('#appListbox').find('.selected').children().remove('span');
    $('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
    $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
    $('#txtPlaceholder').text((this.innerText).replace('selected', ''));
    $('#option-selected').text(this.innerText + " selected");
    $(this).append("<span class='visuallyhidden'>selected</span>");
    changeCategory();
  });

})()
