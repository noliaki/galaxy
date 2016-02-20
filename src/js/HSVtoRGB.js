var HSVtoRGB = function(h, s, v){
  "use strict";
  var hi = (h / 60) >> 0,
      f = (h / 60 - hi),
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      r,g,b;

  if (s === 0){
    r = g = b = parseInt(v * 255, 10);
    return {
      "R": r,
      "G": g,
      "B": b,
      "RGBA": "rgba(" + r + "," + g + "," + b + ")"
    };
  }

  switch( hi ){
    case 0 :
      r = parseInt(v * 255, 10);
      g = parseInt(t * 255, 10);
      b = parseInt(p * 255, 10);
    break;

    case 1 :
      r = parseInt(q * 255, 10);
      g = parseInt(v * 255, 10);
      b = parseInt(p * 255, 10);
    break;

    case 2 :
      r = parseInt(p * 255, 10);
      g = parseInt(v * 255, 10);
      b = parseInt(t * 255, 10);
    break;

    case 3 :
      r = parseInt(p * 255, 10);
      g = parseInt(q * 255, 10);
      b = parseInt(v * 255, 10);
    break;

    case 4 :
      r = parseInt(t * 255, 10);
      g = parseInt(p * 255, 10);
      b = parseInt(v * 255, 10);
    break;

    case 5 :
      r = parseInt(v * 255, 10);
      g = parseInt(p * 255, 10);
      b = parseInt(q * 255, 10);
    break;
  }

  return {
    "R": r,
    "G": g,
    "B": b,
    "RGBA": "rgba(" + r + "," + g + "," + b + ")"
  };
};

export default HSVtoRGB;