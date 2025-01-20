
// Canvas olustruruyoruz
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1350;
canvas.height = 470;
var dusmancan = 3;
var skor = 0;
var atessayisi = document.getElementById("atessayisi");
var cansayisi = document.getElementById("can");
var oyunbitti = document.getElementById("oyunbitti");
cansayisi.innerHTML='F35 Canı: ' + ' ' + dusmancan.toString() + '___'+ ' Mermi: ' + skor.toString();

document.body.appendChild(canvas);

// Arka plan resmi ekliyoruz
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/arka2.jpg";

// dusman ucagımızı ekliyoruz
var dusmanReady = false;
var dusmanImage = new Image();
dusmanImage.onload = function () {
	dusmanReady = true;
};
dusmanImage.src = "images/dusman4.png";

// ucagımızı ekliyoruz
var ucakReady = false;
var ucakImage = new Image();
ucakImage.onload = function () {
	ucakReady = true;
};
ucakImage.src = "images/helikopter.png";

// mermi  ekliyoruz
var mermiReady = false;
var mermiImage = new Image();
mermiImage.onload = function () {
	mermiReady = true;
};
mermiImage.src = "images/mermi.png";




// oyundaki objemizin hızını ayarlıyoruz
var ucak = {
	speed: 300 // saniyedeki pixel hareketi
};
var mermix = 0;
var mermiy = 0;
var dusmany=0;
var durum=0;
alert("OYUNA BASLA");

//Klavye kontrol işleme
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Ucagımızın ilk konumu
var reset = function () {
	ucak.x = canvas.width / 50;
	ucak.y = canvas.height / 3;
	
};



// Nesnenin konumunu degistirme
var update = function (modifier) {
	if (38 in keysDown) { // Yukarı
		if(ucak.y>16)
		ucak.y -= ucak.speed * modifier;
	}
	if (40 in keysDown) { // Asagı
		if(ucak.y<420)
		ucak.y += ucak.speed * modifier;
	}
	if (37 in keysDown) { // Sol
		if(ucak.x>10)
		ucak.x -= ucak.speed * modifier;
	}
	if (39 in keysDown) { // Sağ
		if(ucak.x<150)
		ucak.x += ucak.speed * modifier;
	}
	if (32 in keysDown)//boşluk
	{
		if(mermix==0)
		{	
			mermix=ucak.x+15; // ucagın oldugu konumdan ates icin
			mermiy=ucak.y+25; //mermi baslangıc
			skor+=1;
		    cansayisi.innerHTML='F35 Canı: ' + ' ' + dusmancan.toString() + '___'+ ' Mermi: ' + skor.toString();

		}
	}
	
};


var enemydown=function()//düşman aşağı
{
	var teleport=Math.floor(Math.random() * 4);
	if(dusmany>=420) //yukarı sınır bölgsi
	durum=1; // durum 8 den fazla olursa cıkar sayilardan kucuk olmali Sınıırrr
	if(teleport==1)
	dusmany=dusmany+5;
	if(teleport==2)
	dusmany=dusmany+7;
	if(teleport==3)
	dusmany=dusmany+9;
};

var enemyup=function()// dusman yukarı
{
	var teleport=Math.floor(Math.random() * 4);
	if(dusmany<=16) // asagı hareket sınır 
	durum=0; //asagı sınır bölgesi
	if(teleport==1)
    dusmany=dusmany-5;
    if(teleport==2)
	dusmany=dusmany-7;
	if(teleport==3)
	dusmany=dusmany-9;
};
var render = function () {
    atesle();
	if (ucak) {
		ctx.drawImage(ucakImage, ucak.x, ucak.y);
	} 	
	if(durum%2==0){
	enemydown();
	}
	else {
	enemyup();
	}
	ctx.drawImage(dusmanImage, 1200, dusmany); // dusman baslangıc konumu
	};


function atesle() // mermi 0 dan kucuk olmazsa ates etmez
{   
	if(mermix>1340)//dusmanmermi kücükse 20 den
	{
		mermix = 0;
	}
	if(mermix>0)
	{
		mermix+=15; // mermi atma hızı
		ctx.drawImage(mermiImage, mermix, mermiy);
		kontrol();
	}
};


function kontrol()
{
	if(mermiy>=dusmany   && mermiy+7 <= dusmany+56 && mermix+28 > 1200) // dusman vurulma noktası
	{
		mermiy=0;
		mermix=0;
		dusmancan--;
		cansayisi.innerHTML='F35 Canı: ' + ' ' + dusmancan.toString() + '___'+ ' Mermi: ' + skor.toString();
		if(dusmancan == 0)
		{
			dusmanImage.src = "images/patlama.png";
			ctx.drawImage(dusmanImage, 1200, dusmany);
		alert('F35 ÖLDÜ '+ 'SKOR: '+ skor.toString());	
		alert('TEKRAR OYNAMAK İÇİN F5 TUSUNUNA BASINIZ ')
		}	
		
    }
};

// The main game loop
var main = function () {
	if (true) {
		ctx.drawImage(bgImage, 0, 0);
	}
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
