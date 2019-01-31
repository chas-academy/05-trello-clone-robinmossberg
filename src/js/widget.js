;(function($, window, document, undefined){

	var pluginName = "boomBaby",
  defaults = {
  	className: 'boomster'
  };
  //Plugin contructor function
  function Plugin(element, options){
  	this.element = element;
    
    this.options = $.extend({}, defaults, options);
    
    this._default = defaults;
    this.name = pluginName;
    
    this.init();
  }
  
  Plugin.prototype = {
  	init: function() {
    this.boomifyFunction(this.element, this.options);
    	//where the magic happens
    },
    
    boomifyFunction: function(el, options) {
    console.log(el, options);
    }
  };
  
  $.fn[pluginName] = function(options) {
  return this.each(function(){
  	if(!$.data(this, "plugin_" + pluginName)) {
    	 $.data(this, "plugin_" + pluginName, new Plugin(this, options));
    }
  })
  }

})(jQuery, window, document);

$(document).ready(function(){
	$('#banner-message').boomify();
})