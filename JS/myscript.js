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
           case keys.tab:
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

  $('button').click(function (e){
    $(this).children('.drop-title').children('span:nth-child(2)').text(function(i, text){
      return text === "collapsed" ? "expanded" : "collapsed";
    });
    $(this).children('.drop-icon').children('i').toggleClass('dropdown-chevron-down dropdown-chevron-up');

    $('#appListbox').toggle('slow');
    $('#appListbox').find(".active" ).focus();
  });

  var changeCategory = function(option){
    var name = option.split("-")[0];
    $("#cName").text(name);
    $('#appListbox').toggle('slow');
    $('button').children('.drop-title').children('span:nth-child(2)').text(function(i, text){
      return text === "collapsed" ? "expanded" : "collapsed";
    });
    $('button').children('.drop-title').children('span:nth-child(1)').text( name + " selected, ");

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

})()
