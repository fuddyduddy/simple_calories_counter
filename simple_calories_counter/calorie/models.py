from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models
from django.urls import reverse
from django.core.validators import MinLengthValidator, MinValueValidator


#region === Create models here. ===
class FoodType(models.Model):
    foodType = models.CharField(max_length=50) #, unique=True)
    ordering = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)

    class Meta:
        ordering = ['foodType']

    def __str__(self) -> str:
        return f"{self.foodType}"

class WeightType(models.Model):
    weightType = models.CharField(max_length=5)
    ordering = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.weightType}"

class Food(models.Model):
    foodType        = models.ForeignKey(FoodType, on_delete=models.CASCADE)
    name            = models.CharField(max_length=200, blank=False, null=False)
    manufacturer    = models.CharField(max_length=200, blank=True, null=True)
    weightType      = models.ForeignKey(WeightType, on_delete=models.CASCADE)
    weightPerMeal   = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    calories        = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True) # kcal
    protein         = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # g
    fat             = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # g
    saturatedFat    = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # g
    transFat        = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # g
    carbohydrates   = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # g
    sodium          = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    vitaminB1       = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    vitaminB2       = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    vitaminB3       = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # vitaminA = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # vitaminC = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # vitaminD3 = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # vitaminE = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # vitaminK1 = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # vitaminB12 = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug
    # pantothenicAcid = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg 泛酸
    # biotin = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # ug 生物素
    # folicAcid = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg 葉酸
    # potassium = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # chloride = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # calcium = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # magnesium = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # phosphorus = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # iron = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # zinc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # copper = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # manganese = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # iodine = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # fluoride = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # chromium = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # molybdenum = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    # selenium = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg
    #  = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # mg

    def __str__(self) -> str:
        return f"{self.foodType} :- {self.name}, Est weight per meal: {self.weightPerMeal} / Calories: {self.calories}"

class Meal(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    date = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)
    datetimeNullable = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    mealTime = models.ForeignKey("MealTime", on_delete=models.CASCADE)
    multiplier = models.DecimalField(max_digits=5, decimal_places=2, default=1, blank=True, null=True)

    def __str__(self) -> str:
        total = 0
        if self.food.calories is not None and self.multiplier is not None:
            #print(self.food.calories, self.multiplier)
            total = self.food.calories * self.multiplier
            total = round(total, 2)
        else:
            #print("It is none", self.food.calories, self.multiplier)
            total = self.food.calories
        #return f"[{str(self.date)}]: {self.food.name} {str(float(self.food.calories) * float(self.multiplier))}"
        return f"[{   str(self.date)}]: {self.food.name} {str(total)}"

    # region === This calculation part is hardcoded, skipping using Jinja2 from open-source module  ===
    def cal_total_calories(self):
        """ 
        The philosophy behind Django's template system is to avoid doing any serious logic in the template.
        https://stackoverflow.com/questions/44823531/django-operator-inside-template-for-loop
        Handle the calculation in the model for front-end
        """
        if type(self.multiplier) == None :
            self.multiplier = 1.0
        if type(self.food.calories) == None:
            return ""
        return round(self.food.calories * self.multiplier, 2)
    def cal_total_protein(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.protein is None:
            return ""
        return round(self.food.protein * self.multiplier, 2)
    def cal_total_fat(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.fat is None:
            return ""
        return round(self.food.fat * self.multiplier, 2)
    def cal_total_saturatedFat(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.saturatedFat is None:
            return ""
        return round(self.food.saturatedFat * self.multiplier, 2)
    def cal_total_transFat(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.transFat is None:
            print("Yes")
            return ""
        return round(self.food.transFat * self.multiplier, 2)
    def cal_total_carbohydrates(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.carbohydrates is None:
            return ""
        return round(self.food.carbohydrates * self.multiplier, 2)
    def cal_total_sodium(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.sodium is None:
            return ""
        return round(self.food.sodium * self.multiplier, 2)
    def cal_total_vitaminB1(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.vitaminB1 is None:
            return ""
        return round(self.food.vitaminB1 * self.multiplier, 2)
    def cal_total_vitaminB2(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.vitaminB2 is None:
            return ""
        return round(self.food.vitaminB2 * self.multiplier, 2)
    def cal_total_vitaminB3(self):
        if type(self.multiplier) == None:
            self.multiplier = 1.0
        if self.food.vitaminB3 is None:
            return ""
        return round(self.food.vitaminB3 * self.multiplier, 2)
    # endregion

    # def delete_meal(self):
    #     """ This is used in deleting the choosen record with the primary key (pk) """
    #     return reverse("meal_delete", kwargs={"pk": self.pk})

    def get_absolute_url(self):
        """ This is used in meal_list.html, for redirect to meal_detail for DetailView with the primary key (pk) """
        return reverse("meal_detail", kwargs={"pk": self.pk})
    

class MealTime(models.Model):
    mealTime = models.CharField(max_length=30)
    ordering = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)

    class Meta:
        ordering = ['mealTime']

    def __str__(self) -> str:
        #return self.name
        return f"{self.mealTime}"

#endregion
