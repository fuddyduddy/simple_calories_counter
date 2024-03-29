from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from django.urls import reverse
from django.views.generic import TemplateView, DetailView
#from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.core.paginator import Paginator


from django.http import JsonResponse, HttpResponseRedirect

from .models import FoodType, WeightType, Food, Meal, MealTime
from .forms import CalorieAddFood

import json

page_title = "Calorie Counter"
data_not_found = "Data not found."

# Index View (Home page)
def index(request):
    """ Home - index page """
    print(request)
    context = {
        "page_title": page_title
    }
    return render(request, 'index.html', context=context)



# region Food Related Views

#   region commented def addFood(request)
# def addFood(request):
#     print(request)
#     context = {
#         "page_title": page_title
#     }
#     return render(request, "calorie/addFood.html", context=context)
# endregion

#   region AddFood (Templateview)
class AddFood(TemplateView):
    template_name = "calorie/addFood.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(AddFood, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["page_title"] = page_title
        context["testContext"] = "test success"
        return context
    
def get_json_weightType_data(request):
    """ For ajax get weightType (Model) as arrayList to addFood.html / food_detail.html """
    # print("called view:- (get_json_weightType_data)")
    try:
        weightType_val = list(WeightType.objects.values())
        # print(weightType_val)
        return JsonResponse({'data': weightType_val, 'status': True})
    except Exception as e:
        print(e)
        return JsonResponse({'data': '', 'status': False})
    
def create_food(request):
    response = [{
        'url': '/calorie/addFood',
        'success': False,
        'error': ''
    }]
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            foodType_str = request.POST.get('FoodType')
            name_obj = request.POST.get('Name')
            manufacturer_obj = request.POST.get('Manufacturer')
            weightType_str = request.POST.get('WeightType')
            WPM_obj = request.POST.get('WPM')
            calories_obj = request.POST.get('Calories')
            protein_obj = request.POST.get('Protein')
            fat_obj = request.POST.get('Fat')
            saturatedFat_obj = request.POST.get('SaturatedFat')
            transFat_obj = request.POST.get('TransFat')
            carbohydrates_obj = request.POST.get('Carbohydrates')
            sodium_obj = request.POST.get('Sodium')
            vitaminB1_obj = request.POST.get('VitaminB1')
            vitaminB2_obj = request.POST.get('VitaminB2')
            vitaminB3_obj = request.POST.get('VitaminB3')
            foodType_obj = FoodType.objects.get(foodType=foodType_str)
            weightType_obj = WeightType.objects.get(weightType=weightType_str)
            print(
                foodType_str, name_obj, manufacturer_obj, weightType_str, WPM_obj, calories_obj, protein_obj, fat_obj, saturatedFat_obj, transFat_obj, carbohydrates_obj, sodium_obj, vitaminB1_obj, vitaminB2_obj, vitaminB3_obj
            )

            Food.objects.create(
                foodType = foodType_obj
                ,name = name_obj
                ,manufacturer = manufacturer_obj
                ,weightType = weightType_obj
                ,weightPerMeal = WPM_obj
                ,calories = calories_obj
                ,protein = protein_obj
                ,fat = fat_obj
                ,saturatedFat = saturatedFat_obj
                ,transFat = transFat_obj
                ,carbohydrates = carbohydrates_obj
                ,sodium = sodium_obj
                ,vitaminB1 = vitaminB1_obj
                ,vitaminB2 = vitaminB2_obj
                ,vitaminB3 = vitaminB3_obj
            )
            response[0]['success'] = True
            return HttpResponse(json.dumps(response))
        except Exception as e:
            response[0]['success'] = False
            response[0]['error'] = "[Error] create_meal failed: " + str(e)#.replace('"', '\"').replace("'","\'")
            print(response)
            print("[Error] create_meal failed: ", e)
            return HttpResponse(json.dumps(response))
    else:
        response[0]['success'] = False
        response[0]['error'] = "[Error] create_meal ajax error"
        print("[Error] create_meal ajax error")
        return HttpResponse(json.dumps(response))
#   endregion

