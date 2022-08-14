timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas() {
  background("white");
  random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
  console.log(quick_draw_data_set[random_number]);
  sketch = quick_draw_data_set[random_number];
  document.getElementById('sketch_name').innerHTML = 'Dibujo a ser trazado: ' + sketch;
}

function preload() {
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup()
{
  canvas=createCanvas(280 , 280);
  canvas.center();
background("cyan");
canvas.mouseReleased(classifyCanvas);
}
 
function draw() {
  // Establce el grosor del stroke (trazo) a 10.
  strokeWeight(13);
  // Establce el color del stroke (trazo) a negro.
  stroke(0);
  // Si el mouse está presionado, dibujar una línea entre la posición previa y la actual.
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  check_sketch()
  if(drawn_sketch == sketch)
  {
    answer_holder = "set"
    score++;
    document.getElementById('score').innerHTML = 'Puntuación: ' + score;
  }

}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  drawn_sketch = results[0].label;
  document.getElementById('label').innerHTML = 'Tu dibujo: ' + drawn_sketch;

  document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';
}


function check_sketch()
{
  timer_counter++;
  
  
  
  
  if(timer_counter > 400)
    {
      timer_counter = 0;
      timer_check = "completado"
    }
    if(timer_check =="completado" || answer_holder == "set")
    {
      timer_check = "";
      answer_holder = "";
      updateCanvas();
    }

}

