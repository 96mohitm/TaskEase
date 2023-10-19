from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from .services import TaskService
from .error_util import format_errors


class TaskListView(APIView):
    def get(self, request):
        status = request.GET.get("status", None)
        tasks = TaskService.get_filtered_tasks(status)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Transform the errors
        error_message = format_errors(serializer.errors)

        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailView(APIView):
    def get(self, request, task_id):
        task = TaskService.get_task(task_id)
        if task:
            return Response(TaskSerializer(task).data)
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, task_id):
        task = TaskService.get_task(task_id)
        if not task:
            return Response(
                {"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND
            )

        updated_task, errors = TaskService.update_task(task, request.data)
        if updated_task:
            return Response(TaskSerializer(updated_task).data)

        # Format the errors if the update was not successful
        error_message = format_errors(errors)
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id):
        if TaskService.delete_task(task_id):
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
