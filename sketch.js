//Create variables here
var sadDog, happyDog,dog;
var database;
var foodS, foodStock;
var foodObj,fedTime,lastFed,feed,add,play,park,sleep,bath;
var bedroom,washroom,livingroom,garden;


function preload() {
  //load images here
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
 bedroom = loadImage("Bed Room.png");
  washroom = loadImage("Wash room.png");
  livingroom = loadImage("Living Room.png");
  garden = loadImage("Garden.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 800);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(900,450);
  dog.addImage(sadDog);
  dog.scale = 0.5;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  add = createButton("Add food");
  add.position(800,95);
  add.mousePressed(addFood);

  play = createButton("Let's play !");
  play.position(845,120);

  park = createButton("Let's play in the park");
  park.position(700,120);

  sleep = createButton("I am very sleepy");
  sleep.position(935,120);

  bath = createButton("I want to take a bath");
  bath.position(875,95);

}


function draw() {
  background(46, 139, 87);

 foodObj.display();

 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed = data.val();
 })

fill(255,255,255);
textSize(15);
if(lastFed >= 12){
  text("Last Fed : " + lastFed % 12 + "PM",350,30);
}
else if(lastFed == 0){
  text("Last Fed : 12AM ",350,30)
}
else{
  text("Last Fed : " + lastFed + "AM",350,30)
}

drawSprites();

}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFood(){
  foodS+1;
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    Food : foodS
  })
}

