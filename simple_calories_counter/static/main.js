console.log("main.js loaded.");

/*** EveryTime Memo: The food detail fetch object with pk successful. Now need to do the main.js to POST and view.py to accept the POST ***/

//#region Global Var Section
    //#region index page - global var
    const indexPage = document.getElementById('index-page');
    //#endregion

    //#region AddMeal view - global var
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

    //#region meal_list view - global var
    const mealListView = document.getElementById('meal-list-view');
    //#endregion

    //#region meal_detail view - global var
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

    //#region AddFood view - gloval var
    const addFoodPage = document.getElementById('add-food');

    const addFoodForm = document.getElementById('addFood-form');

    const addFoodFoodTypesDataBox = document.getElementById('addFood-foodTypes-data-box');
    const addFoodFoodTypesInput = document.getElementById('addFood-foodTypes');
    const addFoodFoodTypeText = document.getElementById('addFood-foodType-text');

    const addFoodWTypesDataBox = document.getElementById('addFood-weightTypes-data-box');
    const addFoodWTypesInput = document.getElementById('addFood-weightTypes');
    const addFoodWTypesText = document.getElementById('addFood-weightType-text');

    const addFoodNameInput          = document.getElementById('addFood-name-input');
    const addFoodNameTxtF           = document.getElementById('addFood-name-txtField');
    const addFoodManufacturerInput  = document.getElementById('addFood-manufacturer-input');
    const addFoodManufacturerTxtF   = document.getElementById('addFood-manufacturer-txtField');
    const addFoodWPMInput           = document.getElementById('addFood-weightPerMeal-input');
    const addFoodWPMTxtF            = document.getElementById('addFood-weightPerMeal-txtField');
    const addFoodCaloriesInput      = document.getElementById('addFood-calories-input');
    const addFoodCaloriesTxtF       = document.getElementById('addFood-calories-txtField');
    const addFoodProteinInput       = document.getElementById('addFood-protein-input');
    const addFoodProteinTxtF        = document.getElementById('addFood-protein-txtField');
    const addFoodFatInput           = document.getElementById('addFood-fat-input');
    const addFoodFatTxtF            = document.getElementById('addFood-fat-txtField');
    const addFoodSaturatedFatInput  = document.getElementById('addFood-saturatedFat-input');
    const addFoodSaturatedFatTxtF   = document.getElementById('addFood-saturatedFat-txtField');
    const addFoodTransFatInput      = document.getElementById('addFood-transFat-input');
    const addFoodTransFatTxtF       = document.getElementById('addFood-transFat-txtField');
    const addFoodCarbohydratesInput = document.getElementById('addFood-carbohydrates-input');
    const addFoodCarbohydratesTxtF  = document.getElementById('addFood-carbohydrates-txtField');
    const addFoodSodiumInput        = document.getElementById('addFood-sodium-input');
    const addFoodSodiumTxtF         = document.getElementById('addFood-sodium-txtField');
    const addFoodVitaminB1Input     = document.getElementById('addFood-vitaminB1-input');
    const addFoodVitaminB1TxtF      = document.getElementById('addFood-vitaminB1-txtField');
    const addFoodVitaminB2Input     = document.getElementById('addFood-vitaminB2-input');
    const addFoodVitaminB2TxtF      = document.getElementById('addFood-vitaminB2-txtField');
    const addFoodVitaminB3Input     = document.getElementById('addFood-vitaminB3-input');
    const addFoodVitaminB3TxtF      = document.getElementById('addFood-vitaminB3-txtField');

    const addFoodAlertBox = document.getElementById("addFood-alert-box");
    //CONTINUE HERE, add all input fields here.

    const addFoodBtnBox = document.getElementById('addFood-btn-box');
    const addFoodBtn    = document.getElementById('addFood-submit-btn');
    //#endregion

    //#region food_list view- global var
    const foodListView = document.getElementById('food-list-view');
    //#endregion

    //#region food_detail view - global var
    const foodDetailView = document.getElementById('food-detail');
    const foodDetailFoodTypesDataBox = document.getElementById('food-detail-foodTypes-data-box');
    const foodDetailFoodTypesInput = document.getElementById('food-detail-foodTypes-dropdown');
    const foodDetailFoodTypeText = document.getElementById('food-detail-foodType-text');

    const foodDetailWTypesDataBox = document.getElementById('food-detail-weightTypes-data-box');
    const foodDetailWTypesInput = document.getElementById('food-detail-weightTypes-dropdown');
    const foodDetailWTypesText = document.getElementById('food-detail-weightType-text');

    const foodDetailNameInput          = document.getElementById('food-detail-name-input');
    const foodDetailNameTxtF           = document.getElementById('food-detail-name-txtField');
    const foodDetailManufacturerInput  = document.getElementById('food-detail-manufacturer-input');
    const foodDetailManufacturerTxtF   = document.getElementById('food-detail-manufacturer-txtField');
    const foodDetailWPMInput           = document.getElementById('food-detail-weightPerMeal-input');
    const foodDetailWPMTxtF            = document.getElementById('food-detail-weightPerMeal-txtField');
    const foodDetailCaloriesInput      = document.getElementById('food-detail-calories-input');
    const foodDetailCaloriesTxtF       = document.getElementById('food-detail-calories-txtField');
    const foodDetailProteinInput       = document.getElementById('food-detail-protein-input');
    const foodDetailProteinTxtF        = document.getElementById('food-detail-protein-txtField');
    const foodDetailFatInput           = document.getElementById('food-detail-fat-input');
    const foodDetailFatTxtF            = document.getElementById('food-detail-fat-txtField');
    const foodDetailSaturatedFatInput  = document.getElementById('food-detail-saturatedFat-input');
    const foodDetailSaturatedFatTxtF   = document.getElementById('food-detail-saturatedFat-txtField');
    const foodDetailTransFatInput      = document.getElementById('food-detail-transFat-input');
    const foodDetailTransFatTxtF       = document.getElementById('food-detail-transFat-txtField');
    const foodDetailCarbohydratesInput = document.getElementById('food-detail-carbohydrates-input');
    const foodDetailCarbohydratesTxtF  = document.getElementById('food-detail-carbohydrates-txtField');
    const foodDetailSodiumInput        = document.getElementById('food-detail-sodium-input');
    const foodDetailSodiumTxtF         = document.getElementById('food-detail-sodium-txtField');
    const foodDetailVitaminB1Input     = document.getElementById('food-detail-vitaminB1-input');
    const foodDetailVitaminB1TxtF      = document.getElementById('food-detail-vitaminB1-txtField');
    const foodDetailVitaminB2Input     = document.getElementById('food-detail-vitaminB2-input');
    const foodDetailVitaminB2TxtF      = document.getElementById('food-detail-vitaminB2-txtField');
    const foodDetailVitaminB3Input     = document.getElementById('food-detail-vitaminB3-input');
    const foodDetailVitaminB3TxtF      = document.getElementById('food-detail-vitaminB3-txtField');

    const foodDetailAlertBox = document.getElementById("food-detail-alert-box");
    //CONTINUE HERE, add all input fields here.

    const foodDetailBtnBox = document.getElementById('food-detail-btn-box');
    const foodDetailBtn    = document.getElementById('food-detail-submit-btn');
    //#endregion
