	    // HTML editor
	    tinyMCE.init({
		    // General options
	        mode : "specific_textareas",
	        editor_selector : "mceEditor",
	        //body_id : "pageContent",
	        body_class : "mceContentBody",
		    theme : "advanced",
		    plugins : "safari,pagebreak,style,table,advhr,advimage,advlink,iespell,inlinepopups,preview,media,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

		    // Theme options
		    theme_advanced_buttons1 : "preview,print,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
		    theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,cleanup,code",
		    theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,charmap,|,ltr,rtl,|,fullscreen", //iespell
		    //theme_advanced_buttons4 : "cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking",
		    theme_advanced_toolbar_location : "top",
		    theme_advanced_toolbar_align : "left",
		    theme_advanced_statusbar_location : "none",
		    theme_advanced_resizing : false,

		    // Example content CSS (should be your site CSS)
		    content_css : "/css/TetonCountyBase.css"

		    // Drop lists for link/image/media/template dialogs
		    //template_external_list_url : "lists/template_list.js",
		    //external_link_list_url : "lists/link_list.js",
		    //external_image_list_url : "lists/image_list.js",
		    //media_external_list_url : "lists/media_list.js",

		    // Replace values for the template plugin
		    //template_replace_values : {
			//    username : "Some User",
			//    staffid : "991234"
		    //}
	    });

