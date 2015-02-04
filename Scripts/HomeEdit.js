// ------------------------------------------------------------------------------------------------
// HomeEdit
// Supporting script for HomeEdit.aspx
//
// © 2010 Crystal Creek Consulting
//
// Created: 12/10/09, MWD
// Updates:

// Form field IDs
// The values for these must be set in the form itself
var agencyBannerFieldID;
var agencyDescriptionFieldID;
var noticeTextFieldID;
var noticeLinkFieldID;
var announcementFieldID;
var optionsFieldID;
var missionFieldID;
var qTextFieldID;
var rTextFieldID;
var qHtmlFieldID;
var phoneFieldID;
var faxFieldID;
var hoursFieldID;
var emailFieldID;
var physAddrFieldID;
var physAddr2FieldID;
var physCityFieldID;
var physStateFieldID;
var physZipFieldID;

var phoneLabelID;
var faxLabelID;
var physAddrLabelID;
var physAddr2LabelID;

var htmlEditor;
var htmlEditorType;

var editPanel;

function SetBannerImageContent()
{
    var content = $('bannerImageContent');
    var val = $(agencyBannerFieldID).value;
    var elem;
    if (val != '')
    {
        elem = new Element('img', {'src': val});
    }
    else
    {
        elem = new Element('br');    
    }
    content.empty();
    elem.inject(content);
}
function EditBannerImage()
{
    $('agencyBannerField').value = $(agencyBannerFieldID).value;
    eo_GetObject('bannerImageDialog').show(true);
}
function RemoveBannerImage()
{
    $(agencyBannerFieldID).value = '';
    SetBannerImageContent();
}
function UpdateBannerImage(e)
{
    $(agencyBannerFieldID).value = $('agencyBannerField').value;
    SetBannerImageContent();
}
function EditAgencyDescription()
{
    $('agencyDescriptionField').value = $(agencyDescriptionFieldID).value;
    eo_GetObject('agencyDescriptionDialog').show(true);
}
function UpdateAgencyDescription(e)
{
    $(agencyDescriptionFieldID).value = $('agencyDescriptionField').value;
}
function SetNoticeContent()
{
    var content = $('noticeContent');
    var val = $(noticeTextFieldID).value;
    var link = $(noticeLinkFieldID).value;
    var elem;
    if (val != '')
    {
        elem = new Element('a', {
            'href': link,
            'html': val,
            'target': '_blank'
        });
        content.set('class', 'activeContent');
    }
    else
    {
        elem = new Element('br');
        content.set('class', 'content');         
    }
    content.empty();
    elem.inject(content);
}
function EditNotice()
{
    $('noticeTextField').value = $(noticeTextFieldID).value;
    $('noticeLinkField').value = $(noticeLinkFieldID).value;    
    eo_GetObject('noticeDialog').show(true);
}
function RemoveNotice()
{
    $(noticeTextFieldID).value = '';
    $(noticeLinkFieldID).value = '';    
    SetNoticeContent();
}
function UpdateNotice(e)
{
    $(noticeTextFieldID).value = $('noticeTextField').value;
    $(noticeLinkFieldID).value = $('noticeLinkField').value;    
    SetNoticeContent();
}

