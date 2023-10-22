from .models import Task
from .serializers import TaskSerializer

class TaskService:

  @staticmethod
  def get_all_tasks(user):
    return Task.objects.filter(created_by=user)

  @staticmethod
  def get_filtered_tasks(user, status=None):
    tasks = Task.objects.filter(created_by=user)

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
  def create_task(data, user):
    data['created_by'] = user.pk
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        return serializer.save()
    return None

  @staticmethod
  def update_task(task, data, user):
    data['modified_by'] = user.pk
    serializer = TaskSerializer(task, data=data, partial=True)
    if serializer.is_valid():
        return serializer.save(), None
    return None, serializer.errors

  @staticmethod
  def delete_task(task_id):
      task = TaskService.get_task(task_id)
      if task:
          task.delete()
          return True
      return False
