/**
 * A simple plugin that guards spoiler content, warning users, but allowing
 * those who have indicated they want to see the content to skip the
 * warnings. Of course this can be used with any kind of content warning, user
 * acknowledgment, license agreement, etc.
 *
 * Pages should embed the spoiler in it's displayed state, otherwise a user
 * might get a flash of the underlying content before the JavaScript has a
 * chance to execute.
 *
 * TODO: expand documentation
 *
 * TODO: display the blocker in a 'blank' state that can be styled to match
 * the underlying page; populate with content with JS or hide; this would
 * avoid the blocker flash
 *
 * Requried option: declineRedirect: URL to send user to if they decline the alert.
 *
 * See spoileralert.css for information on styling and appearence.
 *
 * I did search; found a 'spoiler alert' that hides a section of text until a
 * control is clicked. My intent is quite different.
 *
 * Depends on jquery-cookie.js
 */
(function($) {
    $.fn.spoilerAlert = function(options) {
	// set the defaults
	var defaults = { 
	    spoilerKey : 'spoiler',
	    spoilerClass : 'spoilerAlert',
	    spoilerBlockerClass : 'spoilerBlocker',
	    ackClass : 'ack',
	    dynamicAckHtml :
	      '<div class="ackText">' +
		'I fully understand and accept the consequences of proceeding.<br />' +
		'<span class="ackControlAccept">I agree.</span><br />' +
		'<span class="ackControlDecline">I refuse.</span>' +
	       '</div>',
	    maxZInit : 100000
	};
	var options = $.extend(defaults, options);
	// determine if spoiler should be suppressed
	if (!$.cookie(options.spoilerKey)) {
	    // find our z-index so that the spoiler alert goes above
	    // everything else
	    var maxZ = options.maxZInit;
	    $('*').each(function() {
		var testZ = parseInt($(this).css('z-index'));
		if (!isNaN(testZ)) maxZ = Math.max(maxZ, testZ);
	    });
	    return this.each(function() {
		$(this).addClass(options.spoilerClass);
		
		var blocker = $('#spoilerBlocker');
		blocker.css('z-index', maxZ + 1);
		var ack = $(this).find('.' + options.ackClass).first();
		if (ack.length == 0) {
		    // then we need to add in our default ack
		    ack = $(options.dynamicAckHtml);
		    blocker.append(ack);
		}
		// new we enable the ack controls
		ack.find('.ackControlAccept').bind('click', function() {
		    $.cookie(options.spoilerKey, 'accepted');
		    $('#spoilerBlocker').hide();
		});
		ack.find('.ackControlDecline').bind('click', function() {
		    $.cookie(options.spoilerKey, null);
		    window.location.replace(options.declineRedirect);
		});
	    });
	}
	else // the spoilers have been accepted; hide the blocker
	    $('#spoilerBlocker').hide();
	
    };
})(jQuery);;