function SetNavigationContent()
{
    var menu = eo_GetObject('navigationContextMenu')
    var content = $('navigationContent');
    content.empty();    
    var val = $(optionsFieldID).value;
    InjectNavigationElement('Home', content);
    if (val.indexOf('ca') != -1) InjectNavigationElement('Calendar', content);
    if (val.indexOf('cn') != -1) InjectNavigationElement('News', content);
    if (val.indexOf('fm') != -1) InjectNavigationElement('Forms', content);
    if (val.indexOf('hp') != -1) InjectNavigationElement('FAQs', content);
    if (val.indexOf('cu') != -1) InjectNavigationElement('Contact Us', content);
    if (val.indexOf('jb') != -1) InjectNavigationElement('Jobs', content);
    if (val.indexOf('lk') != -1) InjectNavigationElement('Links', content);
    if (val.indexOf('om') != -1)
    {
        SetContextMenuItemVisible(menu, 'editSeparator', true);
        SetContextMenuItemVisible(menu, 'editMission', true);
        InjectNavigationElement('Mission', content);
    }
    else
    {
        SetContextMenuItemVisible(menu, 'editSeparator', false);
        SetContextMenuItemVisible(menu, 'editMission', false);    
    }
    if (val.indexOf('mn') != -1) InjectNavigationElement('Meetings', content);
    if (val.indexOf('mp') != -1) InjectNavigationElement('Agency Map', content);
    if (val.indexOf('wm') != -1) InjectNavigationElement('Weather Map', content); 
    InjectNavigationElement('Topics', content);       
    //InjectNavigationElement(val, content);
}
function InjectNavigationElement(text, navContent)
{
    var elem;
    elem = new Element('div', {
        'html': text
    });
    elem.inject(navContent);
}
function EditNavigation()
{
    var val = $(optionsFieldID).value;
    $('calendarNavField').checked = val.contains('ca');
    $('newsNavField').checked = val.contains('cn');
    $('formsNavField').checked = val.contains('fm');
    $('faqsNavField').checked = val.contains('hp');
    $('contactUsNavField').checked = val.contains('cu');
    $('jobsNavField').checked = val.contains('jb');
    $('linksNavField').checked = val.contains('lk');
    $('missionNavField').checked = val.contains('om');
    $('meetingsNavField').checked = val.contains('mn');
    $('agencyMapNavField').checked = val.contains('mp');
    $('weatherMapNavField').checked = val.contains('wm');
    eo_GetObject('navigationDialog').show(true);
}
function UpdateNavigation(e)
{
    var newNavValue = '';
    if ($('calendarNavField').checked) newNavValue += 'ca:1, ';  
    if ($('newsNavField').checked) newNavValue += 'cn:1, ';
    if ($('formsNavField').checked) newNavValue += 'fm:1, ';
    if ($('faqsNavField').checked) newNavValue += 'hp:1, ';
    if ($('contactUsNavField').checked) newNavValue += 'cu:1, ';
    if ($('jobsNavField').checked) newNavValue += 'jb:1, ';
    if ($('linksNavField').checked) newNavValue += 'lk:1, ';
    if ($('missionNavField').checked) newNavValue += 'om:1, ';
    if ($('meetingsNavField').checked) newNavValue += 'mn:1, ';
    if ($('agencyMapNavField').checked) newNavValue += 'mp:1, ';
    if ($('weatherMapNavField').checked) newNavValue += 'wm:1, ';

    // Add center and right column options
    var oldNavValues = $(optionsFieldID).value.split(', ');
    var firstChar;
    for (var i = 0; i < oldNavValues.length; i++)
    {
        firstChar = oldNavValues[i].charAt(0);
        if (firstChar == 'r' || firstChar == 'q')
        {
            newNavValue += oldNavValues[i];
            newNavValue += ', ';
        }
    }
          
    $(optionsFieldID).value = newNavValue;
    SetNavigationContent();
}

function UpdateColumnOption(option, val)
{
    var optionField = $(optionsFieldID).value;
    var oldOptionVal = optionField.substr(optionField.search(option), 4);
    var newOptionVal = option + ":" + val;
    optionField = optionField.replace(oldOptionVal, newOptionVal);
    $(optionsFieldID).value = optionField;
    SetColumnPanel(option, oldOptionVal.charAt(3));
}

