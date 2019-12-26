from rest_framework import serializers
from leads.models import Lead


class LeadSerializer(serializers.ModelSerializer):
    # to only display the human readable name for GET requests.
    # POST requests will still work with the code (on ModelSerializer)
    # group_name = serializers.CharField(source='get_group_display', read_only=True)

    class Meta:
        model = Lead
        fields = '__all__'

    # print(repr(LeadSerializer())): 
    # id = IntegerField(label='ID', read_only=True)
    # group = ChoiceField(choices=(('Home', 'Home'), ('Work', 'Work')))
    # name = CharField(max_length=100)
    # email = EmailField(max_length=100, validators=[<UniqueValidator(que
    # message = CharField(allow_blank=True, max_length=500, required=False
    # created_at = DateTimeField(read_only=True)
    # owner = PrimaryKeyRelatedField(allow_null=True, queryset=User.object