/**
 * jlchapa / 2015
 * This is a modification from the original code by grgrdvrt.
 * The original can bo found here: http://www.grgrdvrt.com/miam/boids/
 */


 function Boid(t)
 {
 	this.pos = new geom.Vector2D();
 	this.vel = new geom.Vector2D();
 	this.tail = [];
 	for(var i = 0; i < t; i++)
 		this.tail.push(new geom.Vector2D());
 	this.age = 0;  //Added a variable to create a lifespan for the organism
 	this.collision = false;
 }

 function Attractor(a){
 	this.age = age || 0;
 	this.pos = new geom.Vector2D();
 }


 function flocking() {

 	var boids;
 	var attractors;
 	var n,w,h, bounceOnEdge = false;
 	var r, r2, maxVel, maxVel2;
 	var tempV = new geom.Vector2D();

 	this.getBoids = function() { return boids; };
 	this.getAttractors = function() { return attractors; };

 	this.addBoid = function(t, randomPosition){

 			var b = new Boid(t);
 			if(randomPosition){
 				b.pos.x = Math.random() * w;
 				b.pos.y = Math.random() * h;
 			}else{
 				b.pos.x = 0.5 * w;
 				b.pos.y = 0.5 * h;
 			}

 			b.vel.x = 0.5 * (Math.random() * 2 - 1) * maxVel;
 			b.vel.y = 0.5 * (Math.random() * 2 - 1) * maxVel;

 			for(var j = 0; j < t; j++)
 				b.tail[j].set(b.pos.x, b.pos.y);

 			boids.push(b);
 	}

 	this.addAttractor = function(){

 			var a = new Attractor();
 			if(false){
 				a.pos.x = Math.random() * w;
 				a.pos.y = Math.random() * h;
 			}else{
 				a.pos.x = 0.5 * w;
 				a.pos.y = 0.5 * h;
 			}

 			attractors.push(a);
 	}

 	this.init = function(boidsCount, width, height, tailLength, radius, radius2, maxVelocity, randomPosition, bounce)
 	{
 		n = boidsCount;
 		w=width;
 		h=height;
 		r = radius || 100;
 		r2 = radius2 || 200;
 		maxVel = maxVelocity || 10;
 		maxVel2 = maxVel * maxVel;
 		bounceOnEdge = bounce || false;
 		var t = tailLength || 12;

 		boids = [];
 		for(var i = 0; i < n; i++)
 		{
 			this.addBoid(t, randomPosition);
 		}

 	}

 	this.update = function()
 	{

 		for (var i = 0; i < boids.length; i++) 
 		{
 			var b = boids[i];
 			tempV.set(b.pos.x, b.pos.y);

 			//b.vel.add(rule1(b));
 			b.vel.add(rule2(b));
 			b.vel.add(rule3(b));


 			if(b.vel.getLength2() > maxVel2)
 				b.vel.setLength(maxVel);
 			b.pos.add(b.vel);

 			var t = b.tail.length;
 			for(var j = 0; j < t; j++)
 			{
 				var p = b.tail[j];
 				var x = p.x;
 				var y = p.y;
 				p.set(tempV.x, tempV.y);
 				tempV.set(x, y);
 			}

 			if(bounceOnEdge){
 				if(b.pos.x < 0) {
 					b.pos.x = 0; b.vel.x *= -1;
 				}
 				else if(b.pos.x > w) {
 					b.pos.x = w; b.vel.x *= -1; 
 				}

 				if(b.pos.y < 0) { 
 					b.pos.y = 0; b.vel.y *= -1; 
 				}
 				else if(b.pos.y > h) { 
 					b.pos.y = h; b.vel.y *= -1; 
 				}
 			}else{
 				if(b.pos.x < 0) {
 					b.pos.x = w;
 				}
 				else if(b.pos.x > w) {
 					b.pos.x = 0;
 				}

 				if(b.pos.y < 0) { 
 					b.pos.y = h;
 				}
 				else if(b.pos.y > h) { 
 					b.pos.y = 0;
 				}
 			}
 			

 		}

 	}

	//cohesion
	function rule1(b)
	{
		var v = new geom.Vector2D();
		v.x = v.y = 0;
		var nd = 0; //number of boids that fit the rule
		for (var i = 0; i < boids.length; i++) 
		{
			var b2 = boids[i];
			if (b2 != b)
			{
				var d = geom.Vector2D.distance2(b.pos, b2.pos);
				if (d < r)
				{					
					v.add(b2.pos);
					nd++;
				}
			}
		}
		if(nd)
		{
			v.scale(1 / nd); //average the velocity
			v.subtract(b.pos);
			v.scale(0.01);
		}
		return v;
	}
	
	//separation
	function rule2(b)
	{
		var v = new geom.Vector2D();
		v.x = v.y = 0;
		for (var i = 0; i < boids.length; i++) 
		{
			var b2 = boids[i];
			if (b != b2)
			{
				var d = geom.Vector2D.distance2(b.pos, b2.pos);
				if (d < r2)
				{
					v.subtract(b2.pos);
					v.add(b.pos);
				}
			}
		}
		return v;
	}
	
	//orientation
	function rule3(b)
	{
		var v = new geom.Vector2D();
		v.x = v.y = 0;
		var nd = 0;
		for (var i = 0; i < boids.length; i++) 
		{
			var b2 = boids[i];
			if (b != b2)
			{
				var d = geom.Vector2D.distance2(b.pos, b2.pos);
				if (d < r)
				{					
					v.add(b2.vel);
					nd++;
				}
			}
		}
		if(nd)
		{			
			v.scale(1 / nd);
			v.subtract(b.vel);
			v.scale(1/8);
		}
		return v;
	}

}

