from django.core.management.base import BaseCommand
from assistant.tests import test_file_storage, test_openai_connection, test_middleware_order

class Command(BaseCommand):
    help = 'Run diagnostic tests'

    def handle(self, *args, **kwargs):
        test_file_storage()
        test_openai_connection()
        test_middleware_order()
        self.stdout.write(self.style.SUCCESS('Tests executed. Check the logs for details.'))