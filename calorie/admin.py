from django.contrib import admin
from .models import FoodType, WeightType, Food, Meal, MealTime

class WeightTypeAdmin(admin.ModelAdmin):
    list_display = ('id','weightType','ordering',)
    # readonly_fields = ('id',)

# Register your models here.
admin.site.register(FoodType)
admin.site.register(WeightType, WeightTypeAdmin)
admin.site.register(Food)
admin.site.register(Meal)
admin.site.register(MealTime)
