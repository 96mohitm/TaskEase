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
    fields = ['id', 'title', 'description', 'status', 'due_date', 'created_by', 'modified_by']
    read_only_fields = ['created_by', 'modified_by']

  def validate_title(self, value):
    if not value.strip():  # if the title is empty or just whitespace
      raise serializers.ValidationError("Title cannot be blank.")
    return value

  def create(self, validated_data):
    # Assign the logged-in user (from serializer context) as the task creator and modifier
    user = self.context['request'].user
    validated_data['created_by'] = user
    validated_data['modified_by'] = user
    return super(TaskSerializer, self).create(validated_data)