//#endregion

$(document).ready(function () {
    //#region index page
    if (indexPage != null) {
        console.log("You're at index page.");

        /*** The blocks of content will transform and visible at last. ***/
        // $(document).ready(function() {
        // $(window).scroll(function() {
        var introTop = $("#block1").offset().top;
        var purposeTop = $("#block2").offset().top;
        var infoTop = $("#block3").offset().top;
        var scrollTop = $(window).scrollTop(); // + $(window).height();

        // if (scrollTop > introTop) {
        $("#block1").addClass("block-visible");
        // }
        // if (scrollTop > purposeTop) {
        $("#block2").addClass("block-visible");
        // }
        // if (scrollTop > infoTop) {
        $("#block3").addClass("block-visible");
        // }
        // });
        // });              
    }
    //#endregion

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
                    // console.log(JSON.stringify(response));
                    // console.log(JSON.parse(response));
                    // console.log(JSON.parse(response)[0].url);
                    const redirect_url = JSON.parse(response)[0].url;
                    const result = JSON.parse(response)[0].success;
                    const error_str = JSON.parse(response)[0].error;
                    
                    //#region Add form validation here
                        // console.log(mealFormData);
                    //#endregion

                    if (!result){
                        handleObjCreateError("meal", error_str);
                    } else {
                        alertBox.innerHTML = `<div class="ui positive message">
                        <div class="header">
                        Success
                        </div>
                        <p>Your meal has been recorded.</p>
                        <p>Your connection will be redirect in 3 sec.</p>
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
                    }
                },
                error: function(e){
                    console.log(mealFormData);
                    handleObjCreateError("meal", e);
                }
            })
        });
    } else if (mealListView != null){
        console.log("You're at meal_list.html");
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
    } else if (addFoodPage != null){
        console.log("You're at addFood.html.");
        /*** Get Food Type ***/
        getFoodTypeToAddFoodOptions();
        /*** Get Weight Type ***/
        getWeightTypeToAddFoodOptions();

        /*** To limit number input to be only decimal input to 0.00 ***/
        /*** .on( events [, selector ] [, data ], handler ) ***/
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

        /*** Enable the save button ***/
        var isFoodTypesSelected = false;
        var isWeightTypesSelected = false;
        var isFoodNameEmpty = false;

        addFoodFoodTypesInput.addEventListener('change', e => {
            isFoodTypesSelected = true;
            enableAddFoodSubmitBtn(isFoodTypesSelected, isWeightTypesSelected, isFoodNameEmpty);
        });
        addFoodWTypesInput.addEventListener('change', e => {
            isWeightTypesSelected = true;
            enableAddFoodSubmitBtn(isFoodTypesSelected, isWeightTypesSelected, isFoodNameEmpty);
        });
        addFoodNameInput.addEventListener('keyup', e => {
            if (e.target.value != "") {
                isFoodNameEmpty = true;
            } else {
                isFoodNameEmpty = false;
            }
            enableAddFoodSubmitBtn(isFoodTypesSelected, isWeightTypesSelected, isFoodNameEmpty);
            // console.log(addFoodNameInput.value);
        });

        addFoodForm.addEventListener('submit', e => {
            e.preventDefault();
            const foodFormData = {
                'csrfmiddlewaretoken': csrf[0].value,
                'FoodType': addFoodFoodTypeText.textContent,
                'Name': addFoodNameInput.value,
                'Manufacturer': addFoodManufacturerInput.value,
                'WeightType': addFoodWTypesText.textContent,
                'WPM': addFoodWPMInput.value,
                'Calories': addFoodCaloriesInput.value,
                'Protein': addFoodProteinInput.value, 
                'Fat': addFoodFatInput.value, 
                'SaturatedFat': addFoodSaturatedFatInput.value, 
                'TransFat': addFoodTransFatInput.value, 
                'Carbohydrates': addFoodCarbohydratesInput.value, 
                'Sodium': addFoodSodiumInput.value, 
                'VitaminB1': addFoodVitaminB1Input.value, 
                'VitaminB2': addFoodVitaminB2Input.value, 
                'VitaminB3': addFoodVitaminB3Input.value,
            }

            /*** ajax call (POST) to add a Food record ***/
            $.ajax({
                type: 'POST',
                url: 'createFood',
                data: foodFormData,
                success: function(response){
                    const redirect_url = JSON.parse(response)[0].url;
                    const result = JSON.parse(response)[0].success;
                    const error_str = JSON.parse(response)[0].error;
                    //console.log(response);
                    
                    //#region Add form validation here.
                        console.log(foodFormData);
                    //#endregion

                    if (!result) {
                        handleObjCreateError('food', error_str);
                    } else {
                        addFoodAlertBox.innerHTML = `<div class="ui positive message">
                        <div class="header">
                        Success
                        </div>
                        <p>Your food has been recorded. You can select the food later in your meal.</p>
                        <p>Your connection will be redirect in 3 sec.</p>
                        </div>`;
                        setTimeout(e=>{
                            addFoodFoodTypesInput.classList.add('disabled');
                            addFoodNameTxtF.classList.add('disabled');
                            addFoodManufacturerTxtF.classList.add('disabled');
                            addFoodWTypesInput.classList.add('disabled');
                            addFoodWPMTxtF.classList.add('disabled');
                            addFoodCaloriesTxtF.classList.add('disabled');
                            addFoodProteinTxtF.classList.add('disabled');
                            addFoodFatTxtF.classList.add('disabled');
                            addFoodSaturatedFatTxtF.classList.add('disabled');
                            addFoodTransFatTxtF.classList.add('disabled');
                            addFoodCarbohydratesTxtF.classList.add('disabled');
                            addFoodSodiumTxtF.classList.add('disabled');
                            addFoodVitaminB1TxtF.classList.add('disabled');
                            addFoodVitaminB2TxtF.classList.add('disabled');
                            addFoodVitaminB3TxtF.classList.add('disabled');
                            addFoodBtnBox.classList.add('not-visible');
                        }, 1);
                        setTimeout( e => {
                            window.location = redirect_url;
                        }, 3000);
                    }
                },
                error: function(e){
                    handleObjCreateError('food', e);
                }
            })
        });

    } else if (foodListView != null){
        console.log("You're at food_list.html");
    } else if (foodDetailView != null) {
        console.log("You're at food_detail.html");
        const foodPK = document.getElementById('food-detail-pk').innerText;
        
        foodDetailFoodTypesInput
        getFoodTypeToFoodDetailOptions()
        getWeightTypeToFoodDetailOptions()

        /* POST to save the edited food detail to model. */
        // addFoodForm.addEventListener('submit', e => {
        //     e.preventDefault();
        //     const foodFormData = {
        //         'csrfmiddlewaretoken': csrf[0].value,
        //         'FoodType': addFoodFoodTypeText.textContent,
        //         'Name': addFoodNameInput.value,
        //         'Manufacturer': addFoodManufacturerInput.value,
        //         'WeightType': addFoodWTypesText.textContent,
        //         'WPM': addFoodWPMInput.value,
        //         'Calories': addFoodCaloriesInput.value,
        //         'Protein': addFoodProteinInput.value, 
        //         'Fat': addFoodFatInput.value, 
        //         'SaturatedFat': addFoodSaturatedFatInput.value, 
        //         'TransFat': addFoodTransFatInput.value, 
        //         'Carbohydrates': addFoodCarbohydratesInput.value, 
        //         'Sodium': addFoodSodiumInput.value, 
        //         'VitaminB1': addFoodVitaminB1Input.value, 
        //         'VitaminB2': addFoodVitaminB2Input.value, 
        //         'VitaminB3': addFoodVitaminB3Input.value,
        //     }

        //     /*** ajax call (POST) to add a Food record ***/
        //     $.ajax({
        //         type: 'POST',
        //         url: 'createFood',
        //         data: foodFormData,
        //         success: function(response){
        //             const redirect_url = JSON.parse(response)[0].url;
        //             const result = JSON.parse(response)[0].success;
        //             const error_str = JSON.parse(response)[0].error;
        //             //console.log(response);
                    
        //             //#region Add form validation here.
        //                 console.log(foodFormData);
        //             //#endregion

        //             if (!result) {
        //                 handleObjCreateError('food', error_str);
        //             } else {
        //                 addFoodAlertBox.innerHTML = `<div class="ui positive message">
        //                 <div class="header">
        //                 Success
        //                 </div>
        //                 <p>Your food has been recorded. You can select the food later in your meal.</p>
        //                 <p>Your connection will be redirect in 3 sec.</p>
        //                 </div>`;
        //                 setTimeout(e=>{
        //                     addFoodFoodTypesInput.classList.add('disabled');
        //                     addFoodNameTxtF.classList.add('disabled');
        //                     addFoodManufacturerTxtF.classList.add('disabled');
        //                     addFoodWTypesInput.classList.add('disabled');
        //                     addFoodWPMTxtF.classList.add('disabled');
        //                     addFoodCaloriesTxtF.classList.add('disabled');
        //                     addFoodProteinTxtF.classList.add('disabled');
        //                     addFoodFatTxtF.classList.add('disabled');
        //                     addFoodSaturatedFatTxtF.classList.add('disabled');
        //                     addFoodTransFatTxtF.classList.add('disabled');
        //                     addFoodCarbohydratesTxtF.classList.add('disabled');
        //                     addFoodSodiumTxtF.classList.add('disabled');
        //                     addFoodVitaminB1TxtF.classList.add('disabled');
        //                     addFoodVitaminB2TxtF.classList.add('disabled');
        //                     addFoodVitaminB3TxtF.classList.add('disabled');
        //                     addFoodBtnBox.classList.add('not-visible');
        //                 }, 1);
        //                 setTimeout( e => {
        //                     window.location = redirect_url;
        //                 }, 3000);
        //             }
        //         },
        //         error: function(e){
        //             handleObjCreateError('food', e);
        //         }
        //     })
        // });
    }
    ;
    //#endregion
});

