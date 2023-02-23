"""simple_calories_counter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.views.generic import RedirectView  # For re-direct homepage of ''


from django.conf import settings
from django.conf.urls.static import static

#region === 20221015 Showing main urls start running. ===

import os
from datetime import datetime
# Unknown datetime bug in macOS.....
# https://stackoverflow.com/questions/5873857/how-to-set-timezone-in-python-using-os-environ
#os.environ['TZ'] = 'EST-07EDT,M4.1.0,M10.5.0'
today = datetime.now()#.astimezone()
now = today.strftime("%Y-%m-%d %H:%M:%S")
print(f"[{now}]: main urls loaded.")

#endregion


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", RedirectView.as_view(url='calorie/', permanent=True), name='index'),
    #path('', RedirectView.as_view(url='', permanent=True), name='index'), # From django_demo POS
    #path('', RedirectView.as_view(pattern_name=''), name='home'),  # From django_dependentlist
    path("calorie/", include("calorie.urls"))
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#print(static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
# print(settings.STATIC_URL)
# print(settings.STATIC_ROOT)

# from django.conf import settings
# from django.conf.urls.static import static
# urlpatterns += static(settings.STATIC_ROOT, document_root=settings.STATIC_ROOT)

