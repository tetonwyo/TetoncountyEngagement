// JSON LIBRARY; FOR SILLY BROWSERS
if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()


/*! tetonwyo.org persistent page tracker */
window.onload = function(){
	
	window.TyoTrckr = (function(){
		
		/**
		 * @todo: set Access-Control-Allow-Origin header in header response to this resource
		 */
		var _htmlSrc 	= '//www.tetonwyo.org/theme/countynav/specials-menu.html',
			_expFuture	= 365, // days in future
			_domain		= '.tetonwyo.org',
			trigger, container, listArea;
			
		/**
		 * Storage abstraction (defaults to cookies for now)
		 */
		var _storage = (function(){
			function getCookie(name) {
				var parts = document.cookie.split(name + "=");
  				if (parts.length == 2){return parts.pop().split(";").shift();}
  				return null;
			}

			function setCookie(name, value){
				var _expires = new Date();
				_expires.setDate( _expires.getDate() + _expFuture );

				var _cookie  = name + "=" + value + ";";
				_cookie += "expires=" + _expires.toGMTString() + ";";
				_cookie += 'domain='+_domain+';path=/;';
				document.cookie = _cookie;
			}
			
			return {
				get: getCookie,
				set: setCookie
			};
		}());
		
		/**
		* Dynamically build the list of previously tracked pages
		*/
		function _buildPrevious(){
			var list = JSON.parse( _storage.get('tyo_hist')), li, a, img, span, listItems = [], countN, i, data;
			
			// if tracked pages exist...
			var trackedP = "";
			
			if(list && list.length){
				countN = 0;
				for (i = list.length - 1; i >= 0; i--) {
					if(countN < 7){
						data = list[i];
						if(trackedP.indexOf(data.link)  < 0){
							li = document.createElement('li');
							a = document.createElement('a');
							img = document.createElement('img');
							span = document.createElement('span');
							if(data.type == "dept"){
								span.appendChild(document.createTextNode(data.title));
								img.src = 'http://www.tetonwyo.org/assets/agencylogos/18/' + data.ident +'.png';
								a.href = data.link;
							}
							else{
								span.appendChild(document.createTextNode(data.title));
								img.style.width = '18px';
								img.src = 'http://www.tetonwyo.org/images/countynav/tcw-logo.png';
								a.href = data.link;
							}
							a.appendChild(img);
							a.appendChild(span);
							li.appendChild(a);
							listItems.push(li);
							countN += 1;
							trackedP += data.link;
						}
					}
				}
				
				// append to DOM
				// This is done this way to maintain the correct ordering of items
				if(listItems.length > 0){
					for(i = listItems.length - 1; i >= 0; i--){
						if(listArea.hasChildNodes()){listArea.insertBefore(listItems[i],listItems.childNodes[0]);}
						else{listArea.appendChild(listItems[i]);}
					}
				}
			}
		}
		
		/**
		* Parse the meta tag on this page to determine whether we should track this or not.
		*/
		function _watchCurrent(){
		
		}
		
		function _setUpList(){
			var inputs, index, lists;
			// cache selectors
			inputs = document.getElementById('tyotrckr').getElementsByTagName('INPUT');
			for(index = 0; index < inputs.length; index++){
				if(inputs[index].name === 'special-menu'){
					trigger = inputs[index];
					break;
				}
			}
			
			container = document.getElementById('specials-container');
			
			if(container){
				lists = container.getElementsByTagName('UL');
				for(index = 0; index <= lists.length; index++){
					if(lists[index].className.search('\\blist-right\\b') !== -1){
						listArea = lists[index];
						break;
					}
				}
				if(!listArea){
					lists = container.getElementsByTagName('OL');
					for(index = 0; index <= lists.length; index++){
						if(lists[index].className.search('\\blist-right\\b') !== -1){
							listArea = lists[index];
							break;
						}
					}
				}
				
				if(trigger){
					trigger.onclick = function(){
						var display = (document.defaultView && document.defaultView.getComputedStyle ?
							document.defaultView.getComputedStyle(container, "").getPropertyValue('display') : container.currentStyle.display);
						container.style.display = (display === 'none' ? 'block' : 'none');
					};
				}
				
				// create the list
				_buildPrevious();
				
				// process current page (should it be added, or is it already?)
				_watchCurrent();
			}
		}
		
		/**
		 * Initialize the tracker
		 */
		function _init(){
			var div, body, xmlHttp;
			// add container to body and load html
			body = document.getElementsByTagName('body');
			body = body.length > 0 ? body[0] : null;
			if(body){
				div = document.createElement('div');
				div.id = 'tyotrckr';
				body.appendChild(div);
				try{
					if(window.XMLHttpRequest){
						xmlHttp = new XMLHttpRequest();
						if(xmlHttp.withCredentials !== undefined){
							xmlHttp.onreadystatechange = function(){
								if(this.readyState == 4){
									if(this.status == 200){
										div.innerHTML = this.responseText;
										_setUpList();
									}
								}
							};
							xmlHttp.open("GET",_htmlSrc,true);
							xmlHttp.send();
						}
					}
				}
				catch(ex){
					// We can get here for older browsers that do not support cross domain requests
				}
			}
		}
		
		// initialize
		_init();
		
		/**
		* Public methods
		*/
		return {
			storage: _storage
		};
		
	})( );

};


/*********************** EMBEDDABLE IN THE PAGE WITH ***********************
<script async type="text/javascript" src="//tstr.co/test/tyotrckr.js"></script>
***************************************************************************/