//#region Functions Section
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
    /* map Nutrition data to side-table */
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

function getFoodTypeToAddFoodOptions() {
    $.ajax({
        type: 'GET',
        url: 'foodTypes-json',
        success: function (response) {
            // console.log("foodtype response\n", response)
            addFoodFoodTypesDataBox.innerHTML = "";
            addFoodWTypesText.textContent = "Choose a food type";
            addFoodFoodTypeText.classList.add('default');
            
            const foodTypesData = response.data;
            foodTypesData.map(item => {
                // console.log(item, "\n", item.foodType);
                const option = document.createElement('div');
                option.textContent = item.foodType;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.foodType);
                addFoodFoodTypesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getWeightTypeToAddFoodOptions() {
    $.ajax({
        type: 'GET',
        url: 'weightTypes-json',
        success: function (response) {
            // console.log("foodtype response\n", response)
            addFoodWTypesDataBox.innerHTML = "";
            addFoodWTypesText.textContent = "Choose a weight type";
            addFoodWTypesText.classList.add('default');
            
            const weightTypesData = response.data;
            weightTypesData.map(item => {
                // console.log(item, "\n", item.weightType);
                const option = document.createElement('div');
                option.textContent = item.weightType;
                option.setAttribute('class', 'item');
                option.setAttribute('data-value', item.weightType);
                addFoodWTypesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function enableAddFoodSubmitBtn(isFoodTypesSelected, isWeightTypesSelected, isFoodNameEmpty){
    if (isFoodTypesSelected && isWeightTypesSelected && isFoodNameEmpty) {
        console.log('they are all true!!');
        if (addFoodBtn.classList.contains('disabled')) {
            addFoodBtn.classList.remove('disabled');
        }
    } else {
        if (!addFoodBtn.classList.contains('disabled')) {
            addFoodBtn.classList.add('disabled');
        }
    }
    // addFoodBtn
}

function getFoodTypeToFoodDetailOptions() {
    $.ajax({
        type: 'GET',
        url: '../foodTypes-json',
        success: function (response) {
            // console.log("foodtype response\n", response)
            const selectedFoodType = document.getElementById("sel-food-detail-food-type").innerHTML;
            
            foodDetailFoodTypesDataBox.innerHTML = "";
            foodDetailFoodTypeText.textContent = "Choose a food type";
            foodDetailFoodTypeText.classList.add('default');
            
            const foodTypesData = response.data;
            foodTypesData.map(item => {
                // console.log(item, "\n", item.foodType);
                const option = document.createElement('div');
                option.textContent = item.foodType;
                if (selectedFoodType == item.foodType) {
                    option.setAttribute('class', 'item');
                    foodDetailFoodTypeText.textContent = selectedFoodType;
                    foodDetailFoodTypeText.classList.remove('default');
                    foodDetailFoodTypesInput.setAttribute('value', selectedFoodType);
                } else {
                    option.setAttribute('class', 'item');
                }
                option.setAttribute('data-value', item.foodType);
                foodDetailFoodTypesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getWeightTypeToFoodDetailOptions() {
    $.ajax({
        type: 'GET',
        url: '../weightTypes-json',
        success: function (response) {
            const selectedWeightType = document.getElementById("sel-food-detail-weight-type").innerHTML;
            // console.log("foodtype response\n", response)
            foodDetailWTypesDataBox.innerHTML = "";
            foodDetailWTypesText.textContent = "Choose a weight type";
            foodDetailWTypesText.classList.add('default');
            
            const weightTypesData = response.data;
            weightTypesData.map(item => {
                // console.log(item, "\n", item.weightType);
                const option = document.createElement('div');
                option.textContent = item.weightType;
                if (selectedWeightType == item.weightType) {
                    option.setAttribute('class', 'item');
                    foodDetailWTypesText.textContent = selectedWeightType;
                    foodDetailWTypesText.classList.remove('default');
                    foodDetailWTypesInput.setAttribute('value', selectedWeightType);
                } else {
                    option.setAttribute('class', 'item');
                }
                option.setAttribute('data-value', item.weightType);
                foodDetailWTypesDataBox.appendChild(option);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function handleObjCreateError(obj, error){
    var tempMsgStart = `<div class="ui negative message">
    <div class="header">
    Failed
    </div>
    <p style="inset:0">Something went wrong. -><b>`;
    const tempMsgEnd = `</b></p>
    </div>`
    if (obj == 'meal'){
        console.log('createMeal Error:\n', error);
        const errorBoxMsg = tempMsgStart + error + tempMsgEnd;
        alertBox.innerHTML = errorBoxMsg;
    } else if (obj == 'food') {
        console.log('createFood Error:\n', error);
        const errorBoxMsg = tempMsgStart + error + tempMsgEnd;
        addFoodAlertBox.innerHTML = errorBoxMsg;
    }
}

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
//#endregion