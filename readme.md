# Yo Pass Wall
### Version .01 | By [Chris Johnson](http://chrisltd.com) | https://github.com/ChrisLTD/yo_pass_wall

Yo Pass Wall obscures the contents of a page until the visitor enters the proper password into the prompt. This plugin was inspired by [soft Javascript paywalls](https://en.wikipedia.org/wiki/Paywall#.22Soft.22_paywalls) used on some newspaper websites.

![Example](https://github.com/chrisltd/yo_pass_wall/raw/master/example.jpg)

**Warning:** This plugin does not provide real security for your content. For instance, if your visitors have Javascript disabled, they will never see the password prompt.

Activate the plugin and pass in a base64 encoded password string. You can convert text to base64 using an [online](http://www.base64encode.org/) [tool](http://www.motobit.com/util/base64-decoder-encoder.asp). If you don’t supply a password, the default is ‘password’.

## Usage Examples
Simple example
```html
<!-- Include JQuery Core above this line -->
<script src="jquery.jquery.yopasswall.js"></script>
<script>
	$.YoPasswall({'password' : 'Y2hyaXMgaXMgYXdlc29tZQ=='});
</script>
```

## Options
```js
'password'     	: 'cGFzc3dvcmQ=',              					// Password base64 encoded (default: password)
'promptMessage'	: 'Enter the password to continue:', 		// Text shown on the password prompt
'failMessage'		: 'Password incorrect. Try again:', 		// Message shown when the password is incorrect
'pageCover'    	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQImWOoqqr6DwXP/v///58BmfP///9nDDAOTCWGCgDa6TwNdDnWYwAAAABJRU5ErkJggg==', // base64 encoded image to obscure the page content
'initCallback' 	: function() {}            							// Called if plugin initialized on an object
```