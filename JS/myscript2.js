(function() {
	var letterLog = "";
	var count = 0;
	var appsListItems = document.querySelectorAll('#appListbox > li > a');
	var keys = {
		tab: 9,
		enter: 13,
		esc: 27,
		space: 32,
		up: 38,
		down: 40,
		alt: 18,
		shift: 16,
		pageUp: 33,
		pageDown: 34,
		home: 36,
		end: 35
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
	Array.prototype.forEach.call(appsListItems, function(el, i) {
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
			el.removeAttribute("aria-current");
		}
		el.addEventListener("keydown", function(event) {
			var textArray = $("li a").map(function() {
				return $(this).text();
			}).get();
			var firstKey = (event.which),
				firstLetterKey = (String.fromCharCode(event.which)),
				letterArray = [];
				
			if (firstKey >= 65 && event.keyCode <= 90) {
				for (var i = 0; i < textArray.length; i++) {
					var letter = textArray[i].charAt(0);
					letterArray.push(letter);
				}
				var arrayIndexCheck = letterArray.indexOf(firstLetterKey), target = firstLetterKey;
				
				var numOccurences = $.grep(letterArray, function(elem) {
					return elem === target;
				}).length;
				var totalOccurences = numOccurences - 1;
				if (letterLog != firstLetterKey) {
					if (jQuery.inArray(firstLetterKey, letterArray) != -1) {
						gotoIndex(arrayIndexCheck);
						letterLog = firstLetterKey;
					} 
				} else {
					if (count >= totalOccurences) {
						gotoIndex(arrayIndexCheck);
						count = 0;
					} else {
						gotoIndex(currentIndex + 1);
						count++;
					}
				}
			}
			var listboxOptionsNum = appsListItems.length - 1;
			switch (event.keyCode) { // switch for all keyPress events when a user is navigating the listbox
				case keys.enter:
				case event.altKey && keys.up:
					$('#txtPlaceholder').text((this.innerText).replace('selected', ''));
					$('#option-selected').text(this.innerText + " selected");
					$('#appListbox').find('a').children().remove('span');
					$('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
					$(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
					$('#appListbox a').removeAttr('aria-current');
					$(this).attr('aria-current', 'true');
					togglePressed();
					changeCategory();
					break;
				case event.shiftKey && keys.tab:
					$('#appListbox').toggle('slow');
					tabMoveFocusBackward();
					break;
				case keys.tab:
					$('#appListbox').toggle('slow');
					tabMoveFocusForward();
					break;
				case keys.esc:
					$('#appListbox').toggle('slow');
					$('#arrow').attr('src', 'IMAGES/down.png');
					$('#btnFrequency').focus();
					togglePressed();
					break;
				case keys.down:
					if (currentIndex == listboxOptionsNum) {
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
				case keys.home:
					gotoIndex(0);
					break;
				case keys.end:
					gotoIndex(listboxOptionsNum);
					break;
				case keys.pageUp:
					if (currentIndex == 0 || currentIndex == 1) {
						gotoIndex(0);
						break;
					}
					gotoIndex(currentIndex - 2);
					break;
				case keys.pageDown:
					if (currentIndex == listboxOptionsNum || currentIndex == 4) {
						gotoIndex(listboxOptionsNum);
						break;
					}
					gotoIndex(currentIndex + 2);
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
		$('#btnFrequency').attr("aria-pressed", function(i, value) {
			return value === "true" ? "false" : "true";
		});
		$('#btnFrequency').attr("aria-expanded", function(i, value) {
			return value === "true" ? "false" : "true";
		});
	}

	function changeAttributes(appsListItems, optionArray) {
		Array.prototype.forEach.call(optionArray, function(el, i) {
			el.setAttribute('tabindex', '-1');
			el.setAttribute('aria-selected', 'false');
			el.classList.remove("change");
		});
		$(appsListItems).addClass('change');
		Array.prototype.forEach.call(optionArray, function(el, i) { // dynamically updating values for currently focused listbox option
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
	$('#btnFrequency').on('click', function(e) {
		$('#appListbox').toggle('slow');
		$('#appListbox').find(".selected").focus();
		togglePressed();
		var up = "IMAGES/up.png",
			down = "IMAGES/down.png";
		if ($('#arrow').attr('src') === up) {
			$('#arrow').attr('src', down);
		} else {
			$('#arrow').attr('src', up)
		}
	});
	$('#btnFrequency').on('keydown', function(event, e) {
		switch (event.keyCode) { // switch for opening listbox using enter/alt+down/space
			case keys.enter:
			case event.altKey && keys.down:
			
				$('#appListbox').toggle('slow');
				$('#arrow').attr('src', 'IMAGES/up.png');
				$('#appListbox').find(".selected").focus();
				togglePressed();
				break;
				case keys.down:
				$('#appListbox').toggle('slow');
				$('#arrow').attr('src', 'IMAGES/up.png');
				$('#appListbox').find(".selected").focus();
				togglePressed();
				gotoIndex(currentIndex + 1);
				break;
			case keys.space:
				var event = jQuery.Event('keypress');
				event.which = 32;
				event.keyCode = 32; //keycode to trigger this for simulating enter
				jQuery(this).trigger(event);
				$('#appListbox').toggle('slow');
				$('#arrow').attr('src', 'IMAGES/up.png');
				$('#appListbox').find(".selected").focus();
				togglePressed();
				break;
		}
	});
	var tabMoveFocusForward = function() { // moving focus to next focusable element
		$("#accountNumber").focus();
		resetAfterTabOut();
		togglePressed();
		$('#arrow').attr('src', 'IMAGES/down.png');
	}
	var tabMoveFocusBackward = function() { // moving focus to previous focusable element
		$("#informationLink").focus();
		resetAfterTabOut();
		togglePressed();
		$('#arrow').attr('src', 'IMAGES/down.png');
	}
	var resetAfterTabOut = function() {
		$('#appListbox').find('.change').attr('tabindex', '-1').attr('aria-selected', 'false');
		$('#appListbox').find('.selected').attr('tabindex', '0').attr('aria-current', 'true').attr('aria-selected', 'true');
	}
	var changeCategory = function(e) {
		$('#appListbox').toggle('slow');
		$('#arrow').attr('src', 'IMAGES/down.png');
		$('#btnFrequency').focus();
	}
	$("#appListbox a").on('click', function(e) {
		$('#appListbox').find('.selected').children().remove('span');
		$('#appListbox').find('.selected').attr('tabindex', '-1').attr('aria-selected', 'false').removeClass('selected');
		$(this).attr('tabindex', '0').attr('aria-selected', 'true').addClass('selected');
		$('#txtPlaceholder').text((this.innerText).replace('selected', ''));
		$('#option-selected').text(this.innerText + " selected");
		$('#appListbox a').removeAttr('aria-current');
		$(this).attr('aria-current', 'true');
		togglePressed();
		changeCategory();
	});
})()