#   region def food_edit(request, pk):
def food_edit(request, pk):
    """ POST for editing food model as per pk. """
    response = [{
        'url': f'/calorie/food_detail/{pk}',
        'success': False,
        'error': ''
    }]
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            # print(request.POST)
            foodType_str = request.POST.get('FoodType')
            name_obj = request.POST.get('Name')
            manufacturer_obj = request.POST.get('Manufacturer')
            weightType_str = request.POST.get('WeightType')
            WPM_obj = request.POST.get('WPM')
            calories_obj = request.POST.get('Calories')
            protein_obj = request.POST.get('Protein')
            fat_obj = request.POST.get('Fat')
            saturatedFat_obj = request.POST.get('SaturatedFat')
            transFat_obj = request.POST.get('TransFat')
            carbohydrates_obj = request.POST.get('Carbohydrates')
            sodium_obj = request.POST.get('Sodium')
            vitaminB1_obj = request.POST.get('VitaminB1')
            vitaminB2_obj = request.POST.get('VitaminB2')
            vitaminB3_obj = request.POST.get('VitaminB3')
            foodType_obj = FoodType.objects.get(foodType=foodType_str)
            weightType_obj = WeightType.objects.get(weightType=weightType_str)

            editedFood = Food.objects.get(pk=pk)

            editedFood.name = name_obj
            editedFood.manufacturer = manufacturer_obj
            editedFood.weightPerMeal = WPM_obj
            editedFood.calories = calories_obj
            editedFood.protein = protein_obj
            editedFood.fat = fat_obj
            editedFood.saturatedFat = saturatedFat_obj
            editedFood.transFat = transFat_obj
            editedFood.carbohydrates = carbohydrates_obj
            editedFood.sodium = sodium_obj
            editedFood.vitaminB1 = vitaminB1_obj
            editedFood.vitaminB2 = vitaminB2_obj
            editedFood.vitaminB3 = vitaminB3_obj
            editedFood.foodType = foodType_obj
            editedFood.weightType = weightType_obj
            editedFood.save()
            response[0]['success'] = True
            return HttpResponse(json.dumps(response))
        except Exception as e:
            response[0]['success'] = True
            print("[Erorr] meal_update failed: " + e)
            response[0]['error'] = "[Erorr] edit food failed: " + str(e)
            # return HttpResponse(json.dumps(response))
            return JsonResponse({'created': False}, safe=False)
    else:
        print("[Error] meal_update ajax error")
        return HttpResponse(json.dumps(response))
#   endregion


#   region Food List Page
class FoodList(ListView):
    # template_name = "calorie/foodList.html"
    # ### Changed to Class Based View, need to handle page_title later.
    # def get_context_data(self,*args, **kwargs):
    #     context = super(FoodList, self).get_context_data(*args,**kwargs)
    #     #context['users'] = YourModel.objects.all()
    #     context["testContext"] = "test success"
    #     return context
    model = Food
    template_name = 'calorie/food_list.html'
    paginate_by = 10

    def get_queryset(self, *args, **kwargs):
        qs = super(FoodList, self).get_queryset(*args, **kwargs)
        qs = qs.order_by("-id")
        return qs
    
    def get_context_data(self, **kwargs):
        context = super(FoodList, self).get_context_data(**kwargs)
        context["page_title"] = page_title
        return context
    
def food_delete(request, pk):
    print(pk)
    food = Food.objects.get(pk=pk)
    print(food)
    if food is not None:
        food.delete()
    return redirect('food_list')
    # return JsonResponse({'test': 'testing'})
#   endregion

#   region Food Detail Page
class FoodDetail(DetailView):
    model = Food
#   endregion

# endregion

#============================================================================================

# region Meal Related Views

#   region commented class AddMeal(TemplateView)
# class AddMeal(TemplateView):
#     template_name = "calorie/addMeal.html"
#     ### Changed to Class Based View, need to handle page_title later.
#     def get_context_data(self,*args, **kwargs):
#         context = super(AddMeal, self).get_context_data(*args,**kwargs)
#         #context['users'] = YourModel.objects.all()
#         context["testContext"] = "test success"
#         return context
# endregion

#   region def AddMeal(request, *args, **kwargs):
def AddMeal(request):
    # # This is for Django Traditional form.as_p way.
    # foodType = FoodType.objects.all()
    # return render(request, 'calorie/addMeal.html', {'fType': foodType})
    foodType_val = list(FoodType.objects.values())
    # print("Testing\n", foodType_val)
    context = {
        "page_title": page_title,
        'dataNotFound': data_not_found
    }
    return render(request, 'calorie/addMeal.html', context=context)

def get_json_foodType_data(request):
    """ For ajax get foodType (Model) as arrayList to addMeal.html / food_detail.html """
    # print("called view:- (get_json_foodType_data)")
    try:
        foodType_val = list(FoodType.objects.values())
        # print(foodType_val)
        return JsonResponse({'data': foodType_val, 'status': True})
    except Exception as e:
        print(e)
        return JsonResponse({'data': '', 'status': False})

def get_json_food_data(request, *args, **kwargs):
    try:
        selected_foodType = kwargs.get("food")
        foodTypeID = tuple(FoodType.objects.filter(foodType=selected_foodType))[0].id
        # print(selected_foodType)
        # print(kwargs)
        # print(foodTypeID)
        obj_foods = list(Food.objects.filter(foodType_id=foodTypeID).values())
        if len(obj_foods) != 0:
            # print(obj_foods[:5])
            return JsonResponse({'data': obj_foods, 'status': True})
        return JsonResponse({'data': [], 'status': False})
    except Exception as e:
        print("[Error] get_json_food_data:\n",e)
        return JsonResponse({'data': [], 'status': False})



def get_json_mealTime_data(request):
    try:
        mealTime_val = list(MealTime.objects.values())
        return JsonResponse({'data': mealTime_val, 'status': True})
    except Exception as e:
        print("[Error] get_json_mealTime_data:\n",e)
        return JsonResponse({'data': [], 'status': False})

