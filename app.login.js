$(document).ready(function() {

	$(".login_screen").on("touchstart mousedown", "button,.btnX", function(e) {
		e.preventDefault();
		_login_screen(this, e);
	});

	function _login_screen(o, e) {
		var sType = e.type;
		var sKeys;

		if (sType == "touchstart" || sType == "touchend" || sType == "mousedown" || sType == "mouseup") {
			e.preventDefault();
			e.stopImmediatePropagation();
			var sClick = o.name;
			var sEvener = sClick;
			_SoundPlayX(SoundTouch);
		} else if (sType == "keypress") {
			e.stopImmediatePropagation();
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
			}
		} else {
			// var sKeys = e.data.keys;
			var sEvener = e.which;
		}

		if ((sEvener == "8" && sType == "keydown") || sClick == "backspace") {
			e.preventDefault();
			_Backspace()
		} else if (/^[a-zA-Z0-9!@#$%^&*()_+-=[\]\\,./{}|<>?'\"]$/.test(sEvener)) {
			e.preventDefault();
			_SetValue(sEvener);

		} else if (sEvener == "32") {

		} else if (sEvener == "13" || sClick == "enter") {
			_enter("1")
		}

		function _Backspace() {
			$(".login_input").val("");
		}

		function _SetValue(e) {
			var $oInput = $(".login_input");
			$oInput.val($oInput.val() + e);
		}

		function _enter(e) {
			$(".login_screen").css("display", "none");
			$(".app-container-left,.app-container-right").css("display", "block");
			_Backspace()

			_SoundPlayX(SoundError);
			// _SoundPlayX(SoundScan);
		}

	}//_login_screen

}); 
