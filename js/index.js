var count = 30;
var stage;
var maxWidth;
var maxHeight;


$(document).ready(function(){
	init();
});


function init(){
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	maxWidth = $("#canvas").width();
	maxHeight =$("#canvas").height();
	stage.compositeOperation = "lighter";
	
	for(var i = 0; i<count; i++){
		var myShape = new createjs.Shape();
		//ランダムな色を取得
		var randomColor = "#" + Math.floor(Math.random()*0xFFFFFF).toString(16);
		myShape.vx = myShape.x = Math.random()*maxWidth;
		myShape.vy = myShape.y = Math.random()*maxHeight;
		myShape.rot = Math.random()*360;
		myShape.radius = 10+(Math.random()*100);
		myShape.speed = (9-myShape.radius*0.1)/4;
		
		var graphics = myShape.graphics;
		graphics.beginFill(randomColor);
		graphics.drawCircle(0, 0, myShape.radius);
		
		var blurStrong = 0.5+myShape.radius/5;
		var blurFilter = new createjs.BoxBlurFilter(blurStrong, blurStrong, 2);
		myShape.filters = [blurFilter];
		var margins = blurFilter.getBounds();
		myShape.cache(-myShape.radius+margins.x-7, -myShape.radius+margins.y-7, myShape.radius*2+margins.width+14, myShape.radius*2+margins.height+14);
				
		stage.addChild(myShape);
	}
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);
	stage.update();
}


function tick(){
	var l = stage.getNumChildren();
	for(var i=0; i<l; i++){
		var circle = stage.getChildAt(i);
		circle.vx += Math.cos(circle.rot*Math.PI/180)*circle.speed;
		circle.vy += Math.sin(circle.rot*Math.PI/180)*circle.speed;
		circle.x = circle.vx;
		circle.y = circle.vy;
		
		if(circle.x > maxWidth+circle.radius){
			circle.x = circle.vx = -circle.radius;
		}else if(circle.x < -circle.radius){
			circle.x = circle.vx = maxWidth+circle.radius;
		}
		if(circle.y > maxHeight+circle.radius){
			circle.vy = circle.y = -circle.radius;
		}else if(circle.y < -circle.radius){
			circle.vy = circle.y = maxHeight + circle.radius;
		}
	}
	stage.update();
}
