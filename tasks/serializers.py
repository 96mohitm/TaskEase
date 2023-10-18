from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
  title = serializers.CharField(
    error_messages={
      'blank': 'Title cannot be blank.',
      'required': 'Title is required.'
    }
  )

  class Meta:
    model = Task
    fields = ['id', 'title', 'description', 'status']

  def validate_title(self, value):
    if not value.strip():  # if the title is empty or just whitespace
      raise serializers.ValidationError("Title cannot be blank.")
    return value
