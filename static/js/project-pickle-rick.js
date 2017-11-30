// global
var layer1 = $('#layer1')[0];
var ctx1 = layer1.getContext('2d');
var pickleImg = new Image();

var layer2 = $('#layer2')[0];
var ctx2 = layer2.getContext('2d');
var layer2width = 300;
var layer2height = 300;
var faceImg = null;

var canvasOffsetX = $("#layer2").offset().left;
var canvasOffsetY = $("#layer2").offset().top;
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

// base pickle
pickleImg.src = '/static/img/project-pickle-rick.jpg';
pickleImg.onload = function () {
  layer1.width = this.width;
  layer1.height = this.height;
  ctx1.drawImage(this, 0, 0);
};

// uploaded image
$('#your-face').change(function () {
  var firstFile = this.files[0];
  if (firstFile) {
    ctx2.clearRect(0, 0, layer2width, layer2height);
    renderImage(firstFile);
  }
});

function renderImage(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    faceImg = new Image();
    faceImg.onload = function () {
      ctx2.drawImage(this, 0, 0, layer2width, layer2height);
    }
    faceImg.src = event.target.result;
  }
  reader.readAsDataURL(file);
};

// drag
layer2.addEventListener('mousemove', handleMouseMove, false);
layer2.addEventListener('mouseout', handleMouseOut, false);
layer2.addEventListener('mouseup', handleMouseOut, false);
layer2.addEventListener('mouseleave', handleMouseOut, false);
layer2.addEventListener('mousedown', handleMouseDown, false);

function handleMouseDown(e) {
  mouseDown = true;
}

function handleMouseOut(e) {
  mouseDown = false;
}

function handleMouseMove(e) {
  if (mouseDown) {
    mouseX = e.pageX - canvasOffsetX;
    mouseY = e.pageY - canvasOffsetY;

    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    ctx2.drawImage(faceImg, mouseX - layer2width / 2, mouseY - layer2height / 2, layer2width, layer2height);
  }
}

// opacity
$('#opacity').on('change', function(e) {
  var inputValue = parseInt(this.value);
  console.log('inputValue', inputValue);
  if (inputValue >= 1 && inputValue <= 100 && Number.isInteger(inputValue) && faceImg != null) {

    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    ctx2.globalAlpha = inputValue / 100;

    var posX = mouseX == 0 ? 0 : mouseX - layer2width / 2;
    var posY = mouseY == 0 ? 0 : mouseY - layer2width / 2;

    ctx2.drawImage(faceImg, posX, posY, layer2width, layer2height);
  }
});