
/********************************************************************************************************
 *																										*
 										Created BY : Nishit Mehta( Perception System )
										Date : 14 - May - 2013
 *																										*
 *******************************************************************************************************/	

/*
	
	How to use plugin
	
	=> $("body").loader({"imageArray" : imageArray});
		   Array of images need is compulsory options.
		   create array of iamges need to be load in the website for example
		   var imageArray = [
			'http://www.graphviz.org/sites/default/files/graphviz_test_fit_path.PNG',
			'http://i.stack.imgur.com/uWJtD.png',
			'http://www.foamwork.net/images/fw4-6.jpg'
			];	
	
	=> $("body").loader({
		  "imageArray" : vars.imageArray,
		  "onComplete" : function(){
				alert( "Done" ); 
			} 
		});
		
		Ues with other options

*/

(function ( $ ) {
	
	var loaderOptions = {
		  "onComplete" : function(){},
		  "imageArray": [],  // These are the defaults
		  "overlayBG": "#000",
		  "titleBG" : "#fff",
		  "title"  : "Please Wait!"
	 }	

	var loader = {
		counterOverlayOBJ : '',
		counterOverlayOBJ : '',
		titleOverlayOBJ   : '',
		backOverlayOBJ    : '',
		titleHolderOverlayOBJ : '',
		loaderCounter : -1,
		loaderPer  : '',
		loaderText :  '',	
		'init' : function(){
			
			this.createoverlay();
			$.each( loaderOptions.imageArray ,function(i,path) {
				 var loadImage = new Image();
				 loadImage.onload = function() {
					  loader.loaderCounter ++;
					  loader.loaderPer = (loader.loaderCounter + 1) * (100 / loaderOptions.imageArray.length);
					  if(loader.loaderPer >=100 ) {
						loader.overlayDestory();
					  }
					 
					  /*$( loader.backOverlayOBJ ).stop().animate({
							width: loader.loaderPer + "%",
							minWidth: loader.loaderPer + "%"
					  }, 200);
*/
					  loader.loaderText = Math.floor(loader.loaderPer)+'%';
					  $('#counterOverlay').text(loader.loaderText);
				 }
				loadImage.src = path;
		  });
		  
		},
		'createoverlay' : function(){
			
			this.overlayOBJ = $( '<div id="mainOverlay"></div>' ).css({
				width    : '100%',
				height   : '100%',
				backgroundColor : loaderOptions.overlayBG,
				backgroundPosition: "fixed",
				position: "fixed",
				zIndex: 9000000,
				top: 0,
				left: 0
			}).appendTo('body');
			//this.titleHolderOverlay();
			this.counteroverlay();
			
		},
		'titleHolderOverlay' : function(){
			this.titleHolderOverlayOBJ = $( '<div id="titleHolderOverlay"></div>' ).css({
					height: "30px",
					width: "100px",
					position: "absolute",
					top : Math.max(0, (($(window).height() - 30) / 2)),
					left: Math.max(0, (($(window).width() - 100) / 2)),
			}).appendTo(this.overlayOBJ);
			this.backOverlay();
			this.titleOverlay();
			
		},
		'backOverlay'  : function(){
			this.backOverlayOBJ = $( '<div id="backOverlay"></div>' ).css({
					height: "100%",
					width: "0%",
					position: "absolute",
					backgroundColor: loaderOptions.titleBG,
			}).appendTo(this.titleHolderOverlayOBJ);
		},
		'titleOverlay' : function(){
			
			this.titleOverlayOBJ = $( '<div id="titleOverlay"></div>' ).text(loaderOptions.title).css({
					height: "100%",
					width: "100%",
					position: "absolute",
					'color' : 'gray',
					'opacity' : '0.4'
			}).appendTo(this.titleHolderOverlayOBJ);
			
		},
		'counteroverlay' : function(){
			
			this.counterOverlayOBJ = $( '<div id="counterOverlay"></div>' ).text("0%").css({
				height: "40px",
					position: "absolute",
					fontSize: "20px",
					top: "50%",
					left: "51%",
					marginTop: "-" + (59 + 1) + "px",
					textAlign: "center",
					marginLeft: "-50px",
					color: '#fff'
			}).appendTo(this.overlayOBJ);
			
		},
		'overlayDestory' : function(){
			
			this.overlayOBJ.fadeOut( 'slow',function(){
				loaderOptions.onComplete();
				$(this).remove();
			}); 
			
		}
	} 

	$.fn.loader = function( options ) {
		if(options) {
			 $.extend(loaderOptions, options );
		}
		loader.init();
	};
	
}( jQuery ));











