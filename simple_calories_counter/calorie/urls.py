from django.urls import include, path

#from . import views  # These are the same import, just changed the name for easy identification
from calorie import views
from calorie.views import (
    AddFood, get_json_weightType_data, create_food,
    FoodList, FoodDetail, food_delete, food_edit,
    AddMeal, get_json_foodType_data, get_json_food_data, get_json_mealTime_data, create_meal,
    MealList, MealDetail, meal_delete, meal_edit,
    ShowStatistics, LoginOrSignUp
)


# region === 20221015 Showing calorie urls at server start. ===
import os
from datetime import datetime
os.environ['TZ'] = 'EST-07EDT,M4.1.0,M10.5.0'
today = datetime.now().astimezone()
now = today.strftime("%Y-%m-%d %H:%M:%S")
print(f"[{now}]: calorie urls loaded.")
# endregion

urlpatterns = [
    path("", views.index, name="index"),
    #path("addFood", views.addFood, name="addFood"),  # For function based view
    path("statistics", ShowStatistics.as_view(), name="statistics"),
    path("authPanel", LoginOrSignUp.as_view(), name="authPanel"),
]

urlpatterns += [
    path("addFood", AddFood.as_view(), name="addFood"),
    path("weightTypes-json", get_json_weightType_data, name="weightTypes-json"),
    path('createFood', create_food, name='createFood'),
    # path("foodList", FoodList.as_view(), name="foodList"),
    path("food_list", FoodList.as_view(), name="food_list"),
    path("food_detail/<int:pk>", FoodDetail.as_view(), name="food_detail"),
    path("food_delete/<int:pk>", food_delete, name="food_delete"),
    path("food_detail/<int:pk>/update", food_edit, name="food_edit"),
]

urlpatterns += [
    path("meal_list", MealList.as_view(), name="meal_list"),
    path("meal_detail/<int:pk>", MealDetail.as_view(), name="meal_detail"),
    path("meal_delete/<int:pk>", meal_delete, name="meal_delete"),
    path("meal_detail/<int:pk>/update", meal_edit, name="meal_edit")
]

urlpatterns += [
    path("addMeal", AddMeal, name="addMeal"),
    path('foodTypes-json', get_json_foodType_data, name='foodTypes-json'),
    path('foods-json/<str:food>', get_json_food_data, name='foods-json'),
    path('mealTimes-json', get_json_mealTime_data, name='mealTimes-json'),
    path('createMeal', create_meal, name='createMeal'),
]
# print(urlpatterns)

