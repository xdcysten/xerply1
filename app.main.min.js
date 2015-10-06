/**
 * @author Administrator
 *
 */
$(document).ready(function() {

	$('.shoppingcart-list-body').niceScroll({
		cursorcolor : "rgba(0,0,0,0.2)",
		hidecursordelay : 500,
		horizrailenabled : false,
		enablekeyboard : false,
		cursorwidth : "8px"
	});

	$(".app-container").swipe({
		swipeStatus : function(event, phase, direction, distance, duration, fingers) {
			if ((phase == "end") && (direction == "left" || direction == "right")) {
				$(".app-container-left").toggleClass("hidden-xs hidden-sm");
				$(".app-container-right").toggleClass("hidden-xs hidden-sm");
				// alert("You swiped " + direction );

			}
		}
	});

	$(".app-container").on("click", ".product-row", function(e) {
		e.preventDefault();
		e.stopPropagation()

		$(this).addClass('select').siblings().removeClass("select");
		var select = $(".product-row.select");
		$('.shoppingcart-list-body').animate({
			scrollTop : $('.shoppingcart-list-body').scrollTop() + select.position().top
		}, 'fast');
	});
	$(".app-container-left ,.app-container-right ").on("touchstart mousedown", "button,.btnX ", function(e) {
		_app_main(this, e);
	});

	$("#app-header").on("touchstart mousedown", "a,button,.btnX ", function(e) {
		_app_main(this, e);
	});

	$(document).on("keypress keydown", function(e) {
		// _AppHotkeyHandler(e);
		_app_main(this, e);
	});

	function _app_main(o, e) {
		var sType = e.type;
		var sKeys;

		if (sType == "touchstart" || sType == "touchend" || sType == "mousedown" || sType == "mouseup") {
			e.preventDefault();
			e.stopImmediatePropagation();
			var sClick = o.name.toLowerCase();
			var sEvener = sClick;

			if (/^[a-zA-Z0-9!@#$%^&*()_+-=[\]\\,./{}|<>?'\"]$/.test(sClick)) {
				if (/^=$/.test(sClick)) {
					e.preventDefault();
					var sEvener = "+";
				} else {
					var sEvener = sClick;
				}
				e.preventDefault();
				_SetValue(sEvener);
				_SoundPlayX(SoundTouch);
				return false;
			}
			_SoundPlayX(SoundTouch);

		} else if (sType == "keypress") {
			if (e.ctrlKey || e.altKey) {
				return false;
			}
			var sChar = String.fromCharCode(e.which);
			if (/^[a-zA-Z0-9!@#$%^&*()_+-=[\]\\,./{}|<>?'\"]$/.test(sChar)) {
				if (/^=$/.test(sChar)) {
					e.preventDefault();
					var sEvener = "+";
				} else {
					var sEvener = sChar;
				}
				e.preventDefault();
				_SetValue(sEvener);
				return false;
			}
		} else {
			// var sKeys = e.data.keys;
			var sEvener = e.which;
			var keyChar = String.fromCharCode(sEvener);
			(/^[a-zA-Z0-9!@#$%^&*()_+-=[\]\\,./{}|<>?'\"]$/.test(keyChar)) ? 1 : 2
		}
		// e.preventDefault();
		// var keyCode = event.which;
		// var keyChar = String.fromCharCode(keyCode);
		// // Log the key captured in the event data.
		// console.log(event.type + " : " + keyChar + " (" + keyCode + ")");

		if (sClick == "go_left" || sClick == "go_right") {
			_LeftOrRight(e);
		} else if (sClick == "fullscreen") {
			_Fullscreen();

		} else if (_FuncKeys("backspace") || sClick == "backspace") {
			e.preventDefault();
			_Backspace();
		} else if (_FuncKeys("ctrl+x") || sClick == "tax_free") {
			e.preventDefault();
			_tax_free();
		} else if (_FuncKeys("ctrl+u") || sClick == "return") {
			e.preventDefault();
			_Return();
		} else if (_FuncKeys("up")) {
			e.preventDefault();
			_SelcetUp();
		} else if (_FuncKeys("down")) {
			e.preventDefault();
			_SelcetDown();
		} else if (sClick == "quantity") {
			e.preventDefault();
			var $oInput = $(".Scan_tab_input").text();
			_Quantity($oInput);
		} else if (sClick == "price") {
			e.preventDefault();
			var $oInput = $(".Scan_tab_input").text();
			_Price($oInput);
		} else if (sClick == "percent") {
			e.preventDefault();
			var $oInput = $(".Scan_tab_input").text();
			_Percent($oInput);
		} else if (_FuncKeys("del") || sClick == "delete") {
			e.preventDefault();
			_Delete(" ");
		} else if (sClick == "options") {
			// e.preventDefault();
			$('#options').modal('toggle');
			$('#Inventory_maintenance').modal('toggle').modal('toggle');
		} else if (_FuncKeys("enter") || sClick == "enter") {
			_Enter(e);
			_SoundPlayX(SoundScan);
		}

		function _SelcetUp(e) {
			var select = $(".product-row.select");
			if (select.prev().length > 0) {
				select.prev().addClass("select");
				select.removeClass("select");
				$('.shoppingcart-list-body').animate({
					scrollTop : $('.shoppingcart-list-body').scrollTop() + select.prev().position().top
				}, 'fast');
			} else {
				// select.next().addClass("select");
			}
		}

		function _SelcetDown(e) {
			var select = $(".product-row.select");
			if (select.next().length > 0) {
				select.next().addClass("select");
				select.removeClass("select");
				$('.shoppingcart-list-body').animate({
					scrollTop : $('.shoppingcart-list-body').scrollTop() + select.next().position().top
				}, 'fast');
			} else {
				// select.next().addClass("select");
			}
		}

		function _FuncKeys(keys) {
			var ctr = (e.ctrlKey) ? "ctrl+" : "";
			var alt = (e.altKey) ? "alt+" : "";
			var shift = (e.shiftKey) ? "shift+" : "";
			function _getKey(name) {
				var names = {
					'8' : 'backspace',
					'13' : 'enter',
					'20' : 'capslock',
					'27' : 'esc',
					'32' : 'space',
					'37' : 'left',
					'38' : 'up',
					'39' : 'right',
					'40' : 'down',
					'45' : 'ins',
					'46' : 'del',
					'else' : function() {
						return String.fromCharCode(name);
					}
				};
				return (names[name] || names['else']());
			}

			var key = _getKey(e.which);
			var keys = keys.toLowerCase();
			var eventKeys = ctr + alt + shift + key.toLowerCase();
			return eventKeys == keys;
		}

		function _Fullscreen() {

			e.preventDefault();
			// 阻止浏览器默认行为
			if (screenfull.isFullscreen) {

			} else {

			}

			if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {// current working methods
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
				$(".fi-fullscreen").removeClass('fi-fullscreen').addClass('fi-fullscreen_exit');
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
				$(".fi-fullscreen_exit").removeClass('fi-fullscreen_exit').addClass('fi-fullscreen');
			}

			return;

			if (screenfull.enabled) {
				var target = $('html')[0];
				// We can use `this` since we want the clicked element
				$('body').css({
					"opacity" : "0.9"
				});
				screenfull.toggle();
			}
		}

		function _LeftOrRight(e) {
			e.preventDefault();
			// 阻止浏览器默认行为
			$(".app-container-left").toggleClass("hidden-xs hidden-sm");
			$(".app-container-right").toggleClass("hidden-xs hidden-sm");
			_GetSelectItem();
		}

		function _Undo(e) {
			var $oInput = $(".Scan_tab_input");
			$oInput.text($oInput.text() + e);
		}

		function _Backspace(e) {
			$(".Scan_tab_input").empty();
		}

		function _SetValue(e) {
			var $oInput = $(".Scan_tab_input");
			$oInput.text($oInput.text() + e);
		}

		function _Delete(e) {
			var select = $(".product-row.select");
			if (select.prev().length > 0) {
				select.prev().addClass("select");
			} else {
				select.next().addClass("select");
			}
			select.remove();
			_GetSelectItem();
		}

		function _Enter(e) {
			e.preventDefault();
			var $oInput = $(".Scan_tab_input").text();

			if (/^-?\d*\.?\d*\*$|^\*-?\d*\.?\d*$/.test($oInput)) {
				_Quantity($oInput.replace("*", ""));
			} else if (/^-?\d*\.?\d*\/$/.test($oInput)) {
				_Price($oInput.replace("/", ""));
			} else if (/^-?\d*\.?\d*\/\/$/.test($oInput)) {
				_Percent($oInput.replace("//", ""));
			} else {
				_AddItem();
			}
		}

		function _tax_free(e) {
			var edit_row = $(".product-row.select .edit");
			var select = $('.product-row.select .tax_free');

			if (select.is(':empty')) {
				select.append('&nbsp<i class="fi-tag"></i>&nbsp');
			} else {
				select.empty();
			}

		}

		function _Return(e) {
			var quantity = $(".product-row.select .product-quantity");
			var edit_row = $(".product-row.select .edit");
			var select = $('.product-row.select .return');

			quantity.text(0 - quantity.text());

			if (select.is(':empty')) {
				select.append('&nbsp<i class="fi-assignment_return"></i>&nbsp');
			} else {
				select.empty();
			}

		}

		function _Quantity(e) {
			if (!isNaN(e)) {
				var select = $(".product-row.select .product-quantity");
				(e) ? select.text(e) : false;
			}
			_GetSelectItem();
			_Backspace();
		}

		function _Price(e) {
			if (!isNaN(e)) {
				var select = $(".product-row.select .price");
				(e) ? select.text(_Num2Price(e)) : false;
			}
			_GetSelectItem();
			_Backspace();
		}

		function _Percent(e) {
			var edit_row = $(".product-row.select .edit");
			var select = $('.product-row.select .percent');
			if (!isNaN(e)) {
				if (Number(e) > 0) {
					if (select.is(':empty')) {
						select.append('&nbsp<span></span>&nbsp').find('span').text('-'+e + '%');
					} else {
						select.find('span').text('-'+e + '%');
					}
				} else {
					select.empty();
				}
			}

			_GetSelectItem();
			_Backspace();
		}

		function _GetSelectItem() {
			var select = $(".product-row.select");
			$('.shoppingcart-list-body').animate({
				scrollTop : $('.shoppingcart-list-body').scrollTop() + select.position().top
			}, 'fast');
		}

		function _AddItem() {
			var product_row = $('<div class="product-row row select"></div>');

			var product_quantity_value = _Random(1, 22);
			var barcode_value = _Random(10000000000, 1000000000001);
			var price_value = _Random(1, 22) + '.' + _Random(10, 99);
			var product_subtotal_value = (product_quantity_value * price_value).toFixed(2);

			// product_row
			var product_info = $('<div class="product-info col-xs-8"></div>');
			var product_quantity = $('<div class="product-quantity col-xs-2 text-center">' + product_quantity_value + '</div>');
			var product_subtotal = $('<div class="product-subtotal col-xs-2 text-right"><div class="subtotal">' + product_subtotal_value + '</div></div>');

			// product_info
			var basic_info = $('<div class="basic_info  hidden-xs hidden-sm"></div>');
			var edit = $('<div class="edit text-capitalize"></div>');
			var descripcion = $('<div class="descripcion text-capitalize">sparkling ice water</div>');

			// edit
			var tax_free = $('<span class="tax_free"></span>');
			var _return = $('<span class="return"></span>');
			var percent = $('<span class="percent"></span>');

			// basic_info
			var barcode = $('<span class="barcode">' + barcode_value + '</span>');
			var bulk_uni = $('<span class="bulk_uni"> @ </span>');
			var price = $('<span class="price">' + price_value + '</span>');

			basic_info.append(barcode, bulk_uni, price);
			edit.append(tax_free, _return, percent);
			product_info.append(basic_info, descripcion, edit);
			product_row.append(product_info, product_quantity, product_subtotal);

			$(".product-row").removeClass("select");
			$(".shoppingcart-list-body").append(product_row);
			_GetSelectItem();
			_Backspace();

		}

	}//_Scan_tab_content

});

function toggleFullScreen() {
	if (!document.fullscreenElement && // alternative standard method
	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {// current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}
