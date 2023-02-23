console.log("main.js loaded.");

//#region AddMeal - global var
const mealForm = document.getElementById('meal-form');

const foodTypesDataBox = document.getElementById('foodTypes-data-box');
const foodTypeInput = document.getElementById('foodTypes');

const mealTimesDataBox = document.getElementById('mealTimes-data-box');
const mealTimeInput = document.getElementById('mealTimes');

const foodDataBox = document.getElementById('foods-data-box');
const foodInput = document.getElementById('foods');

const mealFormDate = document.getElementById('meal-form-date');
const mealFormDateTime = document.getElementById('meal-form-datetime');
 
const foodTypeText = document.getElementById('foodType-text');
const foodText = document.getElementById('food-text'); 
const mealDate = document.getElementById('meal-form-date-value');
const mealDateTime = document.getElementById('meal-form-datetime-value');
const mealTimeText = document.getElementById('mealTime-text');
const multiplierText = document.getElementById('multiplier-text');

const csrf = document.getElementsByName('csrfmiddlewaretoken'); 

const multiplierInput = document.getElementById('multiplier-input');
const btnBox = document.getElementById("btn-box");
const alertBox = document.getElementById("alert-box");
const nutriTable = document.getElementById('nutri-table');
const nutriInfo = document.getElementsByName('nutri-info');
//#endregion

//#region meal_list - global var
const mealListView = document.getElementById('meal-list');
//#endregion

//#region DeleteMeal in detail view - global var
const mealDetailView = document.getElementById('meal-detail');
const mealTimeDetailInput = document.getElementById('mealTime-input');
const mealTimeDetailDataBox = document.getElementById('mealTimes-detail-data-box');
const mealTimeDetailText = document.getElementById('mealTime-detail-text');
const multiplierDetailInput = document.getElementById('multiplier-detail-input');

const mealDetailForm = document.getElementById('meal-detail-form');
const btnDetailBox = document.getElementById("btn-detail-box");

const mealDetailDate = document.getElementById('meal-detail-form-date-value');
const mealDetailDateTime = document.getElementById('meal-detail-form-datetime-value');
const multiplierDetailText = document.getElementById('multiplier-detail-text');
// const mealDeleteForm = document.getElementById('delete-meal');
//#endregion

