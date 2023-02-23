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

# My views start here.
def index(request):
    print(request)
    context = {
        "page_title": page_title
    }
    return render(request, 'index.html', context=context)

# region commented def addFood(request)
# def addFood(request):
#     print(request)
#     context = {
#         "page_title": page_title
#     }
#     return render(request, "calorie/addFood.html", context=context)
# endregion

class AddFood(TemplateView):
    template_name = "calorie/addFood.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(AddFood, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["testContext"] = "test success"
        return context
        
class FoodList(TemplateView):
    template_name = "calorie/foodList.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(FoodList, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["testContext"] = "test success"
        return context



# region commented class AddMeal(TemplateView)
# class AddMeal(TemplateView):
#     template_name = "calorie/addMeal.html"
#     ### Changed to Class Based View, need to handle page_title later.
#     def get_context_data(self,*args, **kwargs):
#         context = super(AddMeal, self).get_context_data(*args,**kwargs)
#         #context['users'] = YourModel.objects.all()
#         context["testContext"] = "test success"
#         return context
# endregion

# region def AddMeal(request, *args, **kwargs):
def AddMeal(request):
    # # This is for Django Traditional form.as_p way.
    # foodType = FoodType.objects.all()
    # return render(request, 'calorie/addMeal.html', {'fType': foodType})
    foodType_val = list(FoodType.objects.values())
    # print("Testing\n", foodType_val)
    return render(request, 'calorie/addMeal.html', {'dataNotFound': data_not_found})

def get_json_foodType_data(request):
    """ For ajax get foodType (Model) as arrayList to addMeal.html """
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
        'url': '/calorie/addMeal'
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
            #print(request.path_info)  # return '/calorie/createMeal'
            # return HttpResponseRedirect(redirect_to='addMeal')
            # return HttpResponseRedirect(reverse('addMeal'))
            # return redirect(request.META['HTTP_REFERER'])
            # return redirect('addMeal', {'created': True})
            # return redirect('/calorie/addMeal')
            # return render(request, 'calorie/addMeal.html', {'dataNotFound': data_not_found})
            return HttpResponse(json.dumps(response))
        except Exception as e:
            print("[Erorr] create_meal failed: " + e)
            return HttpResponse(json.dumps(response))
            # return JsonResponse({'created': False}, safe=False)
    else:
        print("[Error] create_meal ajax error")
        return HttpResponse(json.dumps(response))
        # return JsonResponse({'created': False}, safe=False)
# endregion

def meal_edit(request, pk):
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

# region class-based view mealList
class MealList(ListView):
    model = Meal
    template_name = 'calorie/meal_list.html'
    paginate_by = 10

    def get_queryset(self, *args, **kwargs):
        qs = super(MealList, self).get_queryset(*args, **kwargs)
        qs = qs.order_by("-id")
        return qs

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

# region commented MealList(TemplateView)
# class MealList(TemplateView):
#     template_name = "calorie/mealList.html"
#     ### Changed to Class Based View, need to handle page_title later.
#     def get_context_data(self,*args, **kwargs):
#         context = super(MealList, self).get_context_data(*args,**kwargs)
#         #context['users'] = YourModel.objects.all()
#         context["testContext"] = "test success"
#         return context
# endregion

class ShowStatistics(TemplateView):
    template_name = "calorie/statistics.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(ShowStatistics, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["testContext"] = "test success"
        return context

class LoginOrSignUp(TemplateView):
    template_name = "calorie/authPanel.html"
    ### Changed to Class Based View, need to handle page_title later.
    def get_context_data(self,*args, **kwargs):
        context = super(LoginOrSignUp, self).get_context_data(*args,**kwargs)
        #context['users'] = YourModel.objects.all()
        context["testContext"] = "test success"
        return context
