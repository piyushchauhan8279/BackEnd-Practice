let getArea=function calculateArea(height,width){
  return height*width;
}

let width=100, height=5;

let area=getArea(height,width)
if(area>100){
  console.log("The area is large");
}
else{
  console.log("the area is small");
}

if(height*width>=100){
    console.log("area is greater than and equal to 100");
}