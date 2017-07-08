'use strict';
var
 animationAdd = (function()
{
// フレーム書き換え用
  var fList = {};
  setInterval((function()
  {
    var
     canvas = document.getElementById('canvas'),
     ctx = canvas.getContext('2d');
    return function()
    {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      for (var i in fList)
      { if (! fList[i](ctx)) delete fList[i]; }
    };
  }()), 16);
  return (function()
  {
    var num = 0;
    return function(func){ fList[num ++] = func; };
  }());
}()),

 arc = function(xy, r, rgb, alpha)
{
  alpha = alpha || 1;
  rgb = rgb || [0,0,0];
  return function(ctx)
  { 
    if (!r || alpha < 0) return false;
    ctx.fillStyle =
      'rgba('+
        rgb[0] +','+ rgb[1] +','+ rgb[2] +','+
        alpha +
      ')';
    ctx.beginPath();
    ctx.arc(xy[0], xy[1], r, 0, Math.PI * 2, true);
    ctx.fill();
    r --;
    alpha -= 0.00888;
    return true;
  };
},

 addRandomObj = function()
{
  var
   SIZE = 400,
   rand = function(x)
  { return Math.floor(Math.random() * x); },
   randomArc = function()
  {
    var
     xy = [rand(SIZE), rand(SIZE)],
     r = rand(150),
     rgb = [rand(255), rand(255), rand(255)],
     alpha = Math.random(),
     arcObj = arc(xy, r, rgb, alpha);
    animationAdd(arcObj);
  };
  (function(func)
  {
    var loop = function()
    {
      func();
      setTimeout(loop, rand(750));
    };
    loop();
  }(randomArc));
};
addRandomObj();