function EditContactInfo()
{
    $('phoneField').value = $(phoneFieldID).value;
    $('faxField').value = $(faxFieldID).value;
    $('hoursField').value = $(hoursFieldID).value;
    $('emailField').value = $(emailFieldID).value;        
    $('physAddrField').value = $(physAddrFieldID).value;
    $('physAddr2Field').value = $(physAddr2FieldID).value;
    $('physCityField').value = $(physCityFieldID).value;
    $('physStateField').value = $(physStateFieldID).value;    
    $('physZipField').value = $(physZipFieldID).value;
    $('mailAddrField').value = $(mailAddrFieldID).value;
    $('mailAddr2Field').value = $(mailAddr2FieldID).value;
    $('mailCityField').value = $(mailCityFieldID).value;
    $('mailStateField').value = $(mailStateFieldID).value;    
    $('mailZipField').value = $(mailZipFieldID).value;    
    eo_GetObject('contactDialog').show(true);
}
function UpdateContactInfo()
{
    $(phoneLabelID).set('text', $('phoneField').value);
    $(faxLabelID).set('text', $('faxField').value);
    $(hoursLabelID).set('text', $('hoursField').value);    
    $(physAddrLabelID).set('text', $('physAddrField').value);
    $(physAddr2LabelID).set('text', $('physAddr2Field').value);    
    
    $(phoneFieldID).value = $('phoneField').value;
    $(faxFieldID).value = $('faxField').value;
    $(hoursFieldID).value = $('hoursField').value;
    $(emailFieldID).value = $('emailField').value;    
    $(physAddrFieldID).value = $('physAddrField').value;
    $(physAddr2FieldID).value = $('physAddr2Field').value;
    $(physCityFieldID).value = $('physCityField').value;        
    $(physStateFieldID).value = $('physStateField').value;
    $(physZipFieldID).value = $('physZipField').value; 
    $(mailAddrFieldID).value = $('mailAddrField').value;
    $(mailAddr2FieldID).value = $('mailAddr2Field').value;
    $(mailCityFieldID).value = $('mailCityField').value;        
    $(mailStateFieldID).value = $('mailStateField').value;
    $(mailZipFieldID).value = $('mailZipField').value;            
}

function EditMission(panel)
{
    editPanel = panel;
    htmlEditor.setData($(missionFieldID).value);
    htmlEditorType = 'mission';    
    var dialog = eo_GetObject('htmlFieldDialog');
    dialog.setCaption('Edit Mission Statement');
    dialog.show(true);
    htmlEditor.focus();    
}
function UpdateMission(e)
{
    $(missionFieldID).value = htmlEditor.getData();
    if (editPanel == 'nav')
    {
       if (GetOptionValue('q1') == 'm') SetColumnPanel('q1');    
       if (GetOptionValue('q2') == 'm') SetColumnPanel('q2'); 
       if (GetOptionValue('q3') == 'm') SetColumnPanel('q3'); 
       if (GetOptionValue('q4') == 'm') SetColumnPanel('q4');
       if (GetOptionValue('r1') == 'm') SetColumnPanel('r1');    
       if (GetOptionValue('r2') == 'm') SetColumnPanel('r2'); 
       if (GetOptionValue('r3') == 'm') SetColumnPanel('r3'); 
       if (GetOptionValue('r4') == 'm') SetColumnPanel('r4');           
    }
    else
    {
        SetColumnPanel(editPanel);
    }
}
function EditTOI()
{
    eo_GetObject('toiDialog').show(true);
}
function EditAnnouncements(panel)
{
    editPanel = panel;
    htmlEditor.setData($(announcementFieldID).value);
    htmlEditorType = 'announcement';    
    var dialog = eo_GetObject('htmlFieldDialog');
    dialog.setCaption('Edit Announcements');
    dialog.show(true);
    htmlEditor.focus();
}
function UpdateAnnouncements(e)
{
   $(announcementFieldID).value = htmlEditor.getData();
   SetColumnPanel(editPanel);
}
function EditQText(panel)
{
    editPanel = panel;
    htmlEditor.setData($(qTextFieldID).value);
    htmlEditorType = 'qtext';    
    var dialog = eo_GetObject('htmlFieldDialog');
    dialog.setCaption('Edit Text');
    dialog.show(true);
    htmlEditor.focus();
}
function UpdateQText(e)
{
   $(qTextFieldID).value = htmlEditor.getData();
   SetColumnPanel(editPanel);
}
function EditRText(panel)
{
    editPanel = panel;
    htmlEditor.setData($(rTextFieldID).value);
    htmlEditorType = 'rtext';    
    var dialog = eo_GetObject('htmlFieldDialog');
    dialog.setCaption('Edit Text');
    dialog.show(true);
    htmlEditor.focus();
}
function UpdateRText(e)
{
   $(rTextFieldID).value = htmlEditor.getData();
   SetColumnPanel(editPanel);
}
function EditQHtml(panel)
{
    editPanel = panel;
    htmlEditor.setData($(qHtmlFieldID).value);
    htmlEditorType = 'qhtml';    
    var dialog = eo_GetObject('htmlFieldDialog');
    dialog.setCaption('Edit HTML');
    dialog.show(true);
    htmlEditor.focus();
}
function UpdateQHtml(e)
{
   $(qHtmlFieldID).value = htmlEditor.getData();
   SetColumnPanel(editPanel);
}

