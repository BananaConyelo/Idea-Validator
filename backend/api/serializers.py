from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Idea, Comment, Vote, Tag

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class VoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Vote
        fields = ['id', 'user', 'idea', 'vote_type', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'idea', 'author', 'content', 'created_at']

class IdeaSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    vote_count = serializers.ReadOnlyField()
    user_vote = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Idea
        fields = ['id', 'title', 'description', 'author', 'tags', 'created_at', 'updated_at', 'vote_count', 'user_vote', 'comments_count']

    def get_user_vote(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            vote = Vote.objects.filter(user=request.user, idea=obj).first()
            if vote:
                return vote.vote_type
        return None

    def get_comments_count(self, obj):
        return obj.comments.count()
