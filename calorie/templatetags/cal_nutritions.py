### [2023-02-06] This is not used, since it maybe superseded and not workable in my meal_detail.html template.

### https://stackoverflow.com/questions/47585637/how-to-call-a-variable-function-with-parameter-in-django-template
### https://docs.djangoproject.com/en/1.11/howto/custom-template-tags/#code-layout
from django import template
register = template.Library()

@register.filter(name='call_with')
def apply_callable(callable, arg):
    return callable(arg)