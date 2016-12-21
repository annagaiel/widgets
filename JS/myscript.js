(function() {
  var appsListItems = document.querySelectorAll('#appListbox > li > a');
  var keys = {
     tab:    9,
     enter:  13,
     esc:    27,
     space:  32,
     left:   37,
     up:     38,
     right:  39,
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
           break;
           case keys.tab:
             $('#appListbox').toggle('slow');
             $('button').children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');
             tabMoveFocusForward();
             break;
           case keys.right:
             gotoIndex(currentIndex + 1);
             break;
           case keys.left:
             gotoIndex(currentIndex - 1);
             break;
           case keys.esc:
             $('button').click();
             break;
           case keys.down:
              gotoIndex(currentIndex + 1);
             break;
           case keys.up:
              gotoIndex(currentIndex - 1);
             break;
           case keys.enter:
             $('#appListbox').find('.active').children().remove('span');
             $('#appListbox').find('.active').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('active');
             $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('active');
             $(this).append("<span class='ui-hidden-accessible'> - You are here</span>");
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
    $('button').focus();
  }

  $("a").on('click', function(e){
    $('#appListbox').find('.active').children().remove('span');
    $('#appListbox').find('.active').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('active');
    $(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('active');
    $(this).append("<span class='ui-hidden-accessible'> - You are here</span>");
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
      var $canfocus = $(':focusable');
      var index = $canfocus.index(this) + 1;
      if (index >= $canfocus.length) {
        index = 0;
        $canfocus.eq(index).focus();
      }
  }

})()
