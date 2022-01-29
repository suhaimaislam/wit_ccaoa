// Quick touch feature detection
function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

// Add event handling to every state (region)
jQuery(function(){
	addEvent('map_al');
	addEvent('map_ak');
	addEvent('map_az');
	addEvent('map_ar');
	addEvent('map_ca');
	addEvent('map_co');
	addEvent('map_ct');
	addEvent('map_de');
	addEvent('map_fl');
	addEvent('map_ga');
	addEvent('map_hi');
	addEvent('map_id');
	addEvent('map_il');
	addEvent('map_in');
	addEvent('map_ia');
	addEvent('map_ks');
	addEvent('map_ky');
	addEvent('map_la');
	addEvent('map_me');
	addEvent('map_md');
	addEvent('map_ma');
	addEvent('map_mi');
	addEvent('map_mn');
	addEvent('map_ms');
	addEvent('map_mo');
	addEvent('map_mt');
	addEvent('map_ne');
	addEvent('map_nv');
	addEvent('map_nh');
	addEvent('map_nj');
	addEvent('map_nm');
	addEvent('map_ny');
	addEvent('map_nc');
	addEvent('map_nd');
	addEvent('map_oh');
	addEvent('map_ok');
	addEvent('map_or');
	addEvent('map_pa');
	addEvent('map_ri');
	addEvent('map_sc');
	addEvent('map_sd');
	addEvent('map_tn');
	addEvent('map_tx');
	addEvent('map_ut');
	addEvent('map_vt');
	addEvent('map_va');
	addEvent('map_wa');
	addEvent('map_wv');
	addEvent('map_wi');
	addEvent('map_wy');
	addEvent('map_dc');
	addEvent('map_pr');
	addEvent('map_vi');
})

// Set styles for lakes, tooltip, and shadow, which is not needed if we can control via CSS
/* jQuery(function(){
	if(jQuery('#lakes').find('path').eq(0).attr('fill') != 'undefined'){
		jQuery('#lakes').find('path').attr({'fill':map_config['default']['lakesColor']}).css({'stroke':map_config['default']['borderColor']});
	}

	jQuery('#map-tip').css({
		'box-shadow':'1px 2px 4px '+map_config['default']['hoverShadow'],
		'-moz-box-shadow':'2px 3px 6px '+map_config['default']['hoverShadow'],
		'-webkit-box-shadow':'2px 3px 6px '+map_config['default']['hoverShadow'],
	});

	if(jQuery('#shadow').find('path').eq(0).attr('fill') != 'undefined'){
		var shadowOpacity = map_config['default']['shadowOpacity'];
		var shadowOpacity = parseInt(shadowOpacity);
		if (shadowOpacity >=100){shadowOpacity = 1;}else if(shadowOpacity <=0){shadowOpacity =0;}else{shadowOpacity = shadowOpacity/100;}

		jQuery('#shadow').find('path').attr({'fill':map_config['default']['mapShadow']}).css({'fill-opacity':shadowOpacity})
	}
}); */

// By default, hide the map-tip tooltip.
// jQuery('#map-tip').hide();

