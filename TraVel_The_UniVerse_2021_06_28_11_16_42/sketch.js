/*Universe is much much larger than our thinking. That's why there is many misterious things in our universe. We have been curious till today and are finding a planet like earth. We haven't find yet but still there is a hope. We will be finding. So don't waste time. Let's go on a journey and travel the universe. */

//At first we will travel the moon. Check your concentration level by reaching the moon.
//Declare the rocket, and rocket Image.
var rocket, rocketImg;

//Declare the background and the image.
var back, backImg, backImg2, backImg3, backImg4;

//sounds

//Declare the alien rockets and their image
var alien, alienImg, alien2Img, alien3Img;

//Declare the asteroids and their image
var asteroid, astImg, astImg2, astImg3, astG;

//GameStates
var gameState, start, play, end, win;
start = 0;
play = 1;
end = 2;
win=3;
//now gameState is in start
gameState = start;

//Score, initially, is 0 and will be incremented when passing through the space
var score = 0;

//Declare the Play button and the image
var resume, resumeImg;

//THe clouds
var burst, burstImg, burstImg2;

//Distance
var distance=0;

function preload() {
  //  Load the sounds and images.
  rocketImg = loadImage("rocket.png");
  backImg = loadImage("back.png");
  backImg2 = loadImage("solarSystem.jpg");
  backImg3 = loadImage("space.jpg");
  backImg4 = loadImage("moon2.jpg");
  alienImg = loadImage("alien1.png");
  alien2Img = loadImage("alien2.png");
  alien3Img = loadImage("alien3.png");
  resumeImg = loadAnimation("donut1.png", "donut2.png");
  burstImg = loadImage("burst.png");
  astImg=loadImage("asteroid.png");
  astImg2=loadImage("asteroid2.png");
  astImg3=loadImage("asteroid3.png");
  burstImg2=loadImage("burst2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  back = createSprite(width / 2, height / 2);
  back.addImage("background", backImg);
  back.addImage("solarSystem", backImg2);
  back.addImage("space1", backImg3);
  back.addImage("moon",backImg4);
  back.scale = 3.5;

  rocket = createSprite(width / 2, height / 1.1);
  rocket.addImage("rocket", rocketImg);
  rocket.rotation = -52;
  rocket.scale = 0.7;

  resume = createSprite(width / 2, height / 2);
  resume.addAnimation("play", resumeImg);

  burst = createSprite(0, 0);
  burst.x = width / 2;
  burst.y = height / 1.2;
  burst.scale = burst.scale + 0.02;
  burst.addImage("burst", burstImg);
  burst.addImage("burst2",burstImg2);
  burst.visible = false;

  astG=new Group();
}

function draw() {
  background(0);
  drawSprites();
  console.log(gameState);
  rocket.setCollider("circle",0,0,70)
  //Write a full set of incidents that should take place when gameState is start
  if (gameState === start) 
  {
    textSize(20);
    stroke("purple");
    fill("crimson");
    text("Pass all the asteroids and reach moon. Good luck!",width/3,height/3);
    rocket.x=width/2;
    rocket.rotation = -52;
    //rocket.debug=true;

    back.changeImage("background", backImg);

    burst.visible = false;
    

    resume.visble = true;
    resume.rotationSpeed = 1;
    //Start the game when the donut is clicked
    if (mousePressedOver(resume)) 
    {
      rocket.velocityY = -5;
      resume.visible = false;
    }
    //Make the clouds when rocket reaches a particular height
    if (rocket.y < height / 1.2) 
    {
      burst.changeImage("burst", burstImg);
      burst.visible = true;
      burst.x=rocket.x;
      burst.y=height/1.2;
      //Spread the clouds
      if(frameCount%1===0)
      { 
        burst.scale=burst.scale+0.01;
      }
    }
    //Start the journey when the rocket reaches the sky
    if (rocket.y < -20) 
    {
      gameState = play;
    }
  }
console.log(distance);
  if (gameState === play) 
  {
    textSize(20);
    textFont("Georgia");
    stroke("blue");
    fill("skyblue");
    text("Distance :"+distance+"km",width/3,height/9);
    if(frameCount%1===0)
    {
       distance=distance+1;
    }

    burst.visible = false;

    rocket.x = width / 9;
    rocket.rotation = -52 + 90;
    rocket.y = World.mouseY;

    back.changeImage("space1", backImg3);
    back.scale = 3.7;
    back.velocityX=-(4+score);

    if(back.x<width-width/2)
    {
      back.x=width/1.2;
    }
    spawnAsteroid();
    
    if(astG.isTouching(rocket))
    {
      gameState=end;
    }

    /*Rocket will reach moon after 384,400 km as moon is 384400 km away from us, earthians[the dwellers of earth].*/
    /* For checking the game whether it's working or not just change the value of dom, abbreviate of distance of moon*/
    var dom=384400;
    if(distance>dom)
    {
      back.changeImage("moon",backImg4);
      back.scale=2.7;
      gameState=win;
      rocket.velocityY=0;
    }
  }
  else if(gameState===end)
  {
    textSize(20);
    stroke("red");
    fill("crimson");
    text("That's ok. You can win next time. All the best!",width/3,height/2);
    astG.setVelocityXEach(0);
    back.velocityX=0;
    rocket.velocityY=0;
    burst.visible=true;
    burst.changeImage("burst2",burstImg2);
    burst.x=rocket.x+50;
    burst.y=rocket.y;
    if(frameCount%1===0)
    { 
      burst.scale=burst.scale+0.01;
    }
    resume.visible=true;
    resume.depth=burst.depth+1;
    restart();
  }
  else if(gameState===win)
  {
    textSize(20);
    stroke("navy");
    fill("blue");
    var t=text("Wow! That's fabulous. You reach the moon like Nil Amstrong",width/3,height/2);
    astG.destroyEach();
    restart();
  }
}

function spawnAsteroid()
{
  var r=Math.round(random(1,3));
  if(frameCount%(50)===0)
  {
    asteroid=createSprite(width+50,0);
    asteroid.y=Math.round(random(0,height));
    asteroid.velocityX=Math.round(random(-1,-8));
    //asteroid.velocityY=Math.round(random(-1,1));
    asteroid.rotationSpeed=Math.round(random(-1.5,2.5));
    //asteroid.debug=true;
    burst.depth=asteroid.depth+1;
    astG.add(asteroid);
    switch(r)
    {
      case 1: asteroid.addImage("Asteroid1",astImg);
              asteroid.scale=0.3;
      break;
      case 2: asteroid.addImage("Asteroid2",astImg2);
              asteroid.scale=1.5;
              asteroid.setCollider("circle",0,0,30);
      break;
      case 3: asteroid.addImage("Asteroid2",astImg3);
              asteroid.scale=1.5;
              asteroid.setCollider("circle",0,0,30);
      break;
    }
  }
}

function restart()
{
  if(mousePressedOver(resume))
  {
    gameState=start;
    astG.destroyEach();
    rocket.y=height/1.1;
    burst.scale=1.02;
    back.x=width/2;
    distance=0;
  }
}
