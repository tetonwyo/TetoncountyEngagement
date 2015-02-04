var Ticker = new Class({
	Implements: Options,
    options: {
			speed: 1000,
			delay: 5000,
			direction: 'vertical',
			onComplete: Class.empty,
			onStart: Class.empty
    },
	initialize: function(el,parent,options){
		this.setOptions(options);
		this.el = $(el);
		this.parent = $(parent);
		this.items = this.el.getElements('li');
		var w = 0;
		var h = 0;
		this.isScrollPaused = false;
		this.el.addEvent('mouseenter', function(){
            vert.pauseScroll(true);
        });
		this.el.addEvent('mouseleave', function(){
            vert.pauseScroll(false);
        });
		if(this.options.direction.toLowerCase()=='horizontal') {
			h = this.el.getSize().y;
			this.items.each(function(li,index) {
				w += li.getSize().x;
			});
		} else {
			w = this.el.getSize().x;
			this.items.each(function(li,index) {
				h += li.getSize().y;
			});
		}
		this.el.setStyles({
			position: 'absolute',
			top: 0,
			left: 0,
			width: w,
			height: h
		});
		if (h > this.parent.getSize().y)
		{
		    // Preload a copy of the list into the end of the existing list
		    // This provides for smoother transitioning since there's always a next <li> at the end
		    // There's probably a more glamorous way to do this by checking item heights, but this is easy and low impact
		    for (var j=0; j<this.items.length; j++)
		    {
		        this.items[j].clone().inject(this.el);
		    }
		    this.items = this.el.getElements('li');
    	    
    	    this.fx = new Fx.Morph(this.el,{duration:this.options.speed,onComplete:function() {
			    var i = (this.current==0)?this.items.length:this.current;
			    this.items[i-1].inject(this.el);
			    this.el.setStyles({
				    left:0,
				    top:0
			    });
		    }.bind(this)});
		    this.current = -1;
		    this.next();
		}
	},
	next: function() {
		if (!this.isScrollPaused)
		{
		    this.current++;
		    if (this.current >= this.items.length) this.current = 0;

		    var pos = this.items[this.current];
	        this.fx.start({
		        top: -pos.offsetTop,
		        left: -pos.offsetLeft
	        });
	    }
		this.next.bind(this).delay(this.options.delay+this.options.speed);
	},
	pauseScroll: function(pause) { 
	    this.isScrollPaused = pause;
	}
});


