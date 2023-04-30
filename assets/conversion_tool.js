/************************************************************/
/*  JavaScript Functions				*/
/*  FILENAME: a_conversion_tool.js			*/
/************************************************************/

//GLOBAL VARIABLES

//Rotation Quaternion
var q0 = 0.0;
var q1 = 0.0;
var q2 = 0.0;
var q3 = 0.0;

//Input Axis-Angle  
var theta = 0.0;	//degrees	
var x_hat = 0.0;
var y_hat = 0.0;
var z_hat = 0.0;
var su = 0.0;
var cu = 0.0;

//Input axis unit vector xu = x_hat ...
var xu = 0.0;
var yu = 0.0;
var zu = 0.0;
var un = 0.0;

//Input point
var x0 = 0.0;
var y0 = 0.0;
var z0 = 0.0;

//Output point
var x1 = 0.0;
var y1 = 0.0;
var z1 = 0.0;

window.onload = myInit;

/************************************************************/
/* myInit()							*/
/* This function is called once at beginning, when page		*/
/* is loaded.							*/
/************************************************************/
function myInit(){
	//alert("myInit()");
	var canvas = document.getElementById("theCanvas");	
	handleClick();
}

/************************************************************/
/* handleClick()						*/
/* This function is called when "Convert" arrow is clicked.	*/
/* All the action is controlled from here.					*/
/* The  unit rotation axis and rotation angle are read in the Axis-Angle data with the rotation start point,	*/
/* The rotation quaternion and the rotation end point is computed from inside this function.		*/
/************************************************************/
function handleClick()
{
	//alert("handleClick()");

	/****************************************************/
	/* Read Axis- angle values from input cells			*/
	/****************************************************/
	theta = document.getElementById("thetaData").value;
	xu = document.getElementById("x_hatData").value;
	yu = document.getElementById("y_hatData").value;
	zu = document.getElementById("z_hatData").value;
	un = Math.sqrt(xu*xu + yu*yu + zu*zu);
	xu = xu/un;
	yu = yu/un;
	zu = zu/un;

	/****************************************************/
	/* Read input point values from input cells			*/
	/****************************************************/
	x0  = document.getElementById("in_x").value;
	y0  = document.getElementById("in_y").value;
	z0  = document.getElementById("in_z").value;
	
	/****************************************************/
	/* Compute Quaternion								*/ 
	/****************************************************/
	computeQuaternion();
	
	/****************************************************/
	/* Rotate Point										*/ 
	/****************************************************/
	rotatePoint();

}

/************************************************************/
/* computeQuaternion()										*/
/* Uses theta, xu, yu, zu to compute rotation quaternion	*/
/* Populates the global quaternion variables 	*/
/* and writes them to the screen.							*/
/************************************************************/
function computeQuaternion()
{
	//Precompute sine and cosine values of half angle.
	//Input Angle is in degrees

	var su = Math.sin(theta*Math.PI/360);
	var cu = Math.cos(theta*Math.PI/360);
		
	q0 = cu;
	q1 = su*xu;
	q2 = su*yu;
	q3 = su*zu;
	
	//Display Rotation Quaternion, rounded to three sig. figs.
	document.getElementById("q0").value = Math.floor(q0*10000)/10000;
	document.getElementById("q1").value = Math.floor(q1*10000)/10000;
	document.getElementById("q2").value = Math.floor(q2*10000)/10000;
	document.getElementById("q3").value = Math.floor(q3*10000)/10000;
}


function rotatePoint()
{
	//alert("1 rotatePoint()");
	
	t1 = multiplyQuaternion( q0, q1, q2, q3, 0, x0, y0, z0 );
	t2 = multiplyQuaternion( t1[0], t1[1], t1[2], t1[3], q0, -q1, -q2, -q3 );

	//alert("2 rotatePoint()" + t2[0] + ","+t2[1] + ","+t2[2] + ","+t2[3]);

	//Display Rotated Point, rounded to three sig. figs.
	document.getElementById("out_x").value = Math.floor(t2[1]*10000)/10000;
	document.getElementById("out_y").value = Math.floor(t2[2]*10000)/10000;
	document.getElementById("out_z").value = Math.floor(t2[3]*10000)/10000;
}


function multiplyQuaternion( r0, r1, r2, r3, s0, s1, s2, s3 )
{
	q = [0, 0, 0, 0];
	q[0] = r0*s0-r1*s1-r2*s2-r3*s3;
	q[1] = r0*s1+r1*s0+r2*s3-r3*s2;
	q[2] = r0*s2-r1*s3+r2*s0+r3*s1;
	q[3] = r0*s3+r1*s2-r2*s1+r3*s0;
	return( q );
}



