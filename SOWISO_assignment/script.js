//Global vars
const answerInput = document.querySelector("#answer");
const verifDiv = document.querySelector("#verification");
const counterDiv = document.querySelector("#counter");
//Initialize the answer at null
var answer = null;

// Number of successive calculs
var nb_calcul = 10;

//Count the right answer
var counter = 0;

//Calcul the global number of calcul
var calcul_counter = 0;

//Start the calcul and the timer
function Exercise(){
    Calcul();
    const element = document.querySelector("#timer");
    var time = 20;
    element.innerHTML = time + "s";

    //Update the timer every second
    myInterval = setInterval(Timer, 1000);

    //Timer
    function Timer(){
        //Stop if we arrive at 0
        if (time <= 0){
            clearInterval(myInterval);
            Validation();
        }
        else {
            time--;
            element.innerHTML = time + "s";
        }
    }
}

//Create the calcul and find it's solution
function Calcul(){
    //Generate a random int for the calcul
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Random number of operands for calcul
    nb_operands = getRandomInt(1, 5);
    //Operands that are available
    operands = ['+', '-', '*'];

    //Start the calcul with a number
    calcul = getRandomInt(1, 10);
    //For each operand, add a random one + a number
    for (let i=0; i < nb_operands; i++){
        operand = operands[getRandomInt(0, 3)];
        nb = getRandomInt(1, 10);
        calcul = calcul + operand + nb;
    }

    //Find the correct answer
     answer = eval(calcul);
     console.log(answer);

     //Print the calcul on the screen
    var divMaths = document.querySelector("#maths");
    divMaths.innerHTML = calcul;
}

//Check if the answer is correct and start the next calcul
function Validation(){
    //Stop the timer if not done
    if (myInterval)
        clearInterval(myInterval);

    //Check the answer
    if (answerInput.value == answer){
        alert("Correct answer!");
        //Update the counter
        counter++;
        calcul_counter++;
        counterDiv.innerHTML = counter + "/" + calcul_counter;
    }
    else {
        alert("Wrong answer : the correct one was " + answer);
        //Update the counter
        calcul_counter++;
        counterDiv.innerHTML = counter + "/" + calcul_counter;
    }
    //Clear the input
    answerInput.value ="";
    //Check the number of remaining calculs
    if (nb_calcul > 1){
        nb_calcul--;
        Exercise();
    }
    else {
        //Give a message depending of the final score
        answerInput.disabled = true;
        switch(counter) {
            case 0:
            case 1:
            case 2:
            case 3:
                alert("You have successfully completed " + counter + " of the 10 calculations. I know you can do better, try again! ");
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                alert ("You have successfully completed " + counter +  " of the 10 calculations. That's very good, but you can still improve, do it!");
                break;
            case 8:
            case 9:
            case 10:
                alert("You have successfully completed " + counter +  " of the 10 calculations. Well done! You're a maths pro, keep up the good work!");
                break;
        }

        //Prepare the display and vars to allow the user to re-try
        document.querySelector("#start").innerHTML = "Re-try";
        document.querySelector("#start").disabled = false;
        answer = null;
        nb_calcul = 10;
        counter = 0;
        calcul_counter = 0;

        counterDiv.innerHTML = counter + "/" + calcul_counter;
        document.querySelector("#maths").innerHTML = "Calcul";
    }
}

//Event listener for the start
document.querySelector("#start").addEventListener("click", event => {
    Exercise();
    document.querySelector("#start").disabled = true;
    document.querySelector("#answer").disabled = false;
})

//Event listener for the user input
document.querySelector("#answer").addEventListener("keypress", event => {
    var key = event.which;
    if(key == 13)  // the enter key code
    {
        Validation();
    }  
})