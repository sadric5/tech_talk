from django.urls import path
from rest_framework.routers import DefaultRouter


from .apiviews import LikeList, TweetViewSet, CommentList, CommentDetail, LikeList, LikeDetails, TweetViewSet, UserDetail

router = DefaultRouter()
router.register('tweets', TweetViewSet, basename="tweets")

urlpatterns = [
    #comment
    path("users/<int:pk>/", UserDetail.as_view(), name="user_data"),
    path("comments/", CommentList.as_view(), name="views_tweet"),
    path("comments/<int:pk>/", CommentDetail.as_view(), name="tweet_detail"),
    # like or dislike
    path("likes/", LikeList.as_view(), name="views_tweet"),
    path("likes/<int:pk>/", LikeDetails.as_view(), name="tweet_detail"),
]

urlpatterns += router.urls