function addEvent(id,relationId){

	// Variable to reference the region
	var _obj = jQuery('#'+id);

	// Variable to reference the region and associated text (text + object)
	var _Textobj = jQuery('#'+id+','+'#'+map_config[id]['namesId']);

	// Set text styling
	// jQuery('#'+['text-abb']).attr({'fill':map_config['default']['namesColor']});
	// jQuery('#'+['sm-text-abb']).attr({'fill':map_config['default']['smallNamesColor']});

	// _obj.attr({'fill':map_config[id]['defaultColor'],'stroke':map_config['default']['borderColor']});
	// _obj.attr({'fill':map_config[id]['defaultColor']});

	// By default, show the default cursor appearance, which we'll override as needed.
	_Textobj.attr({'cursor':'default'});

	if (map_config[id]['mapOption'] == 'licensing') {
		// If the map item is enabled, e.g. shown on the map
		if(map_config[id]['enable'] == true){

			var hoverValue = map_config[id]['hover'];

			// Show a pointer icon when visitor hovers over text or region, if there is a hoverValue
			if( hoverValue.length > 0 ) {
				_Textobj.attr({'cursor':'pointer'});
			}

			// Handle a click on a state
			_Textobj.click(function(e){

				// Don't propagate up the DOM because we have another function where check whether the visitor clicked on a featured object.
				e.stopPropagation();

				// Show infobox, and let it persist
				if( hoverValue.length > 0 ) {
					jQuery('#map-tip').show().html(map_config[id]['hover']);

					// Position infobox based on initial cursor position and size of screen
					var x=e.pageX+10,
						y=e.pageY+15;
					var tipw=jQuery('#map-tip').outerWidth(),
						tiph=jQuery('#map-tip').outerHeight(),
						x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
						y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
					jQuery('#map-tip').css({left:x, top:y})
				} else {
					jQuery('#map-tip').hide();
				}
			});
		}
	}
	else {
		
		// Change URL based on language, if constant exists
		if( mapCurrentLanguage ) {
			if( mapCurrentLanguage == 'es' ) {
				// Set url based on language
				map_config[id]['url'] = map_config[id]['url_es'];
			}
		} // otherwise, use existing 'url' value

		_obj.attr({'fill':map_config[id]['overColor'],'stroke':map_config['default']['borderColor']});
		_Textobj.attr({'cursor':'default'});
		if(map_config[id]['enable'] == true){
			if (isTouchEnabled()) {
				//clicking effect
				_Textobj.on('touchstart', function(e){
					var touch = e.originalEvent.touches[0];
					var x=touch.pageX+10, y=touch.pageY+15;
					var tipw=jQuery('#map-tip').outerWidth(), tiph=jQuery('#map-tip').outerHeight(), 
					x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
					y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
					jQuery('#'+id).css({'fill':map_config[id]['downColor']});
					jQuery('#map-tip').show().html(map_config[id]['hover']);
					jQuery('#map-tip').css({left:x, top:y})
				})
				_Textobj.on('touchend', function(){
					jQuery('#'+id).css({'fill':map_config[id]['upColor']});
					if(map_config[id]['target'] == 'new_window'){
						window.open(map_config[id]['url']);	
					}else if(map_config[id]['target'] == 'same_window'){
						window.parent.location.href=map_config[id]['url'];
					}
				})
			}
			_Textobj.attr({'cursor':'pointer'});
			_Textobj.hover(function(){
				//moving in/out effect
				jQuery('#map-tip').show().html(map_config[id]['hover']);
				_obj.css({'fill':map_config[id]['overColor']})
			},function(){
				jQuery('#map-tip').hide();
				jQuery('#'+id).css({'fill':map_config[id]['overColor']});
			})
			//clicking effect
			_Textobj.mousedown(function(){
				jQuery('#'+id).css({'fill':map_config[id]['defaultColor']});
			})
			_Textobj.click(function(){
				// jQuery('#'+id).css({'fill':map_config[id]['overColor']});
				if(map_config[id]['target'] == 'new_window'){
					window.open(map_config[id]['url']);	
				}else if(map_config[id]['target'] == 'same_window'){
					window.parent.location.href=map_config[id]['url'];
				}
			})
			_Textobj.mousemove(function(e){
				var x=e.pageX+10,
					y=e.pageY+15;
				var tipw=jQuery('#map-tip').outerWidth(),
					tiph=jQuery('#map-tip').outerHeight(),
					x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
					y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
				jQuery('#map-tip').css({left:x, top:y})
			})
		}	
	}

	if (map_config[id]['mapOption'] == 'licensing') {
		// Hide the map tip if a person clicks somewhere that's not a featured region
		jQuery('html').click(function(e) {
			if( !jQuery(e.target).hasClass('featured') )
			{
				jQuery('#map-tip').hide();
			}
		});
	}
}