console.log("semantic.js loaded.");

$('.ui.dropdown').dropdown({
    forceSelection: false
});

$('#meal-form-date').calendar({
    type: 'date',
    // formatter: {
    //     cell: disabled
    // },
    isDisabled: function () {
        return true;
    },
});

$('#meal-form-datetime').calendar({
    isDisabled: function () {
        return true;
    },
});

$('#meal-detail-form-date').calendar({
    type: 'date',
    // formatter: {
    //     cell: disabled
    // },
    isDisabled: function () {
        return false;
    },
});

$('#meal-detail-form-datetime').calendar({
    isDisabled: function () {
        return false;
    },
});

// $('#food-detail-form-date').calendar({
//     type: 'date',
//     // formatter: {
//     //     cell: disabled
//     // },
//     isDisabled: function () {
//         return false;
//     },
// });

// $('#food-detail-form-datetime').calendar({
//     isDisabled: function () {
//         return false;
//     },
// });