from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Tweets)
admin.site.register(Like_or_dislike)
admin.site.register(Comment)
# admin.site.register(UsersAndTweets)

