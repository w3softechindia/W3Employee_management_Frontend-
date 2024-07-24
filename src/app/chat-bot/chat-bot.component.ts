import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  isOpen = false;
  userMessage = '';
  messages: Message[] = [];

  ngOnInit() {
    // Optionally, load any initial messages or setup
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, sender: 'user' });
      this.userMessage = '';
      // Simulate bot response after a short delay
      setTimeout(() => {
        this.messages.push({ text: 'This is a bot response', sender: 'bot' });
        this.scrollToBottom();
      }, 1000);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }
}
