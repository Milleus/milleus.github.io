// global
var layer1 = $('#layer1')[0];
var ctx1 = layer1.getContext('2d');
var img1 = new Image();

var layer2 = $('#layer2')[0];
var ctx2 = layer2.getContext('2d');
var img2 = null;
var img2width = 0;
var img2height = 0;


var canvasOffsetX = $("#layer2").offset().left;
var canvasOffsetY = $("#layer2").offset().top;
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

var opacity = 1;
var angle = 0;

// base pickle
img1.src = '/static/img/base-pickle.jpg';
img1.onload = function () {
  layer1.width = this.naturalWidth;
  layer1.height = this.naturalHeight;
  layer2.width = this.naturalWidth;
  layer2.height = this.naturalHeight;
  ctx1.drawImage(this, 0, 0);
};

// uploaded image
$('#your-face').change(function () {
  var firstFile = this.files[0];
  if (firstFile) {
    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    renderImage(firstFile);
  }
});

function renderImage(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    img2 = new Image();
    img2.onload = function () {
      img2width = this.naturalWidth;
      img2height = this.naturalHeight;
      ctx2.drawImage(this, 0, 0, img2width, img2height);
    }
    img2.src = event.target.result;
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
};

function handleMouseOut(e) {
  mouseDown = false;
};

function handleMouseMove(e) {
  if (mouseDown) {
    mouseX = e.pageX - canvasOffsetX;
    mouseY = e.pageY - canvasOffsetY;
    redrawCanvas();
  }
};

// opacity
$('#opacity').on('change', function (e) {
  var inputValue = parseInt(this.value);
  if (inputValue >= 0 && inputValue <= 100 && Number.isInteger(inputValue)) {
    opacity = inputValue / 100;
    redrawCanvas();
  }
});

// rotation
$('#angle').on('change', function (e) {
  var inputValue = parseInt(this.value);
  if (inputValue >= 0 && inputValue <= 360 && Number.isInteger(inputValue)) {
    angle = inputValue * Math.PI / 180;
    redrawCanvas();
  }
});

// redraw
function redrawCanvas() {
  if (img2 != null) {
    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    ctx2.save();

    ctx2.translate(mouseX, mouseY);
    ctx2.globalAlpha = opacity;
    ctx2.rotate(angle);

    ctx2.drawImage(img2, 0 - (img2width / 2), 0 - (img2height / 2), img2width, img2height);
    ctx2.restore();
  }
}