from django.contrib import admin
from .models import FoodType, WeightType, Food, Meal, MealTime

class FoodTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'foodType', 'ordering')

class WeightTypeAdmin(admin.ModelAdmin):
    list_display = ('id','weightType','ordering',)
    # readonly_fields = ('id',)

class FoodAdmin(admin.ModelAdmin):
    list_display = ('id', 'foodType', 'name', 'manufacturer', 'weightPerMeal', 'weightType', 'calories', 'protein', 'fat', 'carbohydrates')

class MealAdmin(admin.ModelAdmin):
    list_display = ('id', 'food', 'date', 'datetimeNullable', 'mealTime', 'multiplier')

class MealTimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'mealTime', 'ordering')
    

# Register your models here.
admin.site.register(FoodType, FoodTypeAdmin)
admin.site.register(WeightType, WeightTypeAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(Meal, MealAdmin)
admin.site.register(MealTime, MealTimeAdmin)