def create_meal(request):
    response = [{
        'url': '/calorie/addMeal',
        'success': False,
        'error': ''
    }]
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            food = request.POST.get('food')
            mealDate_obj = request.POST.get('mealDate')
            mealDateTime_obj = request.POST.get('mealDateTime')
            mealTime = request.POST.get('mealTime')
            multiplier_obj = request.POST.get('multiplier')
            food_obj = Food.objects.get(name=food)
            mealTime_obj = MealTime.objects.get(mealTime=mealTime)

            Meal.objects.create(
                food = food_obj,
                date = mealDate_obj,
                datetimeNullable = mealDateTime_obj,
                mealTime = mealTime_obj,
                multiplier = multiplier_obj
            )
            # return JsonResponse({'created': True})
            # print(request.path_info)  # return '/calorie/createMeal'
            # return HttpResponseRedirect(redirect_to='addMeal')
            # return HttpResponseRedirect(reverse('addMeal'))
            # return redirect(request.META['HTTP_REFERER'])
            # return redirect('addMeal', {'created': True})
            # return redirect('/calorie/addMeal')
            # return render(request, 'calorie/addMeal.html', {'dataNotFound': data_not_found})
            response[0]['success'] = True
            return HttpResponse(json.dumps(response))
        except Exception as e:
            response[0]['success'] = False
            print("[Erorr] create_meal failed: ", e)
            response[0]['error'] = "[Erorr] create_meal failed: " + str(e)
            return HttpResponse(json.dumps(response))
            # return JsonResponse({'created': False}, safe=False)
    else:
        response[0]['success'] = False
        response[0]['error'] = "[Error] create_meal ajax error"
        print("[Error] create_meal ajax error")
        return HttpResponse(json.dumps(response))
        # return JsonResponse({'created': False}, safe=False)
#   endregion

#   region def meal_edit(request, pk):
def meal_edit(request, pk):
    """ POST for editing meal model as per pk. """
    response = [{
        'url': f'/calorie/meal_detail/{pk}'
    }]
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            print(request.POST)
            mealDate = request.POST.get('mealDate')
            mealDateTime = request.POST.get('mealDateTime')
            mealTime = request.POST.get('mealTime')
            multiplier = request.POST.get('multiplier')
            print(mealDate, mealDateTime, mealTime, multiplier)

            # Retrieve the MealTime instance for the selected meal time. (accept instance, not str)
            mealTime_obj = MealTime.objects.get(mealTime=mealTime)

            editedMeal = Meal.objects.get(pk=pk)
            # print(dir(editedMeal))
            # print(editedMeal.date)
            # print(editedMeal.datetimeNullable)
            # print(editedMeal.mealTime)
            # print(editedMeal.multiplier)
            # print("Original Meal Values.")

            editedMeal.date = mealDate
            editedMeal.datetimeNullable = mealDateTime
            editedMeal.mealTime = mealTime_obj
            editedMeal.multiplier = multiplier
            # print(editedMeal.date)
            # print(editedMeal.datetimeNullable)
            # print(editedMeal.mealTime)
            # print(editedMeal.multiplier)
            # print("After Meal Values.")
            editedMeal.save()

            return HttpResponse(json.dumps(response))
        except Exception as e:
            print("[Erorr] meal_update failed: " + e)
            return HttpResponse(json.dumps(response))
            # return JsonResponse({'created': False}, safe=False)
    else:
        print("[Error] meal_update ajax error")
        return HttpResponse(json.dumps(response))
#   endregion

#   region class-based view mealList
class MealList(ListView):
    """ For rendering meal_list.html """
    model = Meal
    template_name = 'calorie/meal_list.html'
    paginate_by = 10

    def get_queryset(self, *args, **kwargs):
        qs = super(MealList, self).get_queryset(*args, **kwargs)
        qs = qs.order_by("-id")
        return qs
    
    def get_context_data(self, **kwargs):
        context = super(MealList, self).get_context_data(**kwargs)
        context["page_title"] = page_title
        return context

class MealDetail(DetailView):
    model = Meal

def meal_delete(request, pk):
    print(pk)
    meal = Meal.objects.get(pk=pk)
    print(meal)
    if meal is not None:
        meal.delete()
    return redirect('meal_list')
    # return JsonResponse({'test': 'testing'})

# endregion

#   region commented MealList(TemplateView)
# class MealList(TemplateView):
#     template_name = "calorie/mealList.html"
#     ### Changed to Class Based View, need to handle page_title later.
#     def get_context_data(self,*args, **kwargs):
#         context = super(MealList, self).get_context_data(*args,**kwargs)
#         #context['users'] = YourModel.objects.all()
#         context["testContext"] = "test success"
#         return context
# endregion

# endregion

class ShowStatistics(TemplateView):
    template_name = "calorie/statistics.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(ShowStatistics, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["page_title"] = page_title
        context["testContext"] = "test success"
        return context

class LoginOrSignUp(TemplateView):
    template_name = "calorie/authPanel.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(LoginOrSignUp, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["page_title"] = page_title
        context["testContext"] = "test success"
        return context
