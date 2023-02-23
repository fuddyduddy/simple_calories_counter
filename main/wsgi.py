"""
WSGI config for simple_calories_counter project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
#from datetime import date
from datetime import datetime

from django.core.wsgi import get_wsgi_application
from matplotlib import testing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "simple_calories_counter.settings")

#today = date.today()
#now = today.strftime("%Y-%m-%d")

#region === 20221015 Showing wsgi start running. ===

# Unknown datetime bug in macOS.....
# https://stackoverflow.com/questions/5873857/how-to-set-timezone-in-python-using-os-environ
#today = datetime.today()
os.environ['TZ'] = 'EST-07EDT,M4.1.0,M10.5.0'
#print(os.environ['TZ'])
today = datetime.now().astimezone()
now = today.strftime("%Y-%m-%d %H:%M:%S")
print(f"[{now}]: wsgi application started.")

#endregion

application = get_wsgi_application()
