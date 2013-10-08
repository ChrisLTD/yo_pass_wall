// By Chris Johnson
// http://chrisltd.com
// Created October 2013
// Version .01
// Yo Passwall hides your page content behind a mostly opaque background image until you enter the proper password into a browser prompt dialogue window

(function( $ ){

  $.YoPasswall = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'password'     : 'cGFzc3dvcmQ=',              // Password base64 encoded (default: password)
      'pageCover'    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQImWOoqqr6DwXP/v///58BmfP///9nDDAOTCWGCgDa6TwNdDnWYwAAAABJRU5ErkJggg==', // base64 encoded image to obscure the page content
      'initCallback' : function() {}            		// Called if plugin initialized on an object
    }, options);

    var password_prompt = null;
    
    $('body').append('<div id="yo_pagecover" style="background: url(' + settings.pageCover + ') repeat; position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: 2147483647; text-align: center;"></div>').delay(100);
    
    settings.initCallback();
    
    function requestPassword(){
      while( $.base64.encode( password_prompt ) != settings.password && password_prompt != '' ){
        if( password_prompt == null){ // first time the prompt comes up
          password_prompt = prompt("Enter password to continue:");
        } else {
          password_prompt = prompt("Password incorrect. Try again:");
        }
      }
      if( $.base64.encode( password_prompt ) == settings.password ){ 
        $('#yo_pagecover').fadeOut('fast');
      } else {
        $('#yo_pagecover').append('<button style="margin-top: 5em;">Try Again</button>');
      }
    }

    window.setTimeout(requestPassword, 100);
    
    $('body').on('click', '#yo_pagecover button', function() {
      window.location.reload();
    });

    return this;
  };
})( jQuery );

// jquery-base64 from https://github.com/carlo/jquery-base64
"use strict";jQuery.base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));
