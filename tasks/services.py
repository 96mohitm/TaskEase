from .models import Task
from .serializers import TaskSerializer

class TaskService:

  @staticmethod
  def get_all_tasks():
    return Task.objects.all()

  @staticmethod
  def get_filtered_tasks(status=None):
    tasks = Task.objects.all()

    if status:
      tasks = tasks.filter(status=status)

    return tasks

  @staticmethod
  def get_task(task_id):
      try:
          return Task.objects.get(id=task_id)
      except Task.DoesNotExist:
          return None

  @staticmethod
  def create_task(data):
      serializer = TaskSerializer(data=data)
      if serializer.is_valid():
          return serializer.save()
      return None

  @staticmethod
  def update_task(task, data):
    serializer = TaskSerializer(task, data=data, partial=True)
    if serializer.is_valid():
      return serializer.save(), None  # On success, return the task and None for errors
    return None, serializer.errors  # On failure, return None for the task and the validation errors

  @staticmethod
  def delete_task(task_id):
      task = TaskService.get_task(task_id)
      if task:
          task.delete()
          return True
      return False
