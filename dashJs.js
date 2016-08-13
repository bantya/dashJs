// https://scotch.io/tutorials/how-to-build-a-wordpress-plugin-part-1
// https://github.com/winjs/winstrap/blob/master/src/scss/win/_grid.scss

// TODO: each, map(), first(), last(), next(), prev(), parent(), children(all = false), nth(), get(), blur(), focus(), offset(), dim(), remove(), empty(), scrollLeft(), scrollTop(), append(), prepend(), appendTo(), prependTo(), before(), after(), insertBefore(), insertAfter(), replaceBy(), detach(), aug(), doc(), viewport(), firstChild(), lastChild(), isAncestor(), create(), parents(), closest(), siblings(), width(), height(), 1208

(function (window, undefined) {
	var evtListArr = ["click", "contextmenu", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseout", "mouseup", "keydown", "keypress", "keyup", "abort", "beforeunload", "error", "hashchange", "load", "pageshow", "pagehide", "resize", "scroll", "unload", "blur", "change", "focus", "focusin", "focusout", "input", "invalid", "reset", "search", "select", "submit", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "copy", "cut", "paste", "afterprint", "beforeprint", "abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting", "animationend", "animationiteration", "animationstart", "transitionend", "error", "message", "open", "message", "online", "offline", "popstate", "show", "storage", "toggle", "wheel"];

	function _ (obj, context) {
		return new dash (obj, context);
	}

	function dash (obj, context) {
		if (this === window) return new dash(obj);

		// if(!obj || obj === "" || dash.typeOf(obj) === "string" && obj.trim() === "") {
		// 	this.length = 0;
		// 	return this;
		// }

		var type = dash.typeOf,
			ele;

		// if (obj.nodeType) {
		// 	this.context = this[0] = obj;
		// 	this.length = 1;
		// 	return this;
		// }

		// context = (type (context) === "string") ? context = document.querySelector(context) : document;

		this.selector = obj;
		this.context = context;

		if (type (obj) === "string") {
			// ele = context.querySelectorAll(obj);
			this.el = document.getElementById(obj);
		} else if (type (obj) === "array" && obj.nodeType !== "undefined" && obj.nodeType === 1) {
			// ele = obj;
			this.el = obj;
		} else {
			// ele = [obj];
			this.el = [obj];
		}

		// for (var i = 0; i < ele.length; i++) {
		//  this[i] = ele[i];
		// }

		// this.length = ele.length;

		// this._css = this.el.style;
	}

	dash.pr = dash.prototype = {
		/*-- setting constructor as dash object --*/
		constructor: dash
	}

/*--
	typeOf static method
--*/

	dash.typeOf = function (obj) {
		var type = typeof obj;
		return type == "undefined" ? "undefined" : obj == null ? "null" : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	};

/*--
	typeOf instance methods
--*/

	dash.pr.typeOf = function (obj) {
		return dash.typeOf (obj);
	};

/*--
	event static methods
--*/

	if (document.addEventListener && dash.typeOf (addEventListener) !== "undefined") {
		dash.addEvent = function (obj, event, fun) {
			obj.addEventListener (event, fun, false);
		};
		dash.removeEvent = function (obj, event, fun) {
			obj.removeEventListener (event, fun, false);
		};
	} else if (document.attachEvent && dash.typeOf (attachEvent) !== "undefined") {
		dash.addEvent = function (obj, event, fun) {
			var fnHash = "e_" + event + fun;

			obj[fnHash] = function () {
				var type = event.type,
					relatedTarget = null;

				if (type === "mouseover" || type === "mouseout") {
					relatedTarget = (type === "mouseover") ? event.fromElement : event.toElement;
				}

				fun.call (obj, {
					target : event.srcElement,
					type : type,
					relatedTarget : relatedTarget,
					_event : event,
					preventDefault : function () {
						this._event.returnValue = false;
					},
					stopPropagation : function () {
						this._event.cancelBubble = true;
					}
				});
			};

			obj.attachEvent ("on" + event, obj[fnHash]);
		};

		dash.removeEvent = function (obj, event, fun) {
			var fnHash = "e_" + event + fun;

			if (dash.typeOf (obj[fnHash]) !== "undefined") {
				obj.detachEvent ("on" + event, obj["fnHash"]);
				delete obj[fnHash];
			}
		}
	} else {
		dash.addEvent = function (obj, event, fun) {
			obj["on" + event] = fun;
		};
		dash.removeEvent = function (obj, event, fun) {
			obj["on" + event] = null;
		};
	}

/*--
	event instance methods
--*/

	dash.pr.on = function (event, fun) {
		dash.addEvent (this.el, event, fun);
		return this;
	};
	dash.pr.off = function (event, fun) {
		dash.removeEvent (this.el, event, fun);
		return this;
	};
	dash.pr.click = function (fun) {
		var me = this;
		dash.addEvent (this.el, "click", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.mouseover = function (fun) {
		var me = this;
		dash.addEvent (this.el, "mouseover", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.mouseout = function (fun) {
		var me = this;
		dash.addEvent (this.el, "mouseout", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.dblclick = function (fun) {
		var me = this;
		dash.addEvent (this.el, "dblclick", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.mouseenter = function (fun) {
		var me = this;
		dash.addEvent (this.el, "mouseenter", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.mouseleave = function (fun) {
		var me = this;
		dash.addEvent (this.el, "mouseleave", function (e) {
			fun.call (me, e);
		});
		return this;
	};
	dash.pr.submit = function (fun) { //0708
		var me = this;
		dash.addEvent (this.el, "submit", function (e) {
			fun.call (me, e);
		});
		return this;
	};

/*--
	short event instance methods
--*/
	// ADDED: short instance events blur() and focus() 1208
	dash.pr.blur = function () {
		// console.log(this, this.el);
		this.el.blur();
		return this;
	};
	dash.pr.focus = function () {
		this.el.focus();
		return this;
	};

/*--
	style static methods
--*/

	dash.css = function (el, css, value) {
		var cssType = dash.typeOf(css),
			valueType = dash.typeOf(value),
			elStyle = el.style;

		if (cssType !== "undefined" && valueType === "undefined") {
			if (cssType === "object") {
				for (var prop in css) {
					if (css.hasOwnProperty(prop)) {
						elStyle[toCamelCase(prop)] = css[prop];
					}
				}
			} else if (cssType === "array") {
				var returnStyles = {};
				for (var i = 0; i < css.length; i++) {
					returnStyles[css[i]] = getStyle(el, css[i]);
				}
				return returnStyles;
			} else if (cssType === "string") {
				return getStyle(el, css);
			}
		} else if (cssType === "string" && valueType === "string") {
			elStyle[toCamelCase(css)] = value;
		} else {
			try {
				throw { message: "Invalid arguments passed in css()." };
			} catch (e) {}
		}
	};

/*--
	style instance methods
--*/

	dash.pr.css = function (css, value) {
		dash.css(this.el, css, value);
		return this;
	};

/*--
	classes static methods
--*/

	dash.hasClass = function(el, value) { //0608
		return (" " + el.className + " ").indexOf(" " + value + " ") > -1;
	};

	dash.addClass = function(el, value) { //0608
		var _className = el.className;

		if (!_className) {
			el.className = value;
		} else {
			var newClasses = value.split(/\s+/),
				l = newClasses.length;

			for (var i = 0; i < l; i++) {
				if (!this.hasClass(el, newClasses[i])) {
					_className += " " + newClasses[i];
				}
			}

			el.className = _className.trim();
		}
	};

	dash.removeClass = function(el, value) { //0608
		if (!value) {
			el.className = "";
		} else {
			var remClasses = value.split(/\s+/),
				_className = " " + el.className + " ",
				l = remClasses.length;

			for (var i = 0; i < l; i++) {
				_className = _className.replace(" " + remClasses[i] + " ", " ");
			}

			el.className = _className.trim();
		}
	};

	dash.toggleClass = function(el, value) { //0608
		var toggClasses = value.split(/\s+/),
			i = 0,
			_className;

		while (_className = toggClasses[i++]) {
			this[this.hasClass(el, _className) ? "removeClass" : "addClass"](el, _className);
		}
	};

/*--
	classes instance methods
--*/

	dash.pr.hasClass = function(value) { //0608
		return dash.hasClass(this.el, value);
	};
	dash.pr.addClass = function(value) { //0608
		dash.addClass(this.el, value);
		return this;
	};
	dash.pr.removeClass = function(value) { //0608
		dash.removeClass(this.el, value);
		return this;
	};
	dash.pr.toggleClass = function(value) { //0608
		dash.toggleClass(this.el, value);
		return this;
	};

/*--
	visibility instance methods
--*/

	// ADDED: the visibility api to check if the ele is shown or not and to show, hide and toggle its visibility on page 1208
	dash.pr.isShown = function() {
		return this.el.style.display != "none";
	};
	dash.pr.show = function(display) {
		this.el.style.display = display ? display : "block";
		return this;
	};
	dash.pr.hide = function() {
		this.el.style.display = "none";
		return this;
	};
	dash.pr.toggle = function() {
		this[this.el.style.display != "none" ? "hide" : "show"]();
		return this;
	}; // ADDED-END

/*--
	attributes static methods
--*/

	dash.attr = function(el, attr, value, nodeName, isData) { //0708
		var attrType = dash.typeOf(attr),
			valueType = dash.typeOf(value),
			attrs = el.attributes,
			nodeName = nodeName || el.nodeName,
			isData = isData || false;
			if (attr === "data-" && valueType == "undefined") value = "";

		if (el.nodeType && el.nodeType === 1 && el.nodeName === nodeName.toUpperCase()) {
			if (attrType !== "undefined" && valueType === "undefined") {
				if (attrType === "object") {
					for (var prop in attr) {
						if (attr.hasOwnProperty(prop)) {
							// IMPROVED: to remove attrs if value provided is "" else add attrs 0808
							attr[prop] !== "" ? el.setAttribute(toHyphanate(prop), attr[prop]) : el.removeAttribute(prop);
						}
					}
				} else if (attrType === "array") {
					var returnAttrs = {};
					for (var i = 0; i < attr.length; i++) {
						returnAttrs[attr[i]] = el.getAttribute(attr[i]);
					}
					return returnAttrs;
				} else if (attrType === "string") {
					return el.getAttribute(attr);
				}
			} else if (attrType === "string" && valueType === "string") {
				// ADDED: the func. for removing specific attr 0808
				// TODO: delete single or multiple data-* attrs func. 0908
				if (value == "") { //0808
					// 	console.log(attrs);
					// if (isData) {
					// 	for (var prop in attrs) {
					// 		if (prop.indexOf("data-") === 0) {
					// 		}
					// 	}
					// }
					if (el.removeAttribute === undefined) return el.setAttribute(attr, "");
					return el.removeAttribute(attr);
				}
				return el.setAttribute(attr, value);
			} else {
				// ADDED: the func. for getting data attr where dataset is not supported 0808
				if (!isData) {
					return attrs;
				}
				var datasetValue = {};
				for (var prop in attrs) {
					if (prop.indexOf("data-") === 0) {
						datasetValue[toCamelCase(prop.substr(5))] = el.getAttribute(prop);
					}
				} // ADDED-END
				return datasetValue;
			}
		} else return;
	};
	// FIXME: setting attr as class does not add that class to className but creates new class on dom in < ie9 0708
	// FIXME: type not working in < ie9 0708
	// FIXME: placeholder in < ie9 0708

/*--
	attributes instance methods
--*/

	dash.pr.attr = function(attr, value) { //0608
		return dash.attr(this.el, attr, value);
	};
	dash.pr.id = function(value) { //0608
		return dash.attr(this.el, "id", value);
	};
	dash.pr.href = function(value) { //0608
		if (value && value.indexOf("http") != 0) value = "http://" + value;
		return dash.attr(this.el, "href", value, "a");
	};
	dash.pr.name = function(value) { //0608
		return dash.attr(this.el, "name", value, "form");
	};
	dash.pr.title = function(value) { //0608
		return dash.attr(this.el, "title", value);
	};
	dash.pr.val = function(value) { //0608 //!<ie9
		return dash.attr(this.el, "value", value, "input");
	};
	dash.pr.place = function(value) { //0608 //!<ie9
		return dash.attr(this.el, "placeholder", value, "input");
	};
	dash.pr.type = function(value) { //0708 //!<ie9
		var test = document.createElement('input');
		test.type = value; // or any other type
		if (test.type === 'text') {
			console.log("The input tag attribute " + value + " is not supported in your browser");
			value = "text";
		}
		return dash.attr(this.el, "type", value, "input");
	};

/*--
	dataset instance method
--*/

	dash.pr.data = function(attr, value) { //0708
		var attrType = dash.typeOf(attr) === "undefined",
			valType = dash.typeOf(value) === "undefined";
		if (this.el.dataset === undefined) {
			if (!attrType) var attr = "data-" + attr;
			return dash.attr(this.el, attr, value, this.el.nodeName, true); //0808
		}
		if (attrType && valType) return this.el.dataset;
		else if (!attrType) {
			// ADDED: the func. to remove ALL data attributes 0808
			// IMPROVED: to adopt if needed to remove all data attrs or a single 0808
			if (attr === "") {
				for (var prop in this.el.dataset) {
					delete this.el.dataset[prop];
				} //ADDED-END
			} else if (value === "") delete this.el.dataset[attr];
		}
		else if (!attrType && valType) return this.el.dataset[toCamelCase(attr)]; //0808
		else this.el.dataset[toCamelCase(attr)] = value; //0808
	};

/*--
	dom manipulation static methods
--*/
	// ADDED: create elements and their children with provided attributes 1308
	dash.createElement = function(tag, opts) {
		if (!tag || dash.typeOf(tag) !== "string") {
			try { throw { message: "Invalid argument passed as tagName." } } catch (e) {}
		}
		if (dash.typeOf(opts) !== "object") {
			try { throw { message: "Invalid argument passed as options." } } catch (e) {}
		}

		var el = document.createElement(tag);
		opts.id && (el.id = opts.id) delete opts.id;
		opts.class && (el.className = opts.class) delete opts.class;
		opts.html && (el.innerHTML = opts.html) delete opts.html;
		opts.text && (el.innerText = opts.text) delete opts.text;

		if (opts.child && dash.typeOf(opts.child) == "array") {
			var child,
				i = 0;
			while (child = opts.child[i++]) {
				el.appendChild(this.createElement(child));
			}
			delete opts.child;
		}

		var key;
		for (key in attrs) {
			if (attrs.hasOwnProperty(key)) {
				attrs[key] && el.setAttribute(key, attrs[key]);
			}
		}

		return this;
	};

/*--
	dom manipulation instance methods
--*/

	dash.pr.html = function(html) { //0608
		if (!html) {
			return this.el.innerHTML;
		} else {
			this.el.innerHTML = html;
			return this;
		}
	};
	dash.pr.outerHtml = function(html) { //0608
		if (!html) {
			return this.el.outerHTML;
		} else {
			this.el.outerHTML = html;
			return this;
		}
	};
	dash.pr.text = function(text) { //0608
		if (!text) {
			return this.el.innerText || this.el.textContent;
		} else {
			this.el.innerText = text;
			return this;
		}
	};
	// ADDED: append instance method to append html / node data to the page. 1308
	dash.pr.append = function(data) {
		if (dash.typeOf(data.nodeType) !== "undefined" && data.nodeType === 1) {
			this.el.appendChild(data);
		} else if (data instanceOf dash) {
			this.el.appendChild(data.el);
		} else if (dash.typeOf(data) === "string") {
			this.el.innerHTML = data;
		}
		return this;
	};

/*--
	language extensions static methods
--*/

	dash.trim = function(string) { // 0508
		return string.trim();
	};
	// ADDED: dash.ltrim() & dash.rtrim() static methods 1308
	dash.ltrim = function(string) {
		return string.ltrim();
	};
	dash.rtrim = function(string) {
		return string.rtrim();
	}; // ADDED-END

/*--
	language extensions
--*/

	// ADDED: ltrim and rtrim functions 1208
	String.prototype.ltrim = function() { return this.replace(/^\s+/, ""); }
	String.prototype.rtrim = function() { return this.replace(/\s+$/, ""); }
	String.prototype.trim = String.prototype.trim || function () { //0608
		return this.ltrim().rtrim();
	}

	if (dash.typeOf(Array.prototype.indexOf) === "undefined") { //0508
		Array.prototype.indexOf = function (item) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === item) return i;
			}
			return -1;
		}
	}

/*--
	helper functions
--*/

	function toCamelCase(string) {
		return string.replace(/-([a-z])/ig, function (all, letter) {
			return letter.toUpperCase();
		});
	};
	function capitalize (string) {
		return string.replace(/\S+/g, function(a){
			return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
		});
	};
	function toHyphanate(string) { //0708
		return string.replace(/([A-Z]+)/g, function (match) {
			return "-" + match.toLowerCase();
		});
	};

	var getStyle = (function () {
		if (dash.typeOf(window.getComputedStyle) !== "undefined" ) {
			return function(el, cssProp) {
				return window.getComputedStyle(el, null).getPropertyValue(cssProp);
			};
		} else {
			return function(el, cssProp) {
				return el.currentStyle[toCamelCase(cssProp)];
			};
		}
	}());

/*--
	exposing dash to the global object
--*/

	window._ = window.dash = dash;
} (window));