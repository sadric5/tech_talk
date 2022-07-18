from email import message
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def connect (self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_' + self.room_name
        #join the a group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

        self.accept()
        
    def disconnect(self, close_code):
        # Leave the group which in general won't happen at all;
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name,
        )

    # receive message from the websocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        #send message to all member of the group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    # Receive Message From The Member Of The Group
    def chat_message(self, event):
        message = event['message']

        # Send Message To the Websocket
        self.send(text_data=json.dumps({
            'message': message,
        }))
        