function UpdateHTMLField(e)
{
    var dialog = eo_GetObject('htmlFieldDialog');
    switch (htmlEditorType)
    {
        case 'mission': UpdateMission(e);break;
        case 'announcement': UpdateAnnouncements(e);break;        
        case 'qtext': UpdateQText(e);break;
        case 'rtext': UpdateRText(e);break;        
        case 'qhtml': UpdateQHtml(e);break;                
    }
}
function EditAlerts()
{
    alert('To edit alerts for your agency, please edit the Alert.xml file in the folder for your agency in the /Alerts folder of the web site. Contact the IT department if you require assistance.');
}

function SetColumnPanel(optionID, oldOptionVal)
{
    // Init variables dependent on optionID
    var panelID;
    var panelName;
    var headerID;
    var contentID;
    var menuName;    
    switch (optionID)
    {
        case 'q1':
            panelID = 'centerPanel1';
            panelName = 'Center Panel 1';
            headerID = 'centerPanel1Header';
            contentID = 'centerPanel1Content';
            menuName = 'c1ContextMenu';
            break;
        case 'q2':
            panelID = 'centerPanel2';
            panelName = 'Center Panel 2';
            headerID = 'centerPanel2Header';
            contentID = 'centerPanel2Content';
            menuName = 'c2ContextMenu';
            break;
        case 'q3':
            panelID = 'centerPanel3';
            panelName = 'Center Panel 3';
            headerID = 'centerPanel3Header';
            contentID = 'centerPanel3Content';
            menuName = 'c3ContextMenu';            
            break;
        case 'q4':
            panelID = 'centerPanel4';
            panelName = 'Center Panel 4';
            headerID = 'centerPanel4Header';
            contentID = 'centerPanel4Content';
            menuName = 'c4ContextMenu';            
            break;
        case 'r1':
            panelID = 'rightPanel1';
            panelName = 'Right Panel 1';
            headerID = 'rightPanel1Header';
            contentID = 'rightPanel1Content';
            menuName = 'r1ContextMenu';            
            break;
        case 'r2':
            panelID = 'rightPanel2';
            panelName = 'Right Panel 2';
            headerID = 'rightPanel2Header';
            contentID = 'rightPanel2Content';
            menuName = 'r2ContextMenu';            
            break; 
        case 'r3':
            panelID = 'rightPanel3';
            panelName = 'Right Panel 3';
            headerID = 'rightPanel3Header';
            contentID = 'rightPanel3Content';
            menuName = 'r3ContextMenu';            
            break; 
        case 'r4':
            panelID = 'rightPanel4';
            panelName = 'Right Panel 4';
            headerID = 'rightPanel4Header';
            contentID = 'rightPanel4Content';
            menuName = 'r4ContextMenu';            
            break;                                                                         
    }

    // Set info dependent on option value
    var newHeader = '';
    var newContent = '';
    var optionVal = GetOptionValue(optionID);
    switch (optionVal)
    {
        case 'r':
            newHeader = 'Current News';
	        newContent = '<a><h3>Sample News Item 1</h3></a>' + 
                '<i>12/15/2009</i> - Sample news item 1 leader<br /><br />' +
                '<a><h3>Sample News Item 2</h3></a>' +
                '<i>12/20/2009</i> - Sample news item 2 leader<br />';	
            break;		        
        case 'm':
	        newHeader = 'Mission Statement';
            newContent = $(missionFieldID).value;		        
            break;		        
        case 'a':
            newHeader = 'Announcements';
            newContent = $(announcementFieldID).value;            
	        break;
        case 'f':
            newHeader = 'Agency Services';
	        newContent = '<h3>Sample Service 1</h3>' + 
                'Sample service 1 description<br /><br />' +
                '<h3>Sample Service 2</h3>' +
                'Sample service 2 description<br />';                
	        break;
        case 't':
	        newHeader = 'Topics of Interest';
	        newContent = '<h3>Sample Topic 1</h3>' + 
                'Sample topic 1 leader<br /><br />' +
                '<h3>Sample Topic 2</h3>' +
                'Sample topic 2 leader<br />';  		        
	        break;
        case 'c':
	        if (optionID.charAt(0) == 'r')
	        {
	            newHeader = 'Calendar';
	            newContent = '<div style="padding:5px"><img src="/images/RightColumnCalendar.png" /></div>' + 
	                '<a><h3>Upcoming Events</h3></a><br />' +
	                '<h3>12/15/2009: Sample Event 1</h3>' + 
                    'Location: County Courthouse<br />' +
                    'Time: 5 - 8PM<br />' + 
                    '<a><h3>More Information</h3></a><br />' +                    
                    '<h3>12/20/2009: Sample Event 2</h3>' +
                    'Location: Parks & Recreation Offices<br />' +                    
                    'Time: 7 - 9PM<br />' + 
                    '<a><h3>More Information</h3></a>'; 	            
	        }
	        else
	        {
	            newHeader = 'Upcoming Events';
	            newContent = '<a><h3>Sample Event 1</h3></a>' + 
                    '<i>12/15/2009 - 12/19/2009, 5 - 8PM</i><br />Sample event 1 description<br /><br />' +
                    '<a><h3>Sample Event 2</h3></a>' +
                    '<i>12/20/2009, 7 - 9PM</i><br />Sample event 2 description<br />'; 	            	        
	        }        
	        break;
        case 'd':
	        newHeader = 'Meetings';
	        newContent = '<a><h3>Sample Meeting 1</h3></a>' + 
                '<i>12/15/2009</i> - Sample meeting 1 leader<br /><br />' +
                '<a><h3>Sample Meeting 2</h3></a>' +
                '<i>12/20/2009</i> - Sample meeting 2 leader<br />';	        
	        break;
	    case 'y':
	        newHeader = 'Did You Know';
	        newContent = '<a><h3>Sample FAQ Title</h3></a><br />' + 
                'Sample FAQ answer<br /><br />';
            break;
        case 'x':
	        newHeader = 'Text Box';
	        if (optionID.charAt(0) == 'r')
	        {
	            newContent = $(rTextFieldID).value;	        
	        }
	        else
	        {
	            newContent = $(qTextFieldID).value;	        
	        }
	        break;
        case 'h':
	        newHeader = 'HTML Panel';
	        newContent = $(qHtmlFieldID).value;
	        break;
        case 'n':
	        newHeader = '';
	        newContent = '<br />';
	        break;		        
        default:
            newHeader = optionVal;
    }
           
    // Update page content
    if (newHeader != '')
    {
        $(panelID).set('class', 'activeColumnPanel');
        $(headerID).set('html', newHeader);
    }
    else
    {
        $(panelID).set('class', 'columnPanel');
        $(headerID).set('html', panelName);   
    }
    $(contentID).set('html', newContent);
    
    // Update menus
    if (optionVal != '')
    {
        SetContextMenuEditItems(menuName, optionVal);
        EnableColumnMenuItems(optionID, oldOptionVal, optionVal);
    }
}
function EnableColumnMenuItems(optionID, oldOptionVal, newOptionVal)
{
    EnableColumnMenuItem('c1ContextMenu', optionID, oldOptionVal, newOptionVal);
    EnableColumnMenuItem('c2ContextMenu', optionID, oldOptionVal, newOptionVal); 
    EnableColumnMenuItem('c3ContextMenu', optionID, oldOptionVal, newOptionVal);
    EnableColumnMenuItem('c4ContextMenu', optionID, oldOptionVal, newOptionVal);
    EnableColumnMenuItem('r1ContextMenu', optionID, oldOptionVal, newOptionVal);                    
    EnableColumnMenuItem('r2ContextMenu', optionID, oldOptionVal, newOptionVal);
    EnableColumnMenuItem('r3ContextMenu', optionID, oldOptionVal, newOptionVal);
    EnableColumnMenuItem('r4ContextMenu', optionID, oldOptionVal, newOptionVal);            
}
function EnableColumnMenuItem(menuID, optionID, oldOptionVal, newOptionVal)
{
    var oldOptionItem = '';
    switch (oldOptionVal)
    {
        case 'r': oldOptionItem = 'News';break;		        
        case 'm': oldOptionItem = 'Mission';break;
        case 'a': oldOptionItem = 'Announcements';break;
        case 'f': oldOptionItem = 'Services';break;
        case 't': oldOptionItem = 'Topics';break;
        case 'c': oldOptionItem = 'Events';break;
        case 'd': oldOptionItem = 'Meetings';break;
	    case 'y': oldOptionItem = 'FAQ';break;
        case 'x':
            if (optionID.charAt(0) == 'r')
            {
                oldOptionItem = 'RText';
            }
            else
            {
                oldOptionItem = 'Text';
            }          
        case 'h': oldOptionItem = 'HTML';break;
        default:
    }
    var newOptionItem = '';
    switch (newOptionVal)
    {
        case 'r': newOptionItem = 'News';break;		        
        case 'm': newOptionItem = 'Mission';break;
        case 'a': newOptionItem = 'Announcements';break;
        case 'f': newOptionItem = 'Services';break;
        case 't': newOptionItem = 'Topics';break;
        case 'c': newOptionItem = 'Events';break;
        case 'd': newOptionItem = 'Meetings';break;
	    case 'y': newOptionItem = 'FAQ';break;
        case 'x': 
            if (optionID.charAt(0) == 'r')
            {
                newOptionItem = 'RText';
            }
            else
            {
                newOptionItem = 'Text';
            }
            break;
        case 'h': newOptionItem = 'HTML';break;
        default:
    }    
    var menu = eo_GetObject(menuID);
    SetContextMenuItemEnabled(menu, oldOptionItem, true);
    SetContextMenuItemEnabled(menu, newOptionItem, false);        
}

