import Popup from 'react-popup'

export let syntaxYearPopup = Popup.register(
    {
        content:'The year has an invalid format. Must Follow this syntax: 2018-2019',
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let oldYearPopup = Popup.register(
    {
        content:'Year before the current one',
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let examTimePopup = Popup.register(
    {
        content:"The time for an exam must be between 8:30 and 17:30.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let examDatePopup = Popup.register(
    {
        content:"Please, insert a valid date.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let examCodePopup = Popup.register(
    {
        content:"The exam code has an invalid format. Must Follow this syntax: PROG18-01.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let examPlacePopup = Popup.register(
    {
        content:"Please, insert a valid place.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let classTeacherPopup = Popup.register(
    {
        content:"Please, select a teacher!",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)
export let classCodePopup = Popup.register(
    {
        content:"The class code has an invalid format. Must Follow this syntax: PROG18.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)
export let classDescriptionPopup = Popup.register(
    {
        content:"The class description is empty!",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let degreeDescriptionPopup = Popup.register(
    {
        content:"The degree description is empty!",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let degreeCodePopup = Popup.register(
    {
        content:"The degree unicode has an invalid format. Must Follow this syntax: INFO18",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)

export let markWrongPopup = Popup.register(
    {
        content:"The mark must be between 0 and 31.",
        buttons:{
            aligned:'right center',
            right:[{
                text: 'x',
                action: function(){ Popup.close();}
            }]
        }
    }
)