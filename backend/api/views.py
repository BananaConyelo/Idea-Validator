from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on Items.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


@api_view(['GET'])
def api_root(request):
    """
    API root endpoint with welcome message.
    """
    return Response({
        'message': 'Welcome to the Django REST API',
        'endpoints': {
            'items': '/api/items/',
        }
    })