function SetContextMenuEditItems(menuID, optionVal)
{
    var menu = eo_GetObject(menuID);
    var visible;
    visible = (optionVal == 'm' || optionVal == 'a' || optionVal == 'x' || optionVal == 'h' || optionVal == 't');
    SetContextMenuItemVisible(menu, 'separator', visible);
    visible = optionVal == 'a';
    SetContextMenuItemVisible(menu, 'EditAnnouncements', visible);
    visible = optionVal == 't';
    SetContextMenuItemVisible(menu, 'EditTopics', visible);        
    visible = optionVal == 'm';
    SetContextMenuItemVisible(menu, 'EditMission', visible);  
    visible = optionVal == 'x';
    SetContextMenuItemVisible(menu, 'EditText', visible);  
    visible = optionVal == 'h';
    SetContextMenuItemVisible(menu, 'EditHTML', visible);          
}

function InitPage()
{
    SetBannerImageContent();
    SetNoticeContent();
    SetNavigationContent();
    SetColumnPanel('q1');
    SetColumnPanel('q2');
    SetColumnPanel('q3');
    SetColumnPanel('q4');
    SetColumnPanel('r1');
    SetColumnPanel('r2');
    SetColumnPanel('r3');
    SetColumnPanel('r4');    
            
    htmlEditor = CKEDITOR.replace('htmlFieldTextBox', 
    {
        customConfig : '/scripts/ckeditor/TCconfig.js'
        
    });
           
}
function SetContextMenuItemEnabled(menu, itemID, enable)
{
    var menuItem = menu.getTopGroup().getItemById(itemID);
    if (menuItem != null) 
    {
        menuItem.setDisabled(!enable);
    }
}
function SetContextMenuItemVisible(menu, itemID, visible)
{
    var menuItem = menu.getTopGroup().getItemById(itemID);
    menuItem.setVisible(visible);
}
function GetOptionValue(optionID)
{
    var options = $(optionsFieldID).value;
    var optionIndex = options.indexOf(optionID);
    if (optionIndex != -1)
    {
        return options.charAt(optionIndex + 3);
    }
    else
    {
        return '';
    }
}