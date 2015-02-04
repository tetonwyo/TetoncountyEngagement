// ------------------------------------------------------------------------------------------------
// CCC.Misc
// Miscellaneous functions
//
// © 2009 Crystal Creek Consulting
//
// Created: 05/01/09, MWD
// Updates:
//
// Requires CCC.js

CCC.Misc = new Class({
    Extends: CCC,

    // Constructor
    initialize: function() 
    {
        this.parent();
    }
});

// Returns a querystring value
CCC.Misc.GetQueryString = function(id)
{
    var queryString = window.location.search.substring(1);
    var values = queryString.split("&");
    for (i = 0; i < values.length; i++)
    {
        value = values[i].split("=");
        if (value[0] == id)
        {
            return value[1];
        }
    }
    return "";    
}

// Returns the current year
CCC.Misc.GetCurrentYear = function()
{
    var d = new Date();
    return d.getFullYear();     
}

// Returns a copyright meta tag
CCC.Misc.GetCopyrightMeta = function(owner)
{
    return "<meta name='copyright' content='Copyright &copy;" + CCC.Misc.GetCurrentYear() + ", " + owner + "' />";
}
   
// Creates a mailto link 
// Use: <script>LinkMail('domain.com','mdelange','css class');</script>
CCC.Misc.LinkMail = function(host, user, cls) 
{
    document.write('<a href="javascript:CCC.Misc.PopMail(\''+ host +'\',\''+ user +'\');"');
    if (cls) 
    {
	    document.write(' class="'+ cls +'"');
    }
    document.write('>');
    document.write(user + '@' + host);
    document.write('</a>');
}

// Show a mailto popup
CCC.Misc.PopMail = function(host, user) 
{
    self.location.href = 'mailto:' + user +'@'+ host;
}

CCC.Misc.SetCookie = function(c_name, value, expireDays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expireDays);
    document.cookie=c_name+ "=" +escape(value)+((expireDays==null) ? "" : ";expires="+exdate.toGMTString());
}
CCC.Misc.GetCookie= function(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}