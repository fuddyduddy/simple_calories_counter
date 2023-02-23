from django import forms
from calorie.models import FoodType, Food, WeightType, Meal, MealTime

class CalorieAddFood(forms.ModelForm):
    pass

class CalorieEditFood(forms.ModelForm):
    pass

class CalorieDeleteFood(forms.ModelForm):
    pass

class CalorieAddMeal(forms.ModelForm):
    class Meta:
        model = Meal    # Choose your model
        fields = '__all__'   # '__all__' means fetch all fields, other example: ('fieldname1','fieldname2','fieldname3','fieldname4')
        #fields = ('food',)
        widgets = {
            'description': forms.Textarea(),
        }
    
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.field['meals'].queryset = Meal.objects.all() # Before fetch by ajax.
    #     print(self.data)
    # #     # if 'food' in self.data:
    # #     #     try:
    # #     #         food = self.data.get('food')
    # #     #         self.fields['meals'].queryset = Meal.objects.filter(food=food).order_by('food')
    # #     #     except(ValueError, TypeError):
    # #     #         pass
    # #     # elif self.isinstance.pk:
    # #     #     #self.fields['city'].queryset = self.instance.country.city_set.order_by('name')
    # #     #     pass

class CalorieEditMeal(forms.ModelForm):
    pass

class CalorieDeleteMeal(forms.ModelForm):
    pass