$(document).ready(function () {
    //#region AddMeal Form
    if (foodTypesDataBox != null) {
        /*** Get food types ***/
        getFoodTypeToOptions();
        
        /*** Get meal times ***/
        getMealTimeToOptions();

        /*** Get Food from filtered food type ***/
        foodTypeInput.addEventListener('change', e => {
            const selectedFoodType = e.target.value;
            // console.log(selectedFoodType);
            foodDataBox.innerHTML = ""; //Clear the options
            foodText.textContent = "Choose a food";
            foodText.classList.add('default');
    
            getFoodFilteredToOptions(selectedFoodType);
        });
        
        /*** To limit multiplier input to be only decimal input to 0.00 ***/
        $(document).on('keydown', 'input[pattern]', function(e){
            var input = $(this);
            var oldVal = input.val();
            var regex = new RegExp(input.attr('pattern'), 'g');
            
            setTimeout(function(){
                var newVal = input.val();
                if(!regex.test(newVal)){
                    input.val(oldVal); 
                }
            }, 1);
        });
        
        /*** meal form on submit ***/
        mealForm.addEventListener('submit', e=>{
            e.preventDefault();
            // console.log("submitted. " + e);
            // console.log(csrf, csrf[0].value)
            
            const mealFormData = {
                'csrfmiddlewaretoken': csrf[0].value,
                'foodType': foodTypeText.textContent,
                'food': foodText.textContent,
                'mealDate': formatDateOnly( new Date( mealDate.value ) ) ,
                'mealDateTime': formatDateTime( new Date( mealDateTime.value ) ),
                'mealTime': mealTimeText.textContent, 
                'multiplier': multiplierText.value,
            }
            
            $.ajax({
                type: 'POST',
                url: 'createMeal',
                data: mealFormData,
                success: function(response){
                    // // console.log(foodTypeText.textContent);
                    // // console.log(foodText.textContent);
                    // // console.log('created: ', response.created);
                    // console.log(JSON.stringify(response));
                    // console.log(JSON.parse(response));
                    // console.log(JSON.parse(response)[0].url);
                    // console.log(mealFormData);
                    const redirect_url = JSON.parse(response)[0].url;
                    alertBox.innerHTML = `<div class="ui positive message">
                    <div class="header">
                    Success
                    </div>
                    <p>Your meal has been recorded. Your connection will be redirect in 3 sec.</p>
                    </div>`;
                    setTimeout(e=>{
                        foodTypeInput.classList.add('disabled');
                        foodInput.classList.add('disabled');
                        mealTimeInput.classList.add('disabled');
                        mealFormDate.classList.add('disabled');
                        mealFormDateTime.classList.add('disabled');
                        multiplierInput.classList.add('disabled');
                        btnBox.classList.add('not-visible');
                    }, 1);
                    setTimeout( e => {
                        window.location = redirect_url;
                    }, 3000);
                },
                error: function(error){
                    console.log('createMeal Error:\n', error);
                    console.log(mealFormData);
                    alertBox.innerHTML = `<div class="ui negative message">
                    <div class="header">
                    Failed
                    </div>
                    <p>Something went wrong.</p>
                    </div>`
                }
            })
        });
    } else if (mealListView != null){
        /*** Button not working... ***/
        console.log("You're at meal_list.html");
        // mealDeleteForm.addEventListener('submit', e => {
        //     e.preventDefault();
        //     console.log('e: ', e);
        //     console.log("e.target.value: ", e.target.value)
        //     console.log("e.target.elements[0].value: ", e.target.elements[0].value)
        // })
    } else if (mealDetailView != null){
        console.log("You're at meal_detail.html");
        const mealPK = document.getElementById('meal-detail-pk').innerText;

        getMealTimeToDetail();
        multiplierDetailInput.classList.remove('disabled');

        const selectedFoodType = document.getElementById('food-detail-foodType').innerText;
        console.log(selectedFoodType);

        let responseDetail = '';
        $.ajax({
            type: 'GET',
            url: `../foods-json/${selectedFoodType}`,
            success: function (response) {
                // console.log("detail food response: \n", response);
                responseDetail = response;
                // console.log('multiplierDetailInput\n', responseDetail);
                
                const selectedFood = document.getElementById('meal-detail-food-name').innerText;
                console.log('selectedFood\n', selectedFood);
                multiplierDetailInput.addEventListener('keydown', e => {
                    setTimeout(function () {
                        const currMultipler_val = document.getElementById('multiplier-detail-text').value;
                        console.log(currMultipler_val);
                        mapNutriDataToTable(responseDetail, selectedFood, currMultipler_val);
                    }, 1);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });

        // multiplierInput.addEventListener('keydown', e => {
        //     setTimeout(function () {
        //         const currMultipler_val = document.getElementById('multiplier-text').value;
        //         // console.log(currMultipler_val);
        //         mapNutriDataToTable(response, selectedFood, currMultipler_val);
        //     }, 1);
        // });

        mealDetailForm.addEventListener('submit', e =>{
            e.preventDefault();
            // console.log('e:\n', e);
            const mealDetailFormData = {
                'csrfmiddlewaretoken': csrf[0].value,
                'mealDate': formatDateOnly( new Date( mealDetailDate.value ) ) ,
                'mealDateTime': formatDateTime( new Date( mealDetailDateTime.value ) ),
                'mealTime': mealTimeDetailText.textContent, 
                'multiplier': multiplierDetailText.value,
            }
            console.log(mealDetailFormData);


            $.ajax({
                type: 'POST',
                url: `${mealPK}/update`,
                data: mealDetailFormData,
                success: function(response){
                    // console.log(JSON.stringify(response));
                    console.log(JSON.parse(response));
                    console.log(JSON.parse(response)[0].url);
                    const redirect_url = JSON.parse(response)[0].url;
                    alertBox.innerHTML = `<div class="ui positive message">
                    <div class="header">
                    Success
                    </div>
                    <p>Your meal has been edited. Your connection will be redirect in 3 sec.</p>
                    </div>`;
                    setTimeout(e=>{
                        /* To be continue here. 2023-02-22 16:06 */
                        // mealDetailDate.classList.add('disabled');
                        // mealDetailDateTime.classList.add('disabled');
                        // mealTimeDetailInput.classList.add('disabled');
                        // multiplierDetailText.classList.add('disabled');
                        btnDetailBox.classList.add('not-visible');
                    }, 1);
                    setTimeout( e => {
                        window.location = redirect_url;
                    }, 3000);
                },
                error: function(error){
                    console.log('edit_meal Error:\n', error);
                    console.log(url);
                    // console.log(mealFormData);
                    alertBox.innerHTML = `<div class="ui negative message">
                    <div class="header">
                    Failed
                    </div>
                    <p>Something went wrong.</p>
                    </div>`
                }
            })
        });
    };
    //#endregion
});

function getFoodFilteredToOptions(selectedFoodType) {
    $.ajax({
        type: 'GET',
        url: `foods-json/${selectedFoodType}`,
        success: function (response) {
            // console.log("food response: \n", response);
            const foodData = response.data;
            foodData.map(item => {
                const option = document.createElement('div');
                option.textContent = item.name;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.name);
                foodDataBox.appendChild(option);
            });

            /*** get_json_food_data when foodtype is selected. ***/
            foodInput.addEventListener('change', e => {
                console.log('foodInput e:\n', e);
                const selectedFood = e.target.value;
                console.log(e.target.value);
                btnBox.classList.remove('not-visible');
                nutriTable.classList.remove('not-visible');

                mealFormDate.classList.remove('disabled');
                mealFormDateTime.classList.remove('disabled');
                mealTimeInput.classList.remove('disabled');
                multiplierInput.classList.remove('disabled');
                $('#meal-form-date').calendar({
                    type: 'date',
                });
                $('#meal-form-datetime').calendar();

                /*** Map the response & selectedFood's nutri info to corresponding fields ***/
                var temp_item = '';
                mapNutriDataToTable(response, selectedFood);

                multiplierInput.addEventListener('keydown', e => {
                    setTimeout(function () {
                        const currMultipler_val = document.getElementById('multiplier-text').value;
                        // console.log(currMultipler_val);
                        mapNutriDataToTable(response, selectedFood, currMultipler_val);
                    }, 1);
                });
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getFoodTypeToOptions() {
    $.ajax({
        type: 'GET',
        url: 'foodTypes-json',
        success: function (response) {
            // console.log("foodtype response\n", response)
            foodTypesDataBox.innerHTML = "";
            foodTypeText.textContent = "Choose a food type";
            foodTypeText.classList.add('default');
            
            const foodTypesData = response.data;
            foodTypesData.map(item => {
                //console.log(item, "\n", item.foodType);
                const option = document.createElement('div');
                option.textContent = item.foodType;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.foodType);
                foodTypesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getMealTimeToOptions() {
    /*** Get MealTime to options in addMeal.html ***/
    $.ajax({
        type: 'GET',
        url: 'mealTimes-json',
        success: function (response) {
            // console.log("mealTime response\n", response)
            const mealTimesData = response.data;

            mealTimesDataBox.innerHTML = "";  //Clear the options
            mealTimeText.textContent = "Meal Time";
            mealTimeText.classList.add('default');

            mealTimesData.map(item => {
                //console.log(item, "\n", item.mealTime);
                const option = document.createElement('div');
                option.textContent = item.mealTime;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.mealTime);
                mealTimesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getMealTimeToDetail() {
    /*** Get MealTime to options in addMeal.html ***/
    $.ajax({
        type: 'GET',
        url: '../mealTimes-json',  //get from http://localhost:8000/mealTimes-json
        success: function (response) {
            // console.log("mealTime response\n", response)
            const mealTimesData = response.data;
            const selectedMealTimes = document.getElementById("sel_meal_time").innerHTML;

            mealTimeDetailDataBox.innerHTML = "";  //Clear the options
            // mealTimeDetailText.textContent = "Meal Time";
            // mealTimeDetailText.classList.add('default');
            
            mealTimesData.map(item => {
                //console.log(item, "\n", item.mealTime);
                const option = document.createElement('div');
                option.textContent = item.mealTime;
                if(selectedMealTimes == item.mealTime){
                    option.setAttribute('class', 'item');
                    mealTimeDetailText.textContent = selectedMealTimes;
                    mealTimeDetailText.classList.remove('default');
                    mealTimeDetailInput.setAttribute('value', selectedMealTimes);
                } else {
                    option.setAttribute('class', 'item');
                }
                option.setAttribute('data-value', item.mealTime);
                mealTimeDetailDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getMealTimeToOptionsMealDetail() {
    /*** Get MealTime to options in meal_detail.html ***/
    /* To be continue here. 2023-02-15(Wed) To get Meal object with id=pk, and then get its mealTime. */
    $.ajax({
        type: 'GET',
        url: 'mealTimes-json',
        success: function (response) {
            // console.log("mealTime response\n", response)
            const mealTimesData = response.data;

            mealTimesDataBox.innerHTML = "";  //Clear the options
            mealTimeText.textContent = "Meal Time";
            mealTimeText.classList.add('default');

            mealTimesData.map(item => {
                //console.log(item, "\n", item.mealTime);
                const option = document.createElement('div');
                option.textContent = item.mealTime;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.mealTime);
                mealTimesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function mapNutriDataToTable(response, selectedFood, multiplier=1.0) {
    // console.log(multiplier);
    response.data.map( item => {
        if (item.name == selectedFood) {
            // console.log(item);
            var idx = 0;
            for (const key in item) {
                // console.log(`${key}: ${item[key]}`);
                if (key == 'id' || key == 'foodType_id') {
                } else if (key == 'weightType_id') {
                    var type = '';
                    switch (item[key]) {
                        case 1: type = 'g'; break;
                        case 2: type = 'l'; break;
                        case 3: type = 'oz'; break;
                        case 4: type = 'kg'; break;
                        case 5: type = 'ml'; break;
                        default: type = '';
                    }
                    nutriInfo[idx].innerHTML = type;
                    idx++;
                } else {
                    // console.log(typeof item[key], item[key], isNaN(item[key]));
                    if (isNaN(item[key])) {
                        nutriInfo[idx].innerHTML = item[key];
                        idx++;
                    } else {
                        nutriInfo[idx].innerHTML = parseFloat(item[key] * multiplier).toFixed(2);
                        idx++;
                    }
                };
            };
        };
    });
};

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDateOnly(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-') // +
        // ' ' +
        // [
        // padTo2Digits(date.getHours()),
        // padTo2Digits(date.getMinutes())
        // ,padTo2Digits(date.getSeconds()),
        // ].join(':')
    );
}

function formatDateTime(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes())
        ,padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}
