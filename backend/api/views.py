from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .models import Idea, Comment, Vote, Tag
from .serializers import IdeaSerializer, CommentSerializer, VoteSerializer, TagSerializer, UserSerializer

class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all().order_by('-created_at')
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def vote(self, request, pk=None):
        idea = self.get_object()
        vote_type = request.data.get('vote_type')
        if vote_type not in ['up', 'down']:
            return Response({'error': 'Invalid vote type'}, status=status.HTTP_400_BAD_REQUEST)
        
        vote, created = Vote.objects.update_or_create(
            user=request.user,
            idea=idea,
            defaults={'vote_type': vote_type}
        )
        return Response({'status': 'voted', 'vote_type': vote_type})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unvote(self, request, pk=None):
        idea = self.get_object()
        Vote.objects.filter(user=request.user, idea=idea).delete()
        return Response({'status': 'unvoted'})

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        idea_id = self.request.query_params.get('idea_id')
        if idea_id:
            return Comment.objects.filter(idea_id=idea_id)
        return super().get_queryset()

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@api_view(['GET'])
def api_root(request):
    return Response({
        'message': 'Welcome to the Idea Validator API',
        'endpoints': {
            'ideas': '/api/ideas/',
            'comments': '/api/comments/',
            'tags': '/api/tags/',
            'auth': '/api/auth/',
        }
    })
