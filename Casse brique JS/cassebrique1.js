<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Gamedev Canvas Workshop</title>
    <style>
    	* { padding: 0; margin: 0; }
    	/* L'élément <canvas> contiendra le rendu du jeu */
    	canvas { background: #eee; display: block; margin: 0 auto; }
    </style>
</head>
<body>
	<canvas id="myCanvas" width="640" height="480"></canvas>

	<!-- emplacement du code JavaScript pour contrôler le jeu -->
	<script>
		
		
		// Variable, référence à l'élément <canvas>
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var x = canvas.width/2;
		var y = canvas.height-30;
		var dx = 2;
		var dy = -2;
		var ballRadius = 14;

		var paddleHeight = 15;
		var paddleWidth = 75;
		var paddleX = (canvas.width-paddleWidth)/2;
		var rightPressed = false;
		var leftPressed = false;

		var brickRowCount = 5;
		var brickColumnCount = 7;
		var brickWidth = 65;
		var brickHeight = 40;
		var brickPadding = 12;
		var brickOffsetTop = 30;
		var brickOffsetLeft = 48;
		var score = 0;
		var lives = 3;
		var niveau = 1;
		



		/*

		var bricksColors = [];
		for(var c=0; c<brickColumnCount; c++) 
		{
  			bricksColors[c] = [];
  			for(var r=0; r<brickRowCount; r++) 
  			{
    			bricksColors[c][r] = '#'+Math.random().toString(16).substr(2,6);
  			}
		} 

		*/


		var bricks = [];
		for(var c=0; c<brickColumnCount; c++) 
		{
  			bricks[c] = [];
  			for(var r=0; r<brickRowCount; r++) 
  			{
    			bricks[c][r] = { x: 0, y: 0, status: 1 };
  			}
		}


					

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);


		function mouseMoveHandler(e)
		{
		    var relativeX = e.clientX - canvas.offsetLeft;
		    if(relativeX > 0 && relativeX < canvas.width) 
		    {
		        paddleX = relativeX - paddleWidth/2;
		    }
		}


			function keyDownHandler(e) 
			{
    			if(e.keyCode == 39) 
    			{
        			rightPressed = true;
    			}

    			else if(e.keyCode == 37) 
    			{
        			leftPressed = true;
    			}
			}



			function keyUpHandler(e) 
			{
    			if(e.keyCode == 39) 
    			{
        			rightPressed = false;
    			}

    			else if(e.keyCode == 37) 
    			{
        			leftPressed = false;
    			}
			}



			function collisionDetection() 
			{
    			for(var c=0; c<brickColumnCount; c++) 
    			{
        			for(var r=0; r<brickRowCount; r++) 
        			{
            			var b = bricks[c][r];
            			if(b.status == 1) 
            			{
                			if(x+ballRadius > b.x && x-ballRadius < b.x+brickWidth && y+ballRadius > b.y && y-ballRadius < b.y+brickHeight) 
                			{
                    			
                    			if(dx > 0 && dy > 0) 
                				{	
                					if(x > b.x)
									{
										dy = -dy
									}
									else
									{
										dx = -dx
									}
								}
								
								else if(dx >0 && dy < 0)
								{	
									if(x > b.x)
									{
										dy = -dy
									}
									else
									{
										dx = -dx
									}
								}
								else if(dx <0 && dy < 0)
								{	
									if(x < b.x+brickWidth)
									{
										dy = -dy
									}
									else
									{
										dx = -dx
									}
								}
								else if(dx <0 && dy > 0)
								{	
									if(x < b.x+brickWidth)
									{
										dy = -dy
									}
									else
									{
										dx = -dx
									}
								}


								

	                   			b.status = 0;
	                   			score++;
	                   			if(score == brickRowCount*brickColumnCount) 
	                    		{
	                    			alert("YOU WIN !");
	                    			document.location = "http://www.mozilla.org";
	                    		}
	                        }
        				}
           			}
        		}
    		}


///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////



		function drawBall() 
		{
  			ctx.beginPath();
  			ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  			ctx.fillStyle = "#FF0000";
  			ctx.fill();
  			ctx.closePath();
		}

		function drawPaddle() 
		{
   			ctx.beginPath();
    		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    		ctx.fillStyle = "#0000FF";
    		ctx.fill();
    		ctx.closePath();
		}


		function drawBricks() 
		{
    		for(var c=0; c<brickColumnCount; c++) 
    		{
        		for(var r=0; r<brickRowCount; r++) 
        		{
            		if(bricks[c][r].status == 1) 
            		{
		                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
		                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

		                bricks[c][r].x = brickX;
		                bricks[c][r].y = brickY;
		                ctx.beginPath();
		                ctx.rect(brickX, brickY, brickWidth, brickHeight);
		                ctx.fillStyle = '#'+Math.random().toString(16).substr(2,6);
		                ctx.fill();
		                ctx.closePath();
		            }
		        }
		    }
		}


		function drawScore() 
		{
		  ctx.font = "16px Arial";
		  ctx.fillStyle = "#0095DD";
		  ctx.fillText("Score: " + score, 8, 20);
		}

		function drawLives() 
		{
		    ctx.font = "16px Arial";
		    ctx.fillStyle = "#0095DD";
		    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
		}

		function drawNiveau() 
		{
		    ctx.font = "16px Arial";
		    ctx.fillStyle = "#0095DD";
		    ctx.fillText("niveau: "+niveau, canvas.width/2, 20);
		}

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

		function draw() 
		{
  			ctx.clearRect(0, 0, canvas.width, canvas.height);
  			drawBall();
  			drawPaddle();
  			drawBricks();
  			drawScore();
  			collisionDetection();
  			drawLives();
  			drawNiveau();

  			if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
  			{
    			dx = -dx;
			}

			if(y + dy < ballRadius) 
			{
  				dy = -dy;
			} 

			else if(y + dy > canvas.height-ballRadius) 
			{
    			if(x > paddleX && x < paddleX + paddleWidth) 
    			{
        			dy = -dy;
    			}

    			else 
    			{
        			lives--;
					if(!lives) 
					{
					    alert("GAME OVER");
					    document.location.reload();
					}

					else 
					{
					    x = canvas.width/2;
					    y = canvas.height-30;
					    dx = 2;
					    dy = -2;
					    paddleX = (canvas.width-paddleWidth)/2;
					}
    			}
			}

			if(rightPressed && paddleX < canvas.width-paddleWidth) 
			{
   				paddleX += 6;
			}

			else if(leftPressed && paddleX > 0) 
			{
    			paddleX -= 6;
			}




///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

			




  			x += dx;
  			y += dy;
  			requestAnimationFrame(draw);
		}

		draw();


	"/Users/maximeleteno/Desktop/Cours/Casse brique JS/cassebrique1.js"
	</script>

</body>
</html>