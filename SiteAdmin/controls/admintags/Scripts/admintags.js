function ShowTagger() {
//This is assuming the parent site has jquery avaiable
//document.write("<script src='http://admin.tetongravity.com/Scripts/jquery-1.6.3.min.js'></script>");
//document.write("<script src='http://admin.tetongravity.com/Scripts/jquery.cookie.js'></script>");

//Used to wait for JQuery to load
//function jqueryLoaded() {

//$('head').append("<script src='http://admin.tetongravity.com/Scripts/jquery-1.6.3.min.js'></script><script src='http://admin.tetongravity.com/Scripts/jquery.cookie.js'></script>");
//$('head').append("<script src='http://admin.tetongravity.com/Scripts/jquery-1.6.3.min.js'>");

        var mediaID = $('meta[name=mediaid]').attr("content"); //using: jquery
        var lookupitemid = $('meta[name=lookupitemid]').attr("content"); //using: jquery 
        var mediatypefk = $('meta[name=mediatypefk]').attr("content"); //using: jquery

        //var authenticationCookie = $.cookie('authorization'); //using: jquery.cookie.js
        //var adminpanelvisibility = $.cookie('adminpanelvisibility');

    var q = "<script type='text/javascript'>$(document).ready(function() {$('.AdminPanel').click(function () {$('#toggle1').slideToggle('slow',function(){$('.AdminPanelClose').toggle();});}); ";
    //q = q + "$('#fuzz').css('height',$(document).height());$('#admin_panel_iframe').css('height',$(document).height());$('#toggle1').css('height',$(document).height());$('.AdminPanel').click(function () {$('#fuzz').toggle();return false;});$('.close').click(function () {$('#fuzz').hide();return false;});";
    q = q + "$('#fuzz').css('height',$(document).height());$('.AdminPanel').click(function () {$('#fuzz').toggle();return false;});$('.close').click(function () {$('#fuzz').hide();return false;});";
  //  q = q + "$('#admin_panel_iframe').css('height',$(window).height());"
     q = q + "$('#admin_panel_iframe').css('height',3000);"
    q = q + "});</script>";

    q = q + "<a href='javascript:void(0)' style='cursor:hand;'><div class='AdminPanel' style='background-color:#006699; no-repeat scroll 0pt 50% rgb(204, 106, 0); border-width: 0px 2px 2px 2px; border-style: solid; border-color:silver; border-radius: 0px 0px 2pt 2pt; box-shadow: 2px 2px 2px rgba(255, 255, 255, 0.25) inset, 0pt 1px 2px rgba(0, 0, 0, 0.5);font-size:12px;line-height:18px; position:fixed; left:10px; top:0pt; z-index:1000; margin-bottom:0px; display:block;color:#ffffff;padding:3px;'><img src='http://admin.tetongravity.com/images/tag.png'/> Show Admin Panel </div></a>";
    q = q + "<div class='AdminPanel' style='width:25px;height:25px;position:absolute;top:5px;left:5px;z-index:9999;'><img class='AdminPanelClose' style='height:25px;width:25px;z-index:9999;display:none;' src='http://admin.tetongravity.com/images/close-icon.png' height='25px' width='25px' alt='Close Admin Panel' /></div>";

    //q = q + "<div id='toggle1'style='width:100%;position:fixed;overflow:auto;display:none;z-index:1001;top:0px;left:0px;'>";
    q = q + "<div id='toggle1'style='width:100%;height:700px;position:absolute;overflow:auto;display:none;z-index:1001;top:0px;left:0px;'>";
    q = q + "<iframe id='tagger-iframe' style='height:700px;' src='http://admin.tetongravity.com/AdminTagControl/default.aspx?lookupitemid=";
    q = q + lookupitemid;
    q = q + "&mediatypefk=";
    q = q + mediatypefk;
    q = q + "&mediaid=";
    q = q + mediaID;
    q = q + "' id='admin_panel_iframe' width='100%'><p>Your browser does not support iframes.</p></iframe></div>";
	
    q = q + "<div id='fuzz' style='position:absolute; top:0; left:0; width:100%; z-index:100; background-color:#000000; display:none; text-align:left;filter:alpha(opacity=60);-moz-opacity:0.60;opacity:0.60;-khtml-opacity:0.60;'><div class='msgbox'><a class='close' href='#'><img src='close.jpg'/></a></div></div>";
 	
    $('body').prepend(q);
}
function ResizeTagger (height) {
	//var height = $('#tagger-iframe').height ();
	//alert ('height: ' + height);
	if (!height || height < 700)
		height = 700;
	$('#tagger-iframe').height (height);
}


//}  


//function checkJquery() {
//    if (window.jQuery) {
//        jqueryLoaded();
//    } else {
//        window.setTimeout(checkJquery, 100);
//        jqueryLoaded();
//    }
//} 
//checkJquery();

/*
function calcHeight() {
    //var the_height = document.getElementById("admin_panel_iframe").contentWindow.document.body.scrollHeight;
    var the_height = document.getElementById("admin_panel_iframe").contentWindow.document.body.scrollHeight;
    document.getElementById("admin_panel_iframe").height = the_height;
}
*/