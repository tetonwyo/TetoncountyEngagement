// jQuery Mega Menu Effects

// To apply one of those effects (replace "hover_fade" by any other effect) :
// jQuery(function() {
//	 jQuery("#menu").megaMenu('hover_fade');
// });


jQuery.fn.megaMenu = function(menu_effect)
{

	jQuery(".dropcontent").css('left', 'auto').hide();
	jQuery(".fullwidth").css('left', '-1px').hide();
	jQuery(".dropcontentwide").css('left', '360px').hide();

	switch( menu_effect )
	{

	case "hover_fade":
		jQuery('ul#menu li').hoverIntent(function() {
			jQuery(this).children().stop().fadeTo(400, 1);
			}, function () { 
			jQuery(this).children("div").stop().fadeTo(400, 0, function() {
			  jQuery(this).hide(); 
		  });
		});
		break;

	case "hover_fadein":
		jQuery('ul.menu li').hoverIntent(function() {
			jQuery(this).children().stop().fadeTo(300, 1).show();
			}, function () { 
			jQuery(this).children("div").stop().hide(); 
		});
		break;

	case "hover_slide":
		jQuery('ul#menu li').hover(function() {
			var $this = jQuery(this);
			$this.children("div").slideDown('fast');
			$this.hover(function() {
			}, function(){	
				jQuery(this).children("div").slideUp(200);
			});
		});
		break;

	case "hover_toggle":
		jQuery('ul#menu li').hover(function() {
			jQuery(this).children("div").toggle('fast').show();
		});
		break;

	case "click_fade":
		jQuery('li').click(function() {
			var $this = jQuery(this);
			$this.children().fadeIn(400).show();
			$this.hover(function() {
			}, function(){	
				$this.children("div").fadeOut(400);
			});
		});
		break;

	case "click_slide":
		jQuery('li').click(function() {
			var $this = jQuery(this);
			$this.children().slideDown('fast').show();
			$this.hover(function() {
			}, function(){	
				$this.children("div").slideUp('slow');
			});
		});
		break;

	case "click_toggle":
		jQuery('li').click(function() {
			var $this = jQuery(this);
			$this.children("div").toggle('fast').show();
			$this.hover(function() {
			}, function(){	
				$this.children("div").hide('slow');
			});
		});
		break;

	case "click_open_close":
		jQuery('li').click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			jQuery(this).children().fadeTo(400, 1);
		});
		break;

	case "opened_first":
		jQuery("li:first-child > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	case "opened_last":
		jQuery("li:last-child > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	case "opened_second":
		jQuery("li:nth-child(2) > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	case "opened_third":
		jQuery("li:nth-child(3) > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	case "opened_fourth":
		jQuery("li:nth-child(4) > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	case "opened_fifth":
		jQuery("li:nth-child(5) > div").fadeTo(400, 1).parent().toggleClass('active');
		jQuery("li").click(function() {
			var $this = jQuery(this);
			$this.toggleClass('active');
			$this.siblings().removeClass('active');
			jQuery(".dropcontent, .fullwidth").fadeOut(400, 0);
			$this.find(".dropcontent, .fullwidth").fadeTo(400, 1);
		});
		break;

	
	}

	
}
