let metric = document.getElementById('metric') as HTMLInputElement;
let imperial = document.getElementById('imperial') as HTMLInputElement;

let metricInputs = document.querySelector('.metric-inputs') as HTMLElement;
let imperialInputs = document.querySelector('.imperial-inputs') as HTMLElement;

let heightInCms = document.getElementById('height-cm') as HTMLInputElement;
let weightInKgs = document.getElementById('weight-kg') as HTMLInputElement;
let heightInFeet = document.getElementById('height-feet') as HTMLInputElement;
let heightInInches = document.getElementById('height-inches') as HTMLInputElement;
let weightInStone = document.getElementById('weight-stone') as HTMLInputElement;
let weightInPounds = document.getElementById('weight-pounds') as HTMLInputElement;

let input = document.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;

let welcomeScreen = document.querySelector('.welcome-screen') as HTMLElement;
let bmiResult = document.querySelector('.bmi-result') as HTMLElement;

let bmiValue = document.getElementById('bmi-value') as HTMLElement;

let classification = document.getElementById('classification') as HTMLElement;
let classificationValues = document.getElementById('classification-values') as HTMLElement;
// console.log(input);

metric.addEventListener('change', () => {
    console.log('Metric clicked');
    imperialInputs.classList.add('hide');
    metricInputs.classList.remove('hide');
    displayWelcomeScreen();
    resetInputValues();
});

imperial.addEventListener('change', () => {
    console.log('Imperial clicked');
    imperialInputs.classList.remove('hide');
    metricInputs.classList.add('hide');
    displayWelcomeScreen();
    resetInputValues();
});

input.forEach((input) => {
    input.addEventListener("change", () => {
        if ((+heightInCms.value > 0 && +weightInKgs.value > 0) 
            || (+heightInFeet.value > 0 && +heightInInches.value > 0 && 
                +weightInStone.value > 0 && +weightInPounds.value > 0)) {
        
            if (metricInputs.classList.contains('hide') == false) {
                console.log('I am dealing with metric');
                
                // calculate bmi
                let meter = +heightInCms.value / 100;
                let bmi = (+weightInKgs.value /( meter * meter)).toFixed(1);
                console.log(bmi);

                // calculate lower and upper values
                let weight_lower = ((18.5) * (meter * meter)).toFixed(1);
                let weight_upper = ((24.9) * (meter * meter)).toFixed(1);

                // display lower and upper values
                classificationValues.textContent = `${weight_lower}kgs - ${weight_upper}kgs.`;

                // display bmi result
                bmiValue.textContent = bmi;

                // Display classification
                if (+bmi < 18.5)
                    {   
                        classification.textContent = "underweight";
                    }
                    else if ( +bmi >= 18.5 && +bmi <= 24.9 )
                    {
                        classification.textContent = "healthy weight"
                    }
                    else if (+bmi >= 25 && +bmi <= 29.9)
                    {
                        classification.textContent = "overweight";
                    }
                    else if (+bmi >= 30)
                    {
                        classification.textContent = "obese";
                    }
                    
                    // Display BMI value
                    displayBMIResult(); 
            }
            // imperial option
            else {

                console.log('I am in imperial');
                // calculate bmi
                let ft = +heightInFeet.value;
                let inch = +heightInInches.value;
                let inches = (ft*12) + inch;

                let st = +weightInStone.value;
                let lb = +weightInPounds.value;
                let lbs = (14*st) + lb;

                let bmi = ( (lbs / (inches * inches)) * 703 ).toFixed(1);
                console.log(bmi);
                // Display bmi result
                bmiValue.textContent = bmi;

                // Calculate lower and upper values
                let lower_lbs = ((18.5) * (inches*inches) / 703);
                let upper_lbs = ((24.9) * (inches*inches) / 703);

                let lower_st = (lower_lbs / 14).toFixed();
                let lower_lbs_remaining = (lower_lbs % 14).toFixed();

                let upper_st = (upper_lbs / 14).toFixed();
                let upper_lbs_remaining = (upper_lbs % 14).toFixed();

                 // display lower and upper values
                classificationValues.textContent = `${lower_st}st ${lower_lbs_remaining}lbs - ${upper_st}st ${upper_lbs_remaining}lbs.`;

                // Display classification
                if (+bmi < 18.5)
                {   
                    classification.textContent = "underweight";
                }
                else if ( +bmi >= 18.5 && +bmi <= 24.9 )
                {
                    classification.textContent = "healthy weight"
                }
                else if (+bmi >= 25 && +bmi <= 29.9)
                {
                    classification.textContent = "overweight";
                }
                else if (+bmi >= 30)
                {
                    classification.textContent = "obese";
                }
                // display BMI
                displayBMIResult();
                
            }
        } 
    })
})

function displayWelcomeScreen() {
    welcomeScreen.classList.remove('hide');
    bmiResult.classList.add('hide');
    console.log("Welcome screen launched");
}

function displayBMIResult() {
    welcomeScreen.classList.add('hide');
    bmiResult.classList.remove('hide');
}

function resetInputValues() {
    input.forEach(input => {
        {input.value=""}
    })
}