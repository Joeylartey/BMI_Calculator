    let metric = document.querySelector(".metric") as HTMLInputElement  ;
    let imperial = document.querySelector(".imperial") as HTMLInputElement;

    let metricOption = document.querySelector(".MetricOption") as HTMLInputElement;
    let imperialOption = document.querySelector(".ImperialOption") as HTMLInputElement;

    let cmInput = document.querySelector(".cmInput") as HTMLInputElement;
    let kgInput = document.querySelector(".kgInput") as HTMLInputElement;
    let ftInput = document.querySelector(".ftInput") as HTMLInputElement;
    let inInPut = document.querySelector(".inInPut") as HTMLInputElement;
    let stInput = document.querySelector(".stInput") as HTMLInputElement;
    let lbsInput = document.querySelector(".lbsInput") as HTMLInputElement;

    let input = document.querySelectorAll(".input") as NodeListOf<HTMLInputElement>;

    let bmi_with_result = document.querySelector(".bmi_with_result") as HTMLElement;
    let bmi_without_result = document.querySelector(".bmi_without_result") as HTMLElement;

    let bmi_value = document.querySelector(".bmi_value") as HTMLElement;
    let classification = document.querySelector(".classification") as HTMLElement;
    let classification_values = document.querySelector(".classification_values") as HTMLElement;

    metric.addEventListener("change",() => {
        metricOption.classList.remove("d-none");
        imperialOption.classList.add("d-none");
        display_bmi_without_result();
        resetInputValues();
    });
    imperial.addEventListener("change",() => {
        metricOption.classList.add("d-none");
        imperialOption.classList.remove("d-none");
        display_bmi_without_result();
        resetInputValues();
    });

    input.forEach((input) => {
        input.addEventListener("change",() => {
            if ( (Number(cmInput.value) > 0 && Number(kgInput.value) > 0) 
                ||
                ( Number(ftInput.value) > 0 && Number(inInPut.value) > 0 && Number(stInput.value) > 0 && 
                Number(lbsInput.value) > 0 ) 
            )
            {
                // metric option
                if (metricOption.classList.contains("d-none") == false)
                {   
                    // calculate bmi
                    let meter = ( Number(cmInput.value) / 100 );
                    let bmi = (Number(kgInput.value) / (meter * meter)).toFixed(1);

                    // calculate lower and upper values
                    let weight_lower = ((18.5) * (meter * meter)).toFixed(1);
                    let weight_upper = ((24.9) * (meter * meter)).toFixed(1);

                    // display lower and upper values
                    classification_values.textContent = `${weight_lower}kgs - ${weight_upper}kgs.`;

                    // display bmi result
                    bmi_value.textContent = bmi;
                    // find and display classification
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

                    // display bmi_with_result div
                    display_bmi_with_result();
                }
                // imperial option
                else
                {
                    // calculate bmi
                    let ft = Number(ftInput.value);
                    let inch = Number(inInPut.value);
                    let inches = (ft*12) + inch;

                    let st = Number(stInput.value);
                    let lb = Number(lbsInput.value);
                    let lbs = (14*st) + lb;

                    let bmi = ( (lbs / (inches * inches)) * 703 ).toFixed(1);

                    // display bmi result
                    bmi_value.textContent = bmi;

                    // calculate lower and upper values
                    let lower_lbs = ((18.5) * (inches*inches) / 703);
                    let upper_lbs = ((24.9) * (inches*inches) / 703);

                    let lower_st = (lower_lbs / 14).toFixed();
                    let lower_lbs_remaining = (lower_lbs % 14).toFixed();

                    let upper_st = (upper_lbs / 14).toFixed();
                    let upper_lbs_remaining = (upper_lbs % 14).toFixed();

                    // display lower and upper values
                    classification_values.textContent = `${lower_st}st ${lower_lbs_remaining}lbs - ${upper_st}st ${upper_lbs_remaining}lbs.`;

                    // find and display classification
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

                    // display bmi_with_result
                    display_bmi_with_result();
                    
                }

            }
           
        });
    });

   

    function display_bmi_without_result(){
        bmi_without_result.classList.remove("d-none");
        bmi_with_result.classList.add("d-none");
    }
    function display_bmi_with_result(){
        bmi_without_result.classList.add("d-none");
        bmi_with_result.classList.remove("d-none");
    }

    function resetInputValues(){
        input.forEach(
            input => { input.value="" }
        );
    }
    
