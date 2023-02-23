#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    #os.environ.setdefault("DJANGO_SETTINGS_MODULE", "simple_calories_counter.settings")
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    print("Before main(). Entering main loop.")
    main()
    print("After main(). Exiting main loop.")
