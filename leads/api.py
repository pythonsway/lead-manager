from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer


# CRUD
class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LeadSerializer

    # instead 'queryset', to get only leads of user
    def get_queryset(self):
        return self.request.user.leads.all()

    # save the lead owner when create
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
