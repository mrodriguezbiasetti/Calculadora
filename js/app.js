
// JavaScript Document


//Variables globales
var num1 = 0
var num2 = 0
var operacion = ""
var resultado = false
var teclas = document.getElementsByClassName("tecla");
var display = document.getElementById("display");


for (var i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('mousedown', function() {
    this.style.padding = "5px"
	id = this.id;
	checkTecla(id)	
	
}, false);
	
    teclas[i].addEventListener('mouseleave', function() {
    this.style.padding = "0px"
	}, false);
    teclas[i].addEventListener('mouseup', function() {
    this.style.padding = "0px"
	}, false);
}

function checkTecla(id){
	if(parseInt(id+1)){
			agregarNumero(id)
		}
		else {
			switch(id){
				case "on":
					clear()
					break
				case "sign":
					cambioDeSigno()
					break
				case "raiz":
					raizCuadrada()
					break
				case "dividido":
					dividir()
					break
				case "por":
					multiplicar()
					break
				case "mas":
					suma()
					break
				case "punto":
					punto()
					break
				case "menos":
					resta()
					break
				case "igual":
					result()
					if(resultado<0){
						lim = 9
					}else{
						lim = 8
					}
					display.innerHTML = String(resultado).substring(0,lim)
					checkError()
					break
			}
	   }
}

function agregarNumero(numero){
	if(parseInt(numero+1)){
		if(display.innerHTML === '0'){
			display.innerHTML = numero;
		}else if(display.innerHTML.length < 8){
			display.innerHTML += numero;
		}	
	}
	
}

function clear(){
	display.innerHTML = 0
	operacion = ""
	num2 = false
	resultado = false
}

function cambioDeSigno(){
	display.innerHTML = String(display.innerHTML * -1)
}
//Es la única operación que no depende de '=' para mostrar el resultado
function raizCuadrada(){
	resultado = Math.pow(display.innerHTML,0.5)
	display.innerHTML = String(resultado).substring(0,7)
	operacion = ""
	num1 = display.innerHTML
	checkError()
}


function dividir(){
	result()
	if(resultado!=false){
		num1 = resultado
	}else{
		num1 = display.innerHTML	
	}
	
	display.innerHTML = ""
	operacion = "dividido"
	num2 = false
}

function multiplicar(){
	result()
	if(resultado!=false){
		num1 = resultado
	}else{
		num1 = display.innerHTML	
	}
	display.innerHTML = ""
	operacion = "multiplicar"
	num2 = false
}

function suma(){
	result()
	if(resultado!=false){
		num1 = resultado
	}else{
		num1 = display.innerHTML	
	}
	
	display.innerHTML = ""
	operacion = "suma"
	num2 = false
}

function resta(){
	result()
	if(resultado!=false){
		num1 = resultado
	}else{
		num1 = display.innerHTML	
	}
	
	display.innerHTML = ""
	operacion = "resta"
	num2 = false
}

//Antes de agragar el punto, verifica que no se lo haya agregado anteriormente y que además el punto no sea el último caracter 
function punto(){
	if(display.innerHTML.split('.').length==1 && display.innerHTML.length<7){
		display.innerHTML += '.'
		if(resultado!=false){
			num1 = resultado
		}else{
		num1 = display.innerHTML		
		}
	
	}
}

//Almacena el resultado en una variable global
function result(){
	if(num2==false){
		num2 = display.innerHTML
	}
	switch(operacion){
		case "dividido":
			resultado = num1 / num2			
			num1 = resultado
			break
		case "multiplicar":
			resultado = num1 * num2
			
			num1 = resultado
			break
		case "suma":
			resultado = parseFloat(num1) + parseFloat(num2)
			num1 = resultado
			break
		case "resta":
			resultado = num1 - num2
			num1 = resultado
			break
	}
	checkError()
	
}

//Función para la revisión de errores: (1) Excede los límites o (2) el resultado no es posible mostrar (como la raíz de un número negativo)
function checkError(){
	if(resultado>99999999 || resultado<-99999999 || isNaN(resultado)){
		display.innerHTML = "Math err"
		setTimeout(function(){clear();},1500)